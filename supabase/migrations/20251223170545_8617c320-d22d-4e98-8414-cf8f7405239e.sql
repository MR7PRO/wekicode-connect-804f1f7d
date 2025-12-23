-- Create function to award points for sharing educational content
CREATE OR REPLACE FUNCTION public.award_points_for_course()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Award 25 points for creating a course/educational content
  UPDATE profiles
  SET points = COALESCE(points, 0) + 25,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Create trigger to award points when course is created
CREATE OR REPLACE TRIGGER on_course_created
AFTER INSERT ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.award_points_for_course();