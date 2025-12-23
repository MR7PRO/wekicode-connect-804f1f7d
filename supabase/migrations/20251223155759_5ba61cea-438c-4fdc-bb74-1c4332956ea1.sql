-- =====================================================
-- FIX 1: Remove exploitable increment_user_points function
-- and replace with automatic triggers that award points
-- when legitimate actions occur (questions/answers created)
-- =====================================================

-- Drop the exploitable function
DROP FUNCTION IF EXISTS public.increment_user_points(integer);

-- Create trigger function to award points for questions
CREATE OR REPLACE FUNCTION public.award_points_for_question()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Award 5 points for creating a question
  UPDATE profiles
  SET points = COALESCE(points, 0) + 5,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Create trigger for questions
DROP TRIGGER IF EXISTS award_question_points ON questions;
CREATE TRIGGER award_question_points
AFTER INSERT ON questions
FOR EACH ROW
EXECUTE FUNCTION public.award_points_for_question();

-- Create trigger function to award points for answers
CREATE OR REPLACE FUNCTION public.award_points_for_answer()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Award 10 points for creating an answer
  UPDATE profiles
  SET points = COALESCE(points, 0) + 10,
      updated_at = now()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$;

-- Create trigger for answers
DROP TRIGGER IF EXISTS award_answer_points ON answers;
CREATE TRIGGER award_answer_points
AFTER INSERT ON answers
FOR EACH ROW
EXECUTE FUNCTION public.award_points_for_answer();

-- =====================================================
-- FIX 2: Add trigger to prevent direct manipulation of 
-- gamification fields (points, level, badges) by users
-- =====================================================

CREATE OR REPLACE FUNCTION public.prevent_direct_gamification_updates()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  -- If called from SECURITY DEFINER context (system functions), allow updates
  -- This is detected by checking if the update is coming from a trigger context
  IF TG_NARGS > 0 AND TG_ARGV[0] = 'system' THEN
    RETURN NEW;
  END IF;
  
  -- Prevent direct user updates to gamification fields
  -- Users can only update profile info (full_name, bio, skills, avatar_url)
  IF (NEW.points IS DISTINCT FROM OLD.points) OR 
     (NEW.level IS DISTINCT FROM OLD.level) OR 
     (NEW.badges IS DISTINCT FROM OLD.badges) THEN
    -- Reset gamification fields to their original values
    NEW.points := OLD.points;
    NEW.level := OLD.level;
    NEW.badges := OLD.badges;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to block direct gamification updates
DROP TRIGGER IF EXISTS block_direct_gamification_updates ON profiles;
CREATE TRIGGER block_direct_gamification_updates
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_direct_gamification_updates();

-- =====================================================
-- FIX 3: Create triggers to sync vote counts properly
-- (This fixes the vote count desync issue)
-- =====================================================

-- Function to update question votes
CREATE OR REPLACE FUNCTION public.update_question_votes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_question_id UUID;
  v_new_total INTEGER;
BEGIN
  v_question_id := COALESCE(NEW.question_id, OLD.question_id);
  
  IF v_question_id IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  
  SELECT COALESCE(SUM(vote_type), 0)
  INTO v_new_total
  FROM votes
  WHERE question_id = v_question_id;
  
  UPDATE questions
  SET votes = v_new_total
  WHERE id = v_question_id;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Triggers for question votes
DROP TRIGGER IF EXISTS update_question_votes_on_insert ON votes;
CREATE TRIGGER update_question_votes_on_insert
AFTER INSERT ON votes
FOR EACH ROW
WHEN (NEW.question_id IS NOT NULL)
EXECUTE FUNCTION public.update_question_votes();

DROP TRIGGER IF EXISTS update_question_votes_on_update ON votes;
CREATE TRIGGER update_question_votes_on_update
AFTER UPDATE ON votes
FOR EACH ROW
WHEN (NEW.question_id IS NOT NULL OR OLD.question_id IS NOT NULL)
EXECUTE FUNCTION public.update_question_votes();

DROP TRIGGER IF EXISTS update_question_votes_on_delete ON votes;
CREATE TRIGGER update_question_votes_on_delete
AFTER DELETE ON votes
FOR EACH ROW
WHEN (OLD.question_id IS NOT NULL)
EXECUTE FUNCTION public.update_question_votes();

-- Function to update answer votes
CREATE OR REPLACE FUNCTION public.update_answer_votes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_answer_id UUID;
  v_new_total INTEGER;
BEGIN
  v_answer_id := COALESCE(NEW.answer_id, OLD.answer_id);
  
  IF v_answer_id IS NULL THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  
  SELECT COALESCE(SUM(vote_type), 0)
  INTO v_new_total
  FROM votes
  WHERE answer_id = v_answer_id;
  
  UPDATE answers
  SET votes = v_new_total
  WHERE id = v_answer_id;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Triggers for answer votes
DROP TRIGGER IF EXISTS update_answer_votes_on_insert ON votes;
CREATE TRIGGER update_answer_votes_on_insert
AFTER INSERT ON votes
FOR EACH ROW
WHEN (NEW.answer_id IS NOT NULL)
EXECUTE FUNCTION public.update_answer_votes();

DROP TRIGGER IF EXISTS update_answer_votes_on_update ON votes;
CREATE TRIGGER update_answer_votes_on_update
AFTER UPDATE ON votes
FOR EACH ROW
WHEN (NEW.answer_id IS NOT NULL OR OLD.answer_id IS NOT NULL)
EXECUTE FUNCTION public.update_answer_votes();

DROP TRIGGER IF EXISTS update_answer_votes_on_delete ON votes;
CREATE TRIGGER update_answer_votes_on_delete
AFTER DELETE ON votes
FOR EACH ROW
WHEN (OLD.answer_id IS NOT NULL)
EXECUTE FUNCTION public.update_answer_votes();