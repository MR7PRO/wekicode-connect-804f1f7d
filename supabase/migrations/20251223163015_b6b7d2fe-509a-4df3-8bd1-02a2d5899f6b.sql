-- Create function to deduct points from profile for reward redemption
CREATE OR REPLACE FUNCTION public.deduct_points_for_redemption()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_points INTEGER;
BEGIN
  -- Get current points
  SELECT COALESCE(points, 0) INTO v_current_points
  FROM profiles
  WHERE user_id = NEW.user_id;
  
  -- Check if user has enough points
  IF v_current_points < NEW.points_spent THEN
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
  
  RETURN NEW;
END;
$$;

-- Create trigger for automatic point deduction on redemption
DROP TRIGGER IF EXISTS on_reward_redemption ON reward_redemptions;
CREATE TRIGGER on_reward_redemption
  AFTER INSERT ON reward_redemptions
  FOR EACH ROW
  EXECUTE FUNCTION public.deduct_points_for_redemption();