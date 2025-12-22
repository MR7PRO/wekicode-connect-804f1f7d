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
  Coins,
  Plus,
  CheckCircle,
  Play,
  Heart,
  HeartOff,
  Send
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const categories = ["الكل", "تطوير الويب", "تطوير الموبايل", "علم البيانات", "DevOps", "تصميم", "ذكاء اصطناعي"];

const initialCourses = [
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
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=200&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=200&fit=crop",
    tags: ["Docker", "DevOps", "Containers"],
    description: "تعلم كيفية استخدام Docker لتبسيط عملية التطوير والنشر...",
    free: false
  },
  {
    id: 7,
    title: "تطوير تطبيقات Flutter للموبايل",
    instructor: "نور الدين",
    instructorAvatar: "ن",
    category: "تطوير الموبايل",
    level: "متوسط",
    duration: "14 ساعة",
    lessons: 48,
    students: 312,
    rating: 4.7,
    reviews: 95,
    type: "فيديو",
    points: 55,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    tags: ["Flutter", "Dart", "Mobile"],
    description: "بناء تطبيقات موبايل احترافية للأندرويد والآيفون بكود واحد...",
    free: false
  },
  {
    id: 8,
    title: "أساسيات الذكاء الاصطناعي مع Python",
    instructor: "ليلى حسين",
    instructorAvatar: "ل",
    category: "ذكاء اصطناعي",
    level: "مبتدئ",
    duration: "10 ساعات",
    lessons: 35,
    students: 421,
    rating: 4.9,
    reviews: 134,
    type: "فيديو",
    points: 45,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    tags: ["AI", "Machine Learning", "Python"],
    description: "دخول عالم الذكاء الاصطناعي وتعلم الآلة من البداية...",
    free: true
  },
  {
    id: 9,
    title: "تصميم الجرافيك باستخدام Photoshop",
    instructor: "ريم سعيد",
    instructorAvatar: "ر",
    category: "تصميم",
    level: "مبتدئ",
    duration: "8 ساعات",
    lessons: 28,
    students: 456,
    rating: 4.6,
    reviews: 112,
    type: "فيديو",
    points: 30,
    thumbnail: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=200&fit=crop",
    tags: ["Photoshop", "Design", "Graphics"],
    description: "تعلم أساسيات التصميم الجرافيكي باستخدام Adobe Photoshop...",
    free: false
  },
];

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState(initialCourses);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const [favoriteCourses, setFavoriteCourses] = useState<number[]>([]);
  const [courseProgress, setCourseProgress] = useState<{[key: number]: number}>({});
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof initialCourses[0] | null>(null);
  
  // New course form
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "تطوير الويب",
    level: "مبتدئ",
    duration: "",
    type: "فيديو",
    link: ""
  });

  const filteredCourses = courses.filter(c => {
    const matchesCategory = selectedCategory === "الكل" || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = (course: typeof initialCourses[0]) => {
    if (enrolledCourses.includes(course.id)) {
      // Already enrolled, start course
      setSelectedCourse(course);
      toast({
        title: "استئناف الدورة 📚",
        description: `جاري تحميل ${course.title}...`,
      });
      return;
    }

    setEnrolledCourses([...enrolledCourses, course.id]);
    setCourseProgress({ ...courseProgress, [course.id]: 0 });
    setCourses(courses.map(c => 
      c.id === course.id ? { ...c, students: c.students + 1 } : c
    ));
    
    toast({
      title: "تم التسجيل بنجاح! 🎉",
      description: `ستحصل على +${course.points} نقاط عند إكمال الدورة`,
    });
  };

  const toggleFavorite = (courseId: number) => {
    if (favoriteCourses.includes(courseId)) {
      setFavoriteCourses(favoriteCourses.filter(id => id !== courseId));
      toast({ title: "تم إزالة الدورة من المفضلة" });
    } else {
      setFavoriteCourses([...favoriteCourses, courseId]);
      toast({ title: "تم إضافة الدورة للمفضلة ❤️" });
    }
  };

  const handleWatchLesson = (courseId: number) => {
    const currentProgress = courseProgress[courseId] || 0;
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const newProgress = Math.min(currentProgress + Math.round(100 / course.lessons), 100);
    setCourseProgress({ ...courseProgress, [courseId]: newProgress });

    if (newProgress >= 100) {
      toast({
        title: "أكملت الدورة! 🎉",
        description: `حصلت على +${course.points} نقاط`,
      });
    } else {
      toast({
        title: "أحسنت! 👏",
        description: `التقدم: ${newProgress}%`,
      });
    }
    setSelectedCourse(null);
  };

  const handleShareCourse = () => {
    if (!newCourse.title || !newCourse.description) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const course = {
      id: courses.length + 1,
      title: newCourse.title,
      instructor: "أنت",
      instructorAvatar: "أ",
      category: newCourse.category,
      level: newCourse.level,
      duration: newCourse.duration || "غير محدد",
      lessons: 10,
      students: 0,
      rating: 0,
      reviews: 0,
      type: newCourse.type,
      points: 25,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
      tags: [newCourse.category],
      description: newCourse.description,
      free: true
    };

    setCourses([course, ...courses]);
    setNewCourse({ title: "", description: "", category: "تطوير الويب", level: "مبتدئ", duration: "", type: "فيديو", link: "" });
    setIsShareDialogOpen(false);
    
    toast({
      title: "تم نشر المحتوى! 🎉",
      description: "ستحصل على +25 نقاط عند أول طالب مسجل",
    });
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
                <span className="text-foreground">المواد</span>
                {" "}
                <span className="text-gradient-primary">التعليمية</span>
              </h1>
              <p className="text-muted-foreground">
                تعلم من دورات ومقالات مشتركة من مجتمع المبرمجين
              </p>
            </div>
            
            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="success" size="lg">
                  <BookOpen className="w-5 h-5" />
                  شارك محتوى تعليمي
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">شارك محتوى تعليمي</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">عنوان المحتوى *</label>
                    <Input
                      placeholder="مثال: دورة تعلم JavaScript"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">الوصف *</label>
                    <Textarea
                      placeholder="اشرح ماذا سيتعلم الطلاب..."
                      rows={3}
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">التصنيف</label>
                      <select
                        className="w-full h-10 rounded-lg bg-secondary border border-border px-3"
                        value={newCourse.category}
                        onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                      >
                        {categories.filter(c => c !== "الكل").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">المستوى</label>
                      <select
                        className="w-full h-10 rounded-lg bg-secondary border border-border px-3"
                        value={newCourse.level}
                        onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                      >
                        <option value="مبتدئ">مبتدئ</option>
                        <option value="متوسط">متوسط</option>
                        <option value="متقدم">متقدم</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">النوع</label>
                      <select
                        className="w-full h-10 rounded-lg bg-secondary border border-border px-3"
                        value={newCourse.type}
                        onChange={(e) => setNewCourse({...newCourse, type: e.target.value})}
                      >
                        <option value="فيديو">فيديو</option>
                        <option value="مقال">مقال</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">المدة</label>
                      <Input
                        placeholder="مثال: 5 ساعات"
                        value={newCourse.duration}
                        onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">رابط المحتوى</label>
                    <Input
                      placeholder="https://..."
                      value={newCourse.link}
                      onChange={(e) => setNewCourse({...newCourse, link: e.target.value})}
                    />
                  </div>
                  <Button className="w-full" variant="hero" onClick={handleShareCourse}>
                    <Send className="w-4 h-4" />
                    نشر المحتوى (+25 نقاط)
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4 border-border/50">
              <BookOpen className="w-6 h-6 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">{courses.length}</div>
              <div className="text-sm text-muted-foreground">دورة</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <FileText className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl font-bold text-foreground">{courses.filter(c => c.type === "مقال").length}</div>
              <div className="text-sm text-muted-foreground">مقال</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <Users className="w-6 h-6 text-success mb-2" />
              <div className="text-2xl font-bold text-foreground">{courses.reduce((acc, c) => acc + c.students, 0).toLocaleString()}</div>
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
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`glass rounded-2xl overflow-hidden border-border/50 hover:border-primary/30 hover-lift transition-all cursor-pointer group ${
                  enrolledCourses.includes(course.id) ? "border-success/30" : ""
                }`}
              >
                {/* Thumbnail */}
                <div className="h-40 relative overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  {course.free && (
                    <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-success text-success-foreground text-xs font-bold">
                      مجاني
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(course.id); }}
                    className="absolute top-3 left-3 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
                  >
                    {favoriteCourses.includes(course.id) ? (
                      <Heart className="w-4 h-4 text-destructive fill-destructive" />
                    ) : (
                      <Heart className="w-4 h-4 text-foreground" />
                    )}
                  </button>
                  {enrolledCourses.includes(course.id) && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-success/90 text-success-foreground text-xs font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      مسجل
                    </div>
                  )}
                  <div 
                    onClick={() => handleEnroll(course)}
                    className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center"
                  >
                    <PlayCircle className="w-14 h-14 text-foreground/0 group-hover:text-foreground/80 transition-all" />
                  </div>
                </div>

                {/* Progress bar for enrolled courses */}
                {enrolledCourses.includes(course.id) && (
                  <div className="px-5 pt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">التقدم</span>
                      <span className="text-primary font-medium">{courseProgress[course.id] || 0}%</span>
                    </div>
                    <Progress value={courseProgress[course.id] || 0} className="h-1.5" />
                  </div>
                )}

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
                      <span className="font-medium text-foreground">{course.rating || "-"}</span>
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

                  {/* Action Button */}
                  <Button 
                    className="w-full mt-4" 
                    variant={enrolledCourses.includes(course.id) ? "secondary" : "hero"}
                    onClick={() => handleEnroll(course)}
                  >
                    {enrolledCourses.includes(course.id) ? (
                      <>
                        <Play className="w-4 h-4" />
                        استئناف الدورة
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        سجل الآن
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">لا توجد دورات</h3>
              <p className="text-muted-foreground mb-4">لم نجد أي دورات تطابق بحثك</p>
              <Button variant="hero" onClick={() => setIsShareDialogOpen(true)}>
                <Plus className="w-4 h-4" />
                شارك أول دورة
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredCourses.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                عرض المزيد من الدورات
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Course Viewer Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedCourse?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="aspect-video rounded-xl overflow-hidden bg-secondary">
              <img 
                src={selectedCourse?.thumbnail} 
                alt={selectedCourse?.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>المدرب: {selectedCourse?.instructor}</span>
                <span>•</span>
                <span>{selectedCourse?.lessons} درس</span>
                <span>•</span>
                <span>{selectedCourse?.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-accent font-bold">
                <Coins className="w-4 h-4" />
                <span>+{selectedCourse?.points} نقاط عند الإكمال</span>
              </div>
            </div>

            {selectedCourse && enrolledCourses.includes(selectedCourse.id) && (
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">التقدم في الدورة</span>
                  <span className="text-primary font-medium">{courseProgress[selectedCourse.id] || 0}%</span>
                </div>
                <Progress value={courseProgress[selectedCourse.id] || 0} className="h-2" />
              </div>
            )}

            <p className="text-muted-foreground">{selectedCourse?.description}</p>
            
            <Button 
              className="w-full" 
              variant="hero" 
              onClick={() => selectedCourse && handleWatchLesson(selectedCourse.id)}
            >
              <Play className="w-4 h-4" />
              مشاهدة الدرس التالي
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
