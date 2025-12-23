-- Create trigger to award points for creating a question (if not exists)
CREATE OR REPLACE TRIGGER on_question_created
AFTER INSERT ON public.questions
FOR EACH ROW
EXECUTE FUNCTION public.award_points_for_question();

-- Create trigger to award points for creating an answer (if not exists)  
CREATE OR REPLACE TRIGGER on_answer_created
AFTER INSERT ON public.answers
FOR EACH ROW
EXECUTE FUNCTION public.award_points_for_answer();

-- Update profiles with null points to 0
UPDATE public.profiles SET points = 0 WHERE points IS NULL;
UPDATE public.profiles SET level = 1 WHERE level IS NULL;