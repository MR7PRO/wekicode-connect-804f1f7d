-- Create function to deduct points atomically for course enrollment
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
  
  -- Lock and get current points (prevents race condition)
  SELECT COALESCE(points, 0) INTO v_current_points
  FROM profiles
  WHERE user_id = NEW.user_id
  FOR UPDATE;
  
  -- Validate sufficient points
  IF v_current_points < v_course_price THEN
    RAISE EXCEPTION 'Insufficient points. Has % but needs %', 
      v_current_points, v_course_price;
  END IF;
  
  -- Atomic deduction
  UPDATE profiles
  SET points = points - v_course_price,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Create trigger for enrollment points deduction
DROP TRIGGER IF EXISTS deduct_points_on_enrollment ON course_enrollments;
CREATE TRIGGER deduct_points_on_enrollment
  BEFORE INSERT ON course_enrollments
  FOR EACH ROW
  EXECUTE FUNCTION deduct_points_for_enrollment();

-- Add constraint to prevent negative points
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS points_non_negative;
ALTER TABLE profiles ADD CONSTRAINT points_non_negative CHECK (points >= 0);