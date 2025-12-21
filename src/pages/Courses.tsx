import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  PlayCircle, 
  Clock, 
  Users,
  Search,
  Filter,
  Star,
  Award,
  FileText,
  Video,
  Coins
} from "lucide-react";
import { useState } from "react";

const categories = ["الكل", "تطوير الويب", "تطوير الموبايل", "علم البيانات", "DevOps", "تصميم"];

const courses = [
  {
    id: 1,
    title: "دورة React.js الشاملة من الصفر إلى الاحتراف",
    instructor: "أحمد محمد",
    instructorAvatar: "أ",
    category: "تطوير الويب",
    level: "متوسط",
    duration: "12 ساعة",
    lessons: 45,
    students: 234,
    rating: 4.8,
    reviews: 89,
    type: "فيديو",
    points: 50,
    thumbnail: "🎬",
    tags: ["React", "JavaScript", "Frontend"],
    description: "تعلم React.js من الصفر وصولاً لبناء تطبيقات متقدمة مع أفضل الممارسات...",
    free: false
  },
  {
    id: 2,
    title: "أساسيات Python للمبتدئين",
    instructor: "سارة علي",
    instructorAvatar: "س",
    category: "علم البيانات",
    level: "مبتدئ",
    duration: "8 ساعات",
    lessons: 32,
    students: 567,
    rating: 4.9,
    reviews: 156,
    type: "فيديو",
    points: 30,
    thumbnail: "🐍",
    tags: ["Python", "Programming", "Beginner"],
    description: "ابدأ رحلتك في البرمجة مع Python بطريقة سهلة ومبسطة...",
    free: true
  },
  {
    id: 3,
    title: "دليل Git و GitHub للمطورين",
    instructor: "محمد خالد",
    instructorAvatar: "م",
    category: "DevOps",
    level: "مبتدئ",
    duration: "4 ساعات",
    lessons: 18,
    students: 890,
    rating: 4.7,
    reviews: 234,
    type: "مقال",
    points: 15,
    thumbnail: "📚",
    tags: ["Git", "GitHub", "Version Control"],
    description: "تعلم أساسيات التحكم بالإصدارات والتعاون مع الفريق باستخدام Git...",
    free: true
  },
  {
    id: 4,
    title: "تصميم واجهات المستخدم UI/UX",
    instructor: "ياسمين أحمد",
    instructorAvatar: "ي",
    category: "تصميم",
    level: "متوسط",
    duration: "10 ساعات",
    lessons: 38,
    students: 345,
    rating: 4.6,
    reviews: 98,
    type: "فيديو",
    points: 40,
    thumbnail: "🎨",
    tags: ["Figma", "UI/UX", "Design"],
    description: "أتقن تصميم واجهات المستخدم الجذابة والتجربة المثالية للمستخدم...",
    free: false
  },
  {
    id: 5,
    title: "Node.js و Express.js للباك إند",
    instructor: "عمر حسن",
    instructorAvatar: "ع",
    category: "تطوير الويب",
    level: "متقدم",
    duration: "15 ساعة",
    lessons: 52,
    students: 189,
    rating: 4.8,
    reviews: 67,
    type: "فيديو",
    points: 60,
    thumbnail: "⚙️",
    tags: ["Node.js", "Express", "Backend"],
    description: "بناء APIs قوية ومتكاملة مع Node.js و Express...",
    free: false
  },
  {
    id: 6,
    title: "مقدمة في Docker و الحاويات",
    instructor: "خالد عمر",
    instructorAvatar: "خ",
    category: "DevOps",
    level: "متوسط",
    duration: "6 ساعات",
    lessons: 24,
    students: 267,
    rating: 4.5,
    reviews: 78,
    type: "فيديو",
    points: 35,
    thumbnail: "🐳",
    tags: ["Docker", "DevOps", "Containers"],
    description: "تعلم كيفية استخدام Docker لتبسيط عملية التطوير والنشر...",
    free: false
  },
];

export default function Courses() {
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
                <span className="text-foreground">المواد</span>
                {" "}
                <span className="text-gradient-primary">التعليمية</span>
              </h1>
              <p className="text-muted-foreground">
                تعلم من دورات ومقالات مشتركة من مجتمع المبرمجين
              </p>
            </div>
            <Button variant="success" size="lg">
              <BookOpen className="w-5 h-5" />
              شارك محتوى تعليمي
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4 border-border/50">
              <BookOpen className="w-6 h-6 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">84</div>
              <div className="text-sm text-muted-foreground">دورة</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <FileText className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">مقال</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <Users className="w-6 h-6 text-success mb-2" />
              <div className="text-2xl font-bold text-foreground">3,450</div>
              <div className="text-sm text-muted-foreground">طالب</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <Coins className="w-6 h-6 text-warning mb-2" />
              <div className="text-2xl font-bold text-foreground">+25</div>
              <div className="text-sm text-muted-foreground">نقاط للمشاركة</div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث عن دورة أو موضوع..."
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

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="glass rounded-2xl overflow-hidden border-border/50 hover:border-primary/30 hover-lift transition-all cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="h-40 bg-gradient-to-br from-primary/20 via-card to-accent/10 flex items-center justify-center relative">
                  <span className="text-6xl">{course.thumbnail}</span>
                  {course.free && (
                    <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-success text-success-foreground text-xs font-bold">
                      مجاني
                    </span>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                    <PlayCircle className="w-14 h-14 text-foreground/0 group-hover:text-foreground/80 transition-all" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                      {course.category}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs">
                      {course.level}
                    </span>
                    {course.type === "فيديو" ? (
                      <Video className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                      {course.instructorAvatar}
                    </div>
                    <span className="text-sm text-muted-foreground">{course.instructor}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="font-medium text-foreground">{course.rating}</span>
                      <span>({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>

                  {/* Meta & Points */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} درس</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-accent font-bold">
                      <Coins className="w-4 h-4" />
                      <span>+{course.points}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              عرض المزيد من الدورات
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
