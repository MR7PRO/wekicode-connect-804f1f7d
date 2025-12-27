-- Create daily check-ins table
CREATE TABLE public.daily_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  checkin_date DATE NOT NULL DEFAULT CURRENT_DATE,
  points_earned INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, checkin_date)
);

-- Enable RLS
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own check-ins"
ON public.daily_checkins FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own check-ins"
ON public.daily_checkins FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Function to award points for daily check-in
CREATE OR REPLACE FUNCTION public.award_points_for_checkin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Set session variable to bypass gamification check
  PERFORM set_config('app.bypass_gamification_check', 'true', true);
  
  -- Award 5 points for daily check-in
  UPDATE profiles
  SET points = COALESCE(points, 0) + NEW.points_earned,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  -- Reset bypass flag
  PERFORM set_config('app.bypass_gamification_check', 'false', true);
  
  RETURN NEW;
END;
$$;

-- Trigger for daily check-in points
CREATE TRIGGER on_daily_checkin
  AFTER INSERT ON public.daily_checkins
  FOR EACH ROW
  EXECUTE FUNCTION public.award_points_for_checkin();

-- Update handle_new_user to give 10 welcome points
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, points)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name', 10);
  RETURN new;
END;
$$;