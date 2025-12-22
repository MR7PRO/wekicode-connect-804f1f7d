import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  MessageSquare, 
  ThumbsUp, 
  Eye, 
  Clock, 
  Tag,
  Search,
  Filter,
  Plus,
  CheckCircle,
  TrendingUp,
  X,
  ThumbsDown,
  Send
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const categories = [
  "الكل", "JavaScript", "Python", "React", "Node.js", "قواعد البيانات", "DevOps", "TypeScript", "CSS", "أخرى"
];

const initialQuestions = [
  {
    id: 1,
    title: "كيف أقوم بتحسين أداء تطبيق React الخاص بي؟",
    excerpt: "لدي تطبيق React يعاني من بطء في التحميل، ما هي أفضل الممارسات لتحسين الأداء؟",
    author: "أحمد محمد",
    avatar: "أ",
    category: "React",
    votes: 24,
    answers: 8,
    views: 156,
    time: "منذ ساعتين",
    solved: true,
    tags: ["React", "Performance", "Optimization"]
  },
  {
    id: 2,
    title: "مشكلة في الاتصال بقاعدة البيانات PostgreSQL",
    excerpt: "أواجه خطأ connection refused عند محاولة الاتصال بقاعدة البيانات من Node.js",
    author: "سارة علي",
    avatar: "س",
    category: "قواعد البيانات",
    votes: 12,
    answers: 5,
    views: 89,
    time: "منذ 4 ساعات",
    solved: false,
    tags: ["PostgreSQL", "Node.js", "Database"]
  },
  {
    id: 3,
    title: "شرح مفهوم async/await في JavaScript",
    excerpt: "هل يمكن شرح كيفية عمل async/await بشكل مبسط مع أمثلة عملية؟",
    author: "محمد خالد",
    avatar: "م",
    category: "JavaScript",
    votes: 45,
    answers: 12,
    views: 324,
    time: "منذ يوم",
    solved: true,
    tags: ["JavaScript", "Async", "Promises"]
  },
  {
    id: 4,
    title: "أفضل طريقة لإدارة State في تطبيق كبير",
    excerpt: "ما الفرق بين Redux و Context API ومتى أستخدم كل منهما؟",
    author: "ياسمين أحمد",
    avatar: "ي",
    category: "React",
    votes: 31,
    answers: 7,
    views: 198,
    time: "منذ يومين",
    solved: true,
    tags: ["React", "Redux", "State Management"]
  },
  {
    id: 5,
    title: "كيفية إعداد CI/CD باستخدام GitHub Actions",
    excerpt: "أريد أتمتة عملية النشر لتطبيقي، كيف أبدأ مع GitHub Actions؟",
    author: "عمر حسن",
    avatar: "ع",
    category: "DevOps",
    votes: 18,
    answers: 3,
    views: 67,
    time: "منذ 3 أيام",
    solved: false,
    tags: ["GitHub Actions", "CI/CD", "DevOps"]
  },
  {
    id: 6,
    title: "كيف أستخدم TypeScript مع React؟",
    excerpt: "أريد تحويل مشروع React إلى TypeScript، ما هي الخطوات الأساسية؟",
    author: "ليلى حسين",
    avatar: "ل",
    category: "TypeScript",
    votes: 28,
    answers: 6,
    views: 145,
    time: "منذ 4 أيام",
    solved: true,
    tags: ["TypeScript", "React", "Migration"]
  },
  {
    id: 7,
    title: "مشكلة في Flexbox مع RTL",
    excerpt: "عند استخدام flex-direction: row مع اللغة العربية تظهر العناصر بشكل معكوس",
    author: "نور الدين",
    avatar: "ن",
    category: "CSS",
    votes: 15,
    answers: 4,
    views: 78,
    time: "منذ 5 أيام",
    solved: false,
    tags: ["CSS", "Flexbox", "RTL"]
  },
  {
    id: 8,
    title: "أفضل طريقة لعمل Authentication في Node.js",
    excerpt: "هل JWT هو الخيار الأفضل لتطبيقات REST API؟",
    author: "كريم سعيد",
    avatar: "ك",
    category: "Node.js",
    votes: 34,
    answers: 9,
    views: 234,
    time: "منذ أسبوع",
    solved: true,
    tags: ["Node.js", "JWT", "Authentication"]
  },
];

export default function Questions() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState(initialQuestions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<typeof initialQuestions[0] | null>(null);
  const [newAnswer, setNewAnswer] = useState("");
  
  // New question form
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    category: "JavaScript",
    tags: ""
  });

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === "الكل" || q.category === selectedCategory;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddQuestion = () => {
    if (!newQuestion.title || !newQuestion.content) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const question = {
      id: questions.length + 1,
      title: newQuestion.title,
      excerpt: newQuestion.content.slice(0, 100) + "...",
      author: "أنت",
      avatar: "أ",
      category: newQuestion.category,
      votes: 0,
      answers: 0,
      views: 1,
      time: "الآن",
      solved: false,
      tags: newQuestion.tags.split(",").map(t => t.trim()).filter(Boolean)
    };

    setQuestions([question, ...questions]);
    setNewQuestion({ title: "", content: "", category: "JavaScript", tags: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "تم نشر السؤال! 🎉",
      description: "سيتم مراجعة سؤالك وستحصل على +5 نقاط",
    });
  };

  const handleVote = (questionId: number, type: 'up' | 'down') => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, votes: type === 'up' ? q.votes + 1 : q.votes - 1 }
        : q
    ));
    toast({
      title: type === 'up' ? "تم التصويت بالإيجاب ✓" : "تم التصويت بالسلب",
      description: `حصلت على +1 نقطة للمشاركة`,
    });
  };

  const handleAddAnswer = () => {
    if (!newAnswer.trim()) return;
    
    if (selectedQuestion) {
      setQuestions(questions.map(q =>
        q.id === selectedQuestion.id
          ? { ...q, answers: q.answers + 1 }
          : q
      ));
    }
    
    toast({
      title: "تم إضافة إجابتك! 🎉",
      description: "حصلت على +10 نقاط للإجابة",
    });
    setNewAnswer("");
    setSelectedQuestion(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="text-foreground">الأسئلة</span>
                {" "}
                <span className="text-gradient-primary">والأجوبة</span>
              </h1>
              <p className="text-muted-foreground">
                اطرح سؤالك أو ساعد الآخرين واكسب النقاط
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" size="lg">
                  <Plus className="w-5 h-5" />
                  اطرح سؤالاً جديداً
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">اطرح سؤالك</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">عنوان السؤال *</label>
                    <Input
                      placeholder="ما هو سؤالك بإيجاز؟"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">تفاصيل السؤال *</label>
                    <Textarea
                      placeholder="اشرح سؤالك بالتفصيل..."
                      rows={5}
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">التصنيف</label>
                      <select
                        className="w-full h-10 rounded-lg bg-secondary border border-border px-3"
                        value={newQuestion.category}
                        onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                      >
                        {categories.filter(c => c !== "الكل").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">الوسوم</label>
                      <Input
                        placeholder="React, JavaScript..."
                        value={newQuestion.tags}
                        onChange={(e) => setNewQuestion({...newQuestion, tags: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button className="w-full" variant="hero" onClick={handleAddQuestion}>
                    <Send className="w-4 h-4" />
                    نشر السؤال
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4 border-border/50">
              <HelpCircle className="w-6 h-6 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">{questions.length.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">سؤال</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <MessageSquare className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl font-bold text-foreground">{questions.reduce((acc, q) => acc + q.answers, 0).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">إجابة</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <CheckCircle className="w-6 h-6 text-success mb-2" />
              <div className="text-2xl font-bold text-foreground">{Math.round(questions.filter(q => q.solved).length / questions.length * 100)}%</div>
              <div className="text-sm text-muted-foreground">نسبة الحل</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <TrendingUp className="w-6 h-6 text-warning mb-2" />
              <div className="text-2xl font-bold text-foreground">+10</div>
              <div className="text-sm text-muted-foreground">نقاط للإجابة</div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث عن سؤال..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pr-12 pl-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <Button variant="outline" size="lg">
              <Filter className="w-5 h-5" />
              فلترة
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="glass rounded-2xl p-6 border-border/50 hover:border-primary/30 hover-lift transition-all"
              >
                <div className="flex gap-4">
                  {/* Vote Column */}
                  <div className="hidden md:flex flex-col items-center gap-2 min-w-[80px]">
                    <button 
                      onClick={() => handleVote(question.id, 'up')}
                      className="p-2 rounded-lg hover:bg-success/10 transition-colors group"
                    >
                      <ThumbsUp className="w-5 h-5 text-muted-foreground group-hover:text-success" />
                    </button>
                    <span className="text-xl font-bold text-foreground">{question.votes}</span>
                    <button 
                      onClick={() => handleVote(question.id, 'down')}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors group"
                    >
                      <ThumbsDown className="w-5 h-5 text-muted-foreground group-hover:text-destructive" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      {question.solved && (
                        <span className="px-2 py-1 rounded-md bg-success/10 text-success text-xs font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          تم الحل
                        </span>
                      )}
                      <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {question.category}
                      </span>
                    </div>

                    <h3 
                      className="text-lg font-bold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer"
                      onClick={() => setSelectedQuestion(question)}
                    >
                      {question.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {question.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                            {question.avatar}
                          </div>
                          <span>{question.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{question.answers} إجابة</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{question.views} مشاهدة</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{question.time}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedQuestion(question)}
                      >
                        <MessageSquare className="w-4 h-4" />
                        أضف إجابة
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">لا توجد أسئلة</h3>
              <p className="text-muted-foreground mb-4">لم نجد أي أسئلة تطابق بحثك</p>
              <Button variant="hero" onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4" />
                اطرح أول سؤال
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredQuestions.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                عرض المزيد من الأسئلة
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Answer Dialog */}
      <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedQuestion?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 rounded-xl bg-secondary/50">
              <p className="text-muted-foreground">{selectedQuestion?.excerpt}</p>
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <span>بواسطة {selectedQuestion?.author}</span>
                <span>•</span>
                <span>{selectedQuestion?.time}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">إجابتك</label>
              <Textarea
                placeholder="اكتب إجابتك هنا..."
                rows={5}
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
            </div>
            
            <Button className="w-full" variant="hero" onClick={handleAddAnswer}>
              <Send className="w-4 h-4" />
              إرسال الإجابة (+10 نقاط)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
