-- Create table for rate limiting AI chat requests
CREATE TABLE IF NOT EXISTS public.ai_chat_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  request_count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.ai_chat_rate_limits ENABLE ROW LEVEL SECURITY;

-- Only allow the service role to manage this table (edge functions use service role)
-- No policies for authenticated users - they cannot directly access this table

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_chat_rate_limits_user_id ON public.ai_chat_rate_limits(user_id);

-- Create function to check and update rate limit
CREATE OR REPLACE FUNCTION public.check_ai_chat_rate_limit(p_user_id uuid, p_max_requests integer DEFAULT 20, p_window_minutes integer DEFAULT 60)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_record RECORD;
  v_window_start timestamp with time zone;
  v_now timestamp with time zone := now();
  v_result jsonb;
BEGIN
  -- Calculate window start
  v_window_start := v_now - (p_window_minutes || ' minutes')::interval;
  
  -- Try to get existing record
  SELECT * INTO v_record
  FROM ai_chat_rate_limits
  WHERE user_id = p_user_id
  FOR UPDATE;
  
  IF NOT FOUND THEN
    -- First request from this user
    INSERT INTO ai_chat_rate_limits (user_id, request_count, window_start)
    VALUES (p_user_id, 1, v_now);
    
    RETURN jsonb_build_object(
      'allowed', true,
      'remaining', p_max_requests - 1,
      'reset_at', v_now + (p_window_minutes || ' minutes')::interval
    );
  END IF;
  
  -- Check if window has expired
  IF v_record.window_start < v_window_start THEN
    -- Reset the window
    UPDATE ai_chat_rate_limits
    SET request_count = 1, window_start = v_now
    WHERE user_id = p_user_id;
    
    RETURN jsonb_build_object(
      'allowed', true,
      'remaining', p_max_requests - 1,
      'reset_at', v_now + (p_window_minutes || ' minutes')::interval
    );
  END IF;
  
  -- Check if limit exceeded
  IF v_record.request_count >= p_max_requests THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'remaining', 0,
      'reset_at', v_record.window_start + (p_window_minutes || ' minutes')::interval,
      'retry_after', EXTRACT(EPOCH FROM (v_record.window_start + (p_window_minutes || ' minutes')::interval - v_now))::integer
    );
  END IF;
  
  -- Increment counter
  UPDATE ai_chat_rate_limits
  SET request_count = request_count + 1
  WHERE user_id = p_user_id;
  
  RETURN jsonb_build_object(
    'allowed', true,
    'remaining', p_max_requests - v_record.request_count - 1,
    'reset_at', v_record.window_start + (p_window_minutes || ' minutes')::interval
  );
END;
$$;