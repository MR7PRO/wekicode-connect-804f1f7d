
-- Add streak columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_checkin_date DATE;

-- Update the award_points_for_checkin function to handle streaks
CREATE OR REPLACE FUNCTION public.award_points_for_checkin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_last_checkin DATE;
  v_current_streak INTEGER;
  v_longest_streak INTEGER;
  v_bonus_points INTEGER := 0;
  v_total_points INTEGER;
BEGIN
  -- Set session variable to bypass gamification check
  PERFORM set_config('app.bypass_gamification_check', 'true', true);
  
  -- Get current streak info
  SELECT last_checkin_date, current_streak, longest_streak 
  INTO v_last_checkin, v_current_streak, v_longest_streak
  FROM profiles
  WHERE user_id = NEW.user_id;
  
  -- Calculate new streak
  IF v_last_checkin IS NULL OR v_last_checkin < NEW.checkin_date - INTERVAL '1 day' THEN
    -- Reset streak if more than 1 day gap
    v_current_streak := 1;
  ELSIF v_last_checkin = NEW.checkin_date - INTERVAL '1 day' THEN
    -- Continue streak
    v_current_streak := COALESCE(v_current_streak, 0) + 1;
  ELSE
    -- Same day or future date, keep current streak
    v_current_streak := COALESCE(v_current_streak, 1);
  END IF;
  
  -- Update longest streak if needed
  IF v_current_streak > COALESCE(v_longest_streak, 0) THEN
    v_longest_streak := v_current_streak;
  END IF;
  
  -- Calculate bonus points based on streak milestones
  CASE
    WHEN v_current_streak = 7 THEN v_bonus_points := 25;   -- 1 week streak
    WHEN v_current_streak = 14 THEN v_bonus_points := 50;  -- 2 weeks streak
    WHEN v_current_streak = 30 THEN v_bonus_points := 100; -- 1 month streak
    WHEN v_current_streak = 60 THEN v_bonus_points := 200; -- 2 months streak
    WHEN v_current_streak = 90 THEN v_bonus_points := 300; -- 3 months streak
    WHEN v_current_streak % 100 = 0 AND v_current_streak > 0 THEN v_bonus_points := 500; -- Every 100 days
    ELSE v_bonus_points := 0;
  END CASE;
  
  v_total_points := NEW.points_earned + v_bonus_points;
  
  -- Update profile with points and streak
  UPDATE profiles
  SET points = COALESCE(points, 0) + v_total_points,
      current_streak = v_current_streak,
      longest_streak = v_longest_streak,
      last_checkin_date = NEW.checkin_date,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Reset bypass flag
  PERFORM set_config('app.bypass_gamification_check', 'false', true);
  
  RETURN NEW;
END;
$function$;
