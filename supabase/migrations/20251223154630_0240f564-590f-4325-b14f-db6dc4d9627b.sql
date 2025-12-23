-- Fix 1: Create secure functions for updating gamification fields (points, level, badges)
-- These can only be called by the system, not directly by users

-- Function to safely update profile info (only safe fields)
CREATE OR REPLACE FUNCTION update_profile_info(
  p_full_name TEXT DEFAULT NULL,
  p_bio TEXT DEFAULT NULL,
  p_skills TEXT[] DEFAULT NULL,
  p_avatar_url TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles
  SET 
    full_name = COALESCE(p_full_name, full_name),
    bio = COALESCE(p_bio, bio),
    skills = COALESCE(p_skills, skills),
    avatar_url = COALESCE(p_avatar_url, avatar_url),
    updated_at = now()
  WHERE user_id = auth.uid();
END;
$$;

-- Function to atomically increment user points (prevents race conditions)
CREATE OR REPLACE FUNCTION increment_user_points(points_to_add INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE profiles 
  SET 
    points = points + points_to_add,
    updated_at = now()
  WHERE user_id = auth.uid();
END;
$$;

-- Function to atomically increment question views
CREATE OR REPLACE FUNCTION increment_question_views(question_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  UPDATE questions 
  SET views = views + 1 
  WHERE id = question_uuid;
END;
$$;

-- Function to atomically increment question answers count
CREATE OR REPLACE FUNCTION increment_question_answers(question_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  UPDATE questions 
  SET answers_count = answers_count + 1 
  WHERE id = question_uuid;
END;
$$;

-- Fix 2: Restrict profile updates to safe fields only
-- Drop the old permissive policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create a more restrictive policy that prevents updating gamification fields
-- Users can only update their profile info (not points, level, badges)
CREATE POLICY "Users can update profile info only" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
);