import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowRight,
  ThumbsUp, 
  ThumbsDown,
  MessageSquare, 
  Eye, 
  Clock,
  CheckCircle,
  Send,
  User,
  MoreVertical,
  Flag,
  Share2,
  Bookmark
} from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  votes: number;
  answers_count: number;
  views: number;
  is_solved: boolean;
  accepted_answer_id: string | null;
  user_id: string;
  created_at: string;
  author?: {
    full_name: string;
    avatar_url: string | null;
  };
}

interface Answer {
  id: string;
  content: string;
  votes: number;
  is_accepted: boolean;
  user_id: string;
  created_at: string;
  author?: {
    full_name: string;
    avatar_url: string | null;
  };
  comments?: Comment[];
}

interface Comment {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  author?: {
    full_name: string;
  };
}

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAnswer, setNewAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});

  useEffect(() => {
    if (id) {
      fetchQuestion();
      fetchAnswers();
      if (user) {
        fetchUserVotes();
      }
      incrementViews();
    }
  }, [id, user]);

  const fetchQuestion = async () => {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching question:', error);
      navigate('/questions');
      return;
    }

    // Fetch author profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('user_id', data.user_id)
      .maybeSingle();

    setQuestion({
      ...data,
      author: profile || { full_name: 'مستخدم', avatar_url: null }
    });
    setLoading(false);
  };

  const fetchAnswers = async () => {
    const { data, error } = await supabase
      .from('answers')
      .select('*')
      .eq('question_id', id)
      .order('is_accepted', { ascending: false })
      .order('votes', { ascending: false })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching answers:', error);
      return;
    }

    // Fetch author profiles and comments for each answer
    const answersWithDetails = await Promise.all(
      data.map(async (answer) => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('user_id', answer.user_id)
          .maybeSingle();

        const { data: comments } = await supabase
          .from('comments')
          .select('*')
          .eq('answer_id', answer.id)
          .order('created_at', { ascending: true });

        const commentsWithAuthors = await Promise.all(
          (comments || []).map(async (comment) => {
            const { data: commentProfile } = await supabase
              .from('profiles')
              .select('full_name')
              .eq('user_id', comment.user_id)
              .maybeSingle();
            return {
              ...comment,
              author: commentProfile || { full_name: 'مستخدم' }
            };
          })
        );

        return {
          ...answer,
          author: profile || { full_name: 'مستخدم', avatar_url: null },
          comments: commentsWithAuthors
        };
      })
    );

    setAnswers(answersWithDetails);
  };

  const fetchUserVotes = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('votes')
      .select('question_id, answer_id, vote_type')
      .eq('user_id', user.id);

    if (data) {
      const votes: Record<string, number> = {};
      data.forEach((vote) => {
        const key = vote.question_id || vote.answer_id;
        if (key) votes[key] = vote.vote_type;
      });
      setUserVotes(votes);
    }
  };

  const incrementViews = async () => {
    // Use atomic RPC function to prevent race conditions
    await supabase.rpc('increment_question_views', { question_uuid: id });
  };

  const handleVote = async (targetId: string, type: 'question' | 'answer', voteType: 1 | -1) => {
    if (!user) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "قم بتسجيل الدخول للتصويت",
        variant: "destructive"
      });
      return;
    }

    const currentVote = userVotes[targetId];
    
    if (currentVote === voteType) {
      // Remove vote
      await supabase
        .from('votes')
        .delete()
        .eq('user_id', user.id)
        .eq(type === 'question' ? 'question_id' : 'answer_id', targetId);

      // Update local state
      const newVotes = { ...userVotes };
      delete newVotes[targetId];
      setUserVotes(newVotes);

      // Update vote count
      if (type === 'question' && question) {
        setQuestion({ ...question, votes: question.votes - voteType });
      } else {
        setAnswers(answers.map(a => 
          a.id === targetId ? { ...a, votes: a.votes - voteType } : a
        ));
      }
    } else {
      // Upsert vote
      const voteData = type === 'question' 
        ? { user_id: user.id, question_id: targetId, vote_type: voteType }
        : { user_id: user.id, answer_id: targetId, vote_type: voteType };

      await supabase
        .from('votes')
        .upsert(voteData, { 
          onConflict: type === 'question' ? 'user_id,question_id' : 'user_id,answer_id' 
        });

      // Update local state
      setUserVotes({ ...userVotes, [targetId]: voteType });

      // Update vote count
      const voteDiff = currentVote ? voteType - currentVote : voteType;
      if (type === 'question' && question) {
        setQuestion({ ...question, votes: question.votes + voteDiff });
      } else {
        setAnswers(answers.map(a => 
          a.id === targetId ? { ...a, votes: a.votes + voteDiff } : a
        ));
      }
    }
  };

  const handleSubmitAnswer = async () => {
    if (!user) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "قم بتسجيل الدخول لإضافة إجابة",
        variant: "destructive"
      });
      return;
    }

    if (!newAnswer.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى كتابة إجابتك",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    const { data, error } = await supabase
      .from('answers')
      .insert({
        question_id: id,
        user_id: user.id,
        content: newAnswer
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة الإجابة",
        variant: "destructive"
      });
      setSubmitting(false);
      return;
    }

    // Use atomic RPC functions to prevent race conditions
    await supabase.rpc('increment_question_answers', { question_uuid: id });
    
    // Use secure RPC function to increment points (prevents cheating and race conditions)
    await supabase.rpc('increment_user_points', { points_to_add: 10 });

    toast({
      title: "تم إضافة إجابتك! 🎉",
      description: "حصلت على +10 نقاط",
    });

    setNewAnswer("");
    setSubmitting(false);
    fetchAnswers();
    fetchQuestion();
  };

  const handleAcceptAnswer = async (answerId: string) => {
    if (!user || !question || question.user_id !== user.id) return;

    // Update question
    await supabase
      .from('questions')
      .update({ 
        accepted_answer_id: answerId,
        is_solved: true 
      })
      .eq('id', id);

    // Update answers
    await supabase
      .from('answers')
      .update({ is_accepted: false })
      .eq('question_id', id);

    await supabase
      .from('answers')
      .update({ is_accepted: true })
      .eq('id', answerId);

    toast({
      title: "تم قبول الإجابة! ✓",
      description: "تم تحديد هذه الإجابة كأفضل إجابة",
    });

    fetchQuestion();
    fetchAnswers();
  };

  const handleAddComment = async (answerId: string) => {
    if (!user) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "قم بتسجيل الدخول لإضافة تعليق",
        variant: "destructive"
      });
      return;
    }

    if (!newComment.trim()) return;

    await supabase
      .from('comments')
      .insert({
        answer_id: answerId,
        user_id: user.id,
        content: newComment
      });

    toast({
      title: "تم إضافة التعليق!",
    });

    setNewComment("");
    setCommentingOn(null);
    fetchAnswers();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-4">السؤال غير موجود</h2>
            <Link to="/questions">
              <Button variant="hero">العودة للأسئلة</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link 
            to="/questions"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للأسئلة
          </Link>

          {/* Question Card */}
          <div className="glass rounded-2xl p-6 border-border/50 mb-8">
            <div className="flex gap-6">
              {/* Vote Column */}
              <div className="hidden md:flex flex-col items-center gap-2">
                <button 
                  onClick={() => handleVote(question.id, 'question', 1)}
                  className={`p-2 rounded-lg transition-colors ${
                    userVotes[question.id] === 1 
                      ? 'bg-success/20 text-success' 
                      : 'hover:bg-success/10 text-muted-foreground hover:text-success'
                  }`}
                >
                  <ThumbsUp className="w-6 h-6" />
                </button>
                <span className="text-2xl font-bold text-foreground">{question.votes}</span>
                <button 
                  onClick={() => handleVote(question.id, 'question', -1)}
                  className={`p-2 rounded-lg transition-colors ${
                    userVotes[question.id] === -1 
                      ? 'bg-destructive/20 text-destructive' 
                      : 'hover:bg-destructive/10 text-muted-foreground hover:text-destructive'
                  }`}
                >
                  <ThumbsDown className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-4">
                  {question.is_solved && (
                    <span className="px-3 py-1 rounded-lg bg-success/10 text-success text-sm font-medium flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      تم الحل
                    </span>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {question.title}
                </h1>

                <p className="text-foreground/90 whitespace-pre-wrap mb-6 leading-relaxed">
                  {question.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {question.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                      {question.author?.full_name?.charAt(0) || 'م'}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{question.author?.full_name || 'مستخدم'}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(question.created_at), { locale: ar, addSuffix: true })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{question.views} مشاهدة</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{question.answers_count} إجابة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Answers Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              {answers.length} إجابة
            </h2>

            <div className="space-y-6">
              {answers.map((answer) => (
                <div 
                  key={answer.id} 
                  className={`glass rounded-2xl p-6 border-border/50 ${
                    answer.is_accepted ? 'border-success/50 bg-success/5' : ''
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Vote Column */}
                    <div className="hidden md:flex flex-col items-center gap-2">
                      <button 
                        onClick={() => handleVote(answer.id, 'answer', 1)}
                        className={`p-2 rounded-lg transition-colors ${
                          userVotes[answer.id] === 1 
                            ? 'bg-success/20 text-success' 
                            : 'hover:bg-success/10 text-muted-foreground hover:text-success'
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </button>
                      <span className="text-xl font-bold text-foreground">{answer.votes}</span>
                      <button 
                        onClick={() => handleVote(answer.id, 'answer', -1)}
                        className={`p-2 rounded-lg transition-colors ${
                          userVotes[answer.id] === -1 
                            ? 'bg-destructive/20 text-destructive' 
                            : 'hover:bg-destructive/10 text-muted-foreground hover:text-destructive'
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </button>
                      
                      {answer.is_accepted && (
                        <div className="mt-2 text-success">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {answer.is_accepted && (
                        <div className="mb-3 px-3 py-1 rounded-lg bg-success/10 text-success text-sm font-medium inline-flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          أفضل إجابة
                        </div>
                      )}

                      <p className="text-foreground/90 whitespace-pre-wrap mb-4 leading-relaxed">
                        {answer.content}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent-foreground">
                            {answer.author?.full_name?.charAt(0) || 'م'}
                          </div>
                          <div>
                            <div className="font-medium text-foreground text-sm">{answer.author?.full_name || 'مستخدم'}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(answer.created_at), { locale: ar, addSuffix: true })}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {user && question.user_id === user.id && !answer.is_accepted && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAcceptAnswer(answer.id)}
                              className="text-success border-success/30 hover:bg-success/10"
                            >
                              <CheckCircle className="w-4 h-4" />
                              قبول كأفضل إجابة
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setCommentingOn(commentingOn === answer.id ? null : answer.id)}
                          >
                            <MessageSquare className="w-4 h-4" />
                            تعليق
                          </Button>
                        </div>
                      </div>

                      {/* Comments */}
                      {answer.comments && answer.comments.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                          {answer.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-2 text-sm">
                              <span className="font-medium text-primary">{comment.author?.full_name}:</span>
                              <span className="text-muted-foreground">{comment.content}</span>
                              <span className="text-muted-foreground/50">
                                – {formatDistanceToNow(new Date(comment.created_at), { locale: ar, addSuffix: true })}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment Form */}
                      {commentingOn === answer.id && (
                        <div className="mt-4 flex gap-2">
                          <input
                            type="text"
                            placeholder="أضف تعليقاً..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1 h-10 px-4 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(answer.id)}
                          />
                          <Button size="sm" onClick={() => handleAddComment(answer.id)}>
                            إرسال
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {answers.length === 0 && (
                <div className="text-center py-12 glass rounded-2xl border-border/50">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">لا توجد إجابات بعد</h3>
                  <p className="text-muted-foreground">كن أول من يجيب على هذا السؤال!</p>
                </div>
              )}
            </div>
          </div>

          {/* Add Answer Form */}
          <div className="glass rounded-2xl p-6 border-border/50">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              أضف إجابتك
            </h3>
            
            <Textarea
              placeholder="اكتب إجابتك هنا..."
              rows={6}
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="mb-4"
            />

            <div className="flex justify-end">
              <Button 
                variant="hero" 
                onClick={handleSubmitAnswer}
                disabled={submitting || !newAnswer.trim()}
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    نشر الإجابة
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
