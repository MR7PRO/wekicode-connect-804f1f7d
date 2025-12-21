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
  TrendingUp
} from "lucide-react";
import { useState } from "react";

const categories = [
  "الكل", "JavaScript", "Python", "React", "Node.js", "قواعد البيانات", "DevOps", "أخرى"
];

const questions = [
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
];

export default function Questions() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

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
            <Button variant="hero" size="lg">
              <Plus className="w-5 h-5" />
              اطرح سؤالاً جديداً
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4 border-border/50">
              <HelpCircle className="w-6 h-6 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">2,547</div>
              <div className="text-sm text-muted-foreground">سؤال</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <MessageSquare className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl font-bold text-foreground">8,934</div>
              <div className="text-sm text-muted-foreground">إجابة</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <CheckCircle className="w-6 h-6 text-success mb-2" />
              <div className="text-2xl font-bold text-foreground">78%</div>
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
            {questions.map((question) => (
              <div
                key={question.id}
                className="glass rounded-2xl p-6 border-border/50 hover:border-primary/30 hover-lift transition-all cursor-pointer"
              >
                <div className="flex gap-4">
                  {/* Vote Column */}
                  <div className="hidden md:flex flex-col items-center gap-2 min-w-[80px]">
                    <button className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
                      <ThumbsUp className="w-5 h-5 text-muted-foreground hover:text-primary" />
                    </button>
                    <span className="text-xl font-bold text-foreground">{question.votes}</span>
                    <span className="text-xs text-muted-foreground">صوت</span>
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

                    <h3 className="text-lg font-bold text-foreground mb-2 hover:text-primary transition-colors">
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
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              عرض المزيد من الأسئلة
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
