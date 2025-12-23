
-- Create questions table
CREATE TABLE public.questions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    votes INTEGER DEFAULT 0,
    answers_count INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    is_solved BOOLEAN DEFAULT false,
    accepted_answer_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create answers table
CREATE TABLE public.answers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    votes INTEGER DEFAULT 0,
    is_accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table
CREATE TABLE public.comments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
    answer_id UUID REFERENCES public.answers(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT comments_parent_check CHECK (
        (question_id IS NOT NULL AND answer_id IS NULL) OR
        (question_id IS NULL AND answer_id IS NOT NULL)
    )
);

-- Create votes table for tracking user votes
CREATE TABLE public.votes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
    answer_id UUID REFERENCES public.answers(id) ON DELETE CASCADE,
    vote_type INTEGER NOT NULL CHECK (vote_type IN (-1, 1)),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT votes_target_check CHECK (
        (question_id IS NOT NULL AND answer_id IS NULL) OR
        (question_id IS NULL AND answer_id IS NOT NULL)
    ),
    CONSTRAINT votes_unique_question UNIQUE (user_id, question_id),
    CONSTRAINT votes_unique_answer UNIQUE (user_id, answer_id)
);

-- Create jobs table
CREATE TABLE public.jobs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    company TEXT,
    budget_min INTEGER,
    budget_max INTEGER,
    job_type TEXT NOT NULL DEFAULT 'remote',
    skills TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'open',
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job applications table
CREATE TABLE public.job_applications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    cover_letter TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT job_applications_unique UNIQUE (job_id, user_id)
);

-- Create courses table
CREATE TABLE public.courses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    instructor TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT NOT NULL DEFAULT 'beginner',
    duration TEXT,
    lessons_count INTEGER DEFAULT 0,
    students_count INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0,
    image_url TEXT,
    is_free BOOLEAN DEFAULT false,
    price INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course enrollments table
CREATE TABLE public.course_enrollments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    progress INTEGER DEFAULT 0,
    completed_lessons INTEGER[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT course_enrollments_unique UNIQUE (course_id, user_id)
);

-- Create rewards table
CREATE TABLE public.rewards (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    points_cost INTEGER NOT NULL,
    stock INTEGER DEFAULT -1,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reward redemptions table
CREATE TABLE public.reward_redemptions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    reward_id UUID NOT NULL REFERENCES public.rewards(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    points_spent INTEGER NOT NULL,
    redemption_code TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved/favorites table
CREATE TABLE public.user_favorites (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT favorites_target_check CHECK (
        (job_id IS NOT NULL AND course_id IS NULL) OR
        (job_id IS NULL AND course_id IS NOT NULL)
    )
);

-- Enable RLS on all tables
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Questions policies
CREATE POLICY "Questions are viewable by everyone" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Users can create questions" ON public.questions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own questions" ON public.questions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own questions" ON public.questions FOR DELETE USING (auth.uid() = user_id);

-- Answers policies
CREATE POLICY "Answers are viewable by everyone" ON public.answers FOR SELECT USING (true);
CREATE POLICY "Users can create answers" ON public.answers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own answers" ON public.answers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own answers" ON public.answers FOR DELETE USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Votes policies
CREATE POLICY "Votes are viewable by everyone" ON public.votes FOR SELECT USING (true);
CREATE POLICY "Users can vote" ON public.votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can change their vote" ON public.votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can remove their vote" ON public.votes FOR DELETE USING (auth.uid() = user_id);

-- Jobs policies
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Users can create jobs" ON public.jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own jobs" ON public.jobs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own jobs" ON public.jobs FOR DELETE USING (auth.uid() = user_id);

-- Job applications policies
CREATE POLICY "Users can view their own applications" ON public.job_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Job owners can view applications" ON public.job_applications FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.jobs WHERE id = job_id AND user_id = auth.uid())
);
CREATE POLICY "Users can apply to jobs" ON public.job_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their applications" ON public.job_applications FOR UPDATE USING (auth.uid() = user_id);

-- Courses policies
CREATE POLICY "Courses are viewable by everyone" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Users can create courses" ON public.courses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own courses" ON public.courses FOR UPDATE USING (auth.uid() = user_id);

-- Course enrollments policies
CREATE POLICY "Users can view their enrollments" ON public.course_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll in courses" ON public.course_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their enrollment" ON public.course_enrollments FOR UPDATE USING (auth.uid() = user_id);

-- Rewards policies
CREATE POLICY "Rewards are viewable by everyone" ON public.rewards FOR SELECT USING (true);

-- Reward redemptions policies
CREATE POLICY "Users can view their redemptions" ON public.reward_redemptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can redeem rewards" ON public.reward_redemptions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User favorites policies
CREATE POLICY "Users can view their favorites" ON public.user_favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON public.user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove favorites" ON public.user_favorites FOR DELETE USING (auth.uid() = user_id);

-- Add foreign key for accepted answer
ALTER TABLE public.questions ADD CONSTRAINT questions_accepted_answer_fkey 
    FOREIGN KEY (accepted_answer_id) REFERENCES public.answers(id) ON DELETE SET NULL;

-- Create triggers for updated_at
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON public.questions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_answers_updated_at BEFORE UPDATE ON public.answers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_enrollments_updated_at BEFORE UPDATE ON public.course_enrollments
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
