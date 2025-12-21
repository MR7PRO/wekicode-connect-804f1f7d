import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Coins, 
  Star, 
  Award,
  Briefcase,
  BookOpen,
  HelpCircle,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Edit,
  Settings,
  TrendingUp,
  CheckCircle,
  Clock,
  FileText,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

const tabs = ["نظرة عامة", "المشاريع", "الأسئلة", "الدورات", "الفواتير"];

const projects = [
  {
    id: 1,
    title: "تطبيق ويب لإدارة المهام",
    client: "شركة التقنية",
    budget: "$800",
    status: "مكتمل",
    date: "يناير 2024",
    rating: 5
  },
  {
    id: 2,
    title: "تصميم واجهة متجر إلكتروني",
    client: "متجر الأزياء",
    budget: "$450",
    status: "مكتمل",
    date: "ديسمبر 2023",
    rating: 5
  },
  {
    id: 3,
    title: "بناء API للتطبيق",
    client: "ستارت أب ديجيتال",
    budget: "$600",
    status: "قيد التنفيذ",
    date: "جاري",
    rating: null
  },
];

const questions = [
  {
    id: 1,
    title: "كيف أقوم بتحسين أداء تطبيق React؟",
    answers: 8,
    votes: 24,
    solved: true,
    date: "منذ أسبوع"
  },
  {
    id: 2,
    title: "شرح مفهوم async/await",
    answers: 12,
    votes: 45,
    solved: true,
    date: "منذ شهر"
  },
];

const invoices = [
  {
    id: "INV-001",
    description: "اشتراك شهري - يناير 2024",
    amount: "$50",
    status: "مدفوع",
    date: "2024-01-01"
  },
  {
    id: "INV-002",
    description: "اشتراك شهري - فبراير 2024",
    amount: "$50",
    status: "معلق",
    date: "2024-02-01"
  },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("نظرة عامة");

  const user = {
    name: "أحمد محمد",
    username: "@ahmed_dev",
    bio: "مطور Full Stack | React & Node.js | شغوف بتطوير حلول تقنية مبتكرة",
    location: "غزة، فلسطين 🇵🇸",
    website: "ahmed.dev",
    joinDate: "يناير 2023",
    points: 1250,
    level: 5,
    rank: "مبرمج متميز",
    stats: {
      projects: 12,
      answers: 45,
      courses: 8,
      rating: 4.9
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="glass rounded-3xl p-8 border-border/50 mb-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            
            <div className="relative flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-gradient-primary flex items-center justify-center text-5xl font-bold text-primary-foreground shadow-glow">
                  أ
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center shadow-lg">
                  <Award className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{user.name}</h1>
                  <span className="text-muted-foreground">{user.username}</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit">
                    {user.rank}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-4 max-w-xl">{user.bio}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="w-4 h-4" />
                    <span>{user.website}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>انضم في {user.joinDate}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="hero" size="sm">
                    <Edit className="w-4 h-4" />
                    تعديل الملف
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                    الإعدادات
                  </Button>
                </div>
              </div>

              {/* Points Card */}
              <div className="glass rounded-2xl p-5 border-accent/30 min-w-[180px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                    <Coins className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gradient-accent">{user.points}</div>
                    <div className="text-xs text-muted-foreground">نقطة</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mb-2">المستوى {user.level}</div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-accent rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative">
              <div className="glass rounded-xl p-4 border-border/50 text-center">
                <Briefcase className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{user.stats.projects}</div>
                <div className="text-sm text-muted-foreground">مشروع</div>
              </div>
              <div className="glass rounded-xl p-4 border-border/50 text-center">
                <HelpCircle className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{user.stats.answers}</div>
                <div className="text-sm text-muted-foreground">إجابة</div>
              </div>
              <div className="glass rounded-xl p-4 border-border/50 text-center">
                <BookOpen className="w-6 h-6 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{user.stats.courses}</div>
                <div className="text-sm text-muted-foreground">دورة</div>
              </div>
              <div className="glass rounded-xl p-4 border-border/50 text-center">
                <Star className="w-6 h-6 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{user.stats.rating}</div>
                <div className="text-sm text-muted-foreground">تقييم</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass rounded-2xl p-6 border-border/50">
            {activeTab === "نظرة عامة" && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    النشاط الأخير
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-foreground">أكملت مشروع "تطبيق إدارة المهام"</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">منذ يومين</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-2 text-sm">
                        <HelpCircle className="w-4 h-4 text-primary" />
                        <span className="text-foreground">أجبت على 3 أسئلة</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">منذ 3 أيام</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-2 text-sm">
                        <Coins className="w-4 h-4 text-accent" />
                        <span className="text-foreground">حصلت على +80 نقطة</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">منذ أسبوع</div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    المهارات
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "TypeScript", "MongoDB", "Python", "Git", "Docker", "AWS"].map((skill) => (
                      <span key={skill} className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "المشاريع" && (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-foreground">{project.title}</h4>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "مكتمل" 
                          ? "bg-success/10 text-success" 
                          : "bg-warning/10 text-warning"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="text-success font-medium">{project.budget}</span>
                      <span className="text-muted-foreground">{project.date}</span>
                      {project.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          <span>{project.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "الأسئلة" && (
              <div className="space-y-4">
                {questions.map((q) => (
                  <div key={q.id} className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors">
                    <div className="flex items-start gap-3">
                      {q.solved && <CheckCircle className="w-5 h-5 text-success mt-1" />}
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground">{q.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{q.answers} إجابة</span>
                          <span>{q.votes} صوت</span>
                          <span>{q.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "الدورات" && (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">لم تشارك أي دورات بعد</p>
                <Button variant="hero" size="sm" className="mt-4">
                  شارك دورة جديدة
                </Button>
              </div>
            )}

            {activeTab === "الفواتير" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    فواتير الوورك سبيس
                  </h3>
                </div>
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-muted-foreground">{invoice.id}</span>
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            invoice.status === "مدفوع" 
                              ? "bg-success/10 text-success" 
                              : "bg-warning/10 text-warning"
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                        <p className="font-medium text-foreground mt-1">{invoice.description}</p>
                        <p className="text-sm text-muted-foreground">{invoice.date}</p>
                      </div>
                      <div className="text-left">
                        <div className="text-xl font-bold text-foreground">{invoice.amount}</div>
                        <Button variant="ghost" size="sm" className="mt-1">
                          <ExternalLink className="w-4 h-4" />
                          عرض
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
