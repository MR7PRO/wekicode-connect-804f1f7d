-- Create function to prevent direct manipulation of gamification fields
CREATE OR REPLACE FUNCTION public.prevent_gamification_updates()
RETURNS TRIGGER AS $$
BEGIN
  -- Prevent changes to gamification fields (points, level, badges)
  -- Only allow system triggers to modify these fields
  IF (NEW.points IS DISTINCT FROM OLD.points) OR 
     (NEW.level IS DISTINCT FROM OLD.level) OR 
     (NEW.badges IS DISTINCT FROM OLD.badges) THEN
    RAISE EXCEPTION 'Cannot directly modify gamification fields (points, level, badges). These are managed automatically by the system.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER SET search_path = public;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS enforce_gamification_protection ON profiles;

-- Create trigger to enforce gamification protection on user updates
CREATE TRIGGER enforce_gamification_protection
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  WHEN (current_setting('app.bypass_gamification_check', true) IS DISTINCT FROM 'true')
  EXECUTE FUNCTION prevent_gamification_updates();

-- Update the existing point-awarding triggers to bypass the protection
-- Update award_points_for_question function
CREATE OR REPLACE FUNCTION public.award_points_for_question()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Set session variable to bypass gamification check
  PERFORM set_config('app.bypass_gamification_check', 'true', true);
  
  -- Award 5 points for creating a question
  UPDATE profiles
  SET points = COALESCE(points, 0) + 5,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Reset bypass flag
  PERFORM set_config('app.bypass_gamification_check', 'false', true);
  
  RETURN NEW;
END;
$$;

-- Update award_points_for_answer function
CREATE OR REPLACE FUNCTION public.award_points_for_answer()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Set session variable to bypass gamification check
  PERFORM set_config('app.bypass_gamification_check', 'true', true);
  
  -- Award 10 points for creating an answer
  UPDATE profiles
  SET points = COALESCE(points, 0) + 10,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Reset bypass flag
  PERFORM set_config('app.bypass_gamification_check', 'false', true);
  
  RETURN NEW;
END;
$$;

-- Update award_points_for_course function
CREATE OR REPLACE FUNCTION public.award_points_for_course()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Set session variable to bypass gamification check
  PERFORM set_config('app.bypass_gamification_check', 'true', true);
  
  -- Award 25 points for creating a course/educational content
  UPDATE profiles
  SET points = COALESCE(points, 0) + 25,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Reset bypass flag
  PERFORM set_config('app.bypass_gamification_check', 'false', true);
  
  RETURN NEW;
END;
$$;

-- Update deduct_points_for_redemption function
CREATE OR REPLACE FUNCTION public.deduct_points_for_redemption()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_points INTEGER;
BEGIN
  -- Set session variable to bypass gamification check
  PERFORM set_config('app.bypass_gamification_check', 'true', true);
  
  -- Get current points
  SELECT COALESCE(points, 0) INTO v_current_points
  FROM profiles
  WHERE user_id = NEW.user_id;
  
  -- Check if user has enough points
  IF v_current_points < NEW.points_spent THEN
    PERFORM set_config('app.bypass_gamification_check', 'false', true);
    RAISE EXCEPTION 'Insufficient points. User has % points but needs %', v_current_points, NEW.points_spent;
  END IF;
  
  -- Deduct points from profile
  UPDATE profiles
  SET points = points - NEW.points_spent,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Update reward stock if applicable
  UPDATE rewards
  SET stock = stock - 1
  WHERE id = NEW.reward_id
    AND stock IS NOT NULL
    AND stock > 0;
  
  -- Reset bypass flag
  PERFORM set_config('app.bypass_gamification_check', 'false', true);
  
  RETURN NEW;
END;
$$;

-- Update deduct_points_for_enrollment function
CREATE OR REPLACE FUNCTION public.deduct_points_for_enrollment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_points INTEGER;
  v_course_price INTEGER;
  v_is_free BOOLEAN;
BEGIN
  -- Get course price
  SELECT is_free, COALESCE(price, 0) 
  INTO v_is_free, v_course_price
  FROM courses
  WHERE id = NEW.course_id;
  
  -- Skip for free courses
  IF v_is_free OR v_course_price = 0 THEN
    RETURN NEW;
  END IF;
  
  -- Set session variable to bypass gamification check
  PERFORM set_config('app.bypass_gamification_check', 'true', true);
  
  -- Lock and get current points (prevents race condition)
  SELECT COALESCE(points, 0) INTO v_current_points
  FROM profiles
  WHERE user_id = NEW.user_id
  FOR UPDATE;
  
  -- Validate sufficient points
  IF v_current_points < v_course_price THEN
    PERFORM set_config('app.bypass_gamification_check', 'false', true);
    RAISE EXCEPTION 'Insufficient points. Has % but needs %', 
      v_current_points, v_course_price;
  END IF;
  
  -- Atomic deduction
  UPDATE profiles
  SET points = points - v_course_price,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Reset bypass flag
  PERFORM set_config('app.bypass_gamification_check', 'false', true);
  
  RETURN NEW;
END;
$$;