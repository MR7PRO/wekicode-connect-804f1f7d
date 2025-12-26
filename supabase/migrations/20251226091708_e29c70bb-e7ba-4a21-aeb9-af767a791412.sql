-- Fix 1: Update job_applications RLS policy to only allow users to see their own applications
-- or job owners to see applications for their jobs

-- Drop existing SELECT policy if any
DROP POLICY IF EXISTS "Users can view their applications" ON public.job_applications;
DROP POLICY IF EXISTS "Job owners can view applications" ON public.job_applications;

-- Create proper policy: Users can view their own applications OR job owners can view applications for their jobs
CREATE POLICY "Users can view own applications or job owners can view"
ON public.job_applications
FOR SELECT
USING (
  auth.uid() = user_id 
  OR 
  EXISTS (
    SELECT 1 FROM jobs 
    WHERE jobs.id = job_applications.job_id 
    AND jobs.user_id = auth.uid()
  )
);

-- Fix 2: Add RLS policies for ai_chat_rate_limits table
-- Users should only see their own rate limit data

-- Drop any existing policies
DROP POLICY IF EXISTS "Users can view own rate limits" ON public.ai_chat_rate_limits;
DROP POLICY IF EXISTS "System can insert rate limits" ON public.ai_chat_rate_limits;
DROP POLICY IF EXISTS "System can update rate limits" ON public.ai_chat_rate_limits;

-- Create SELECT policy - users can view their own rate limits
CREATE POLICY "Users can view own rate limits"
ON public.ai_chat_rate_limits
FOR SELECT
USING (auth.uid() = user_id);

-- Create INSERT policy - authenticated users can create their own rate limit record
CREATE POLICY "Users can insert own rate limits"
ON public.ai_chat_rate_limits
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create UPDATE policy - authenticated users can update their own rate limit record
CREATE POLICY "Users can update own rate limits"
ON public.ai_chat_rate_limits
FOR UPDATE
USING (auth.uid() = user_id);