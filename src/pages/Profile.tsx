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
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Code2,
  Target,
  Flame,
  Trophy,
  Heart,
  MessageCircle,
  Eye,
  Zap,
  Medal,
  Crown,
  Rocket
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { BadgeDisplay } from "@/components/badges/BadgeSystem";
import { motion } from "framer-motion";

const tabs = ["نظرة عامة", "الشارات", "المشاريع", "الأسئلة", "الدورات", "الفواتير"];

const projects = [
  {
    id: 1,
    title: "تطبيق ويب لإدارة المهام",
    client: "شركة التقنية",
    budget: "$800",
    status: "مكتمل",
    date: "يناير 2024",
    rating: 5,
    tech: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "تصميم واجهة متجر إلكتروني",
    client: "متجر الأزياء",
    budget: "$450",
    status: "مكتمل",
    date: "ديسمبر 2023",
    rating: 5,
    tech: ["Figma", "React", "Tailwind"]
  },
  {
    id: 3,
    title: "بناء API للتطبيق",
    client: "ستارت أب ديجيتال",
    budget: "$600",
    status: "قيد التنفيذ",
    date: "جاري",
    rating: null,
    tech: ["Node.js", "Express", "PostgreSQL"]
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

const activityData = [
  { day: "سبت", value: 4 },
  { day: "أحد", value: 8 },
  { day: "اثنين", value: 6 },
  { day: "ثلاثاء", value: 12 },
  { day: "أربعاء", value: 3 },
  { day: "خميس", value: 9 },
  { day: "جمعة", value: 7 },
];

const achievements = [
  { icon: Trophy, title: "أفضل مساهم", desc: "تصدر قائمة المساهمين لمدة أسبوع", color: "text-warning" },
  { icon: Flame, title: "سلسلة 30 يوم", desc: "نشاط متواصل لمدة 30 يوم", color: "text-destructive" },
  { icon: Heart, title: "محبوب المجتمع", desc: "حصل على 100+ إعجاب", color: "text-pink-500" },
  { icon: Rocket, title: "صاروخ", desc: "أكمل 10 مشاريع", color: "text-primary" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("نظرة عامة");
  const { profile, user } = useAuth();

  const userData = {
    name: profile?.full_name ?? "أحمد محمد",
    username: user?.email ? `@${user.email.split("@")[0]}` : "@ahmed_dev",
    bio: profile?.bio ?? "مطور Full Stack شغوف | React & Node.js | أحب بناء منتجات تقنية تحل مشاكل حقيقية",
    location: "غزة، فلسطين 🇵🇸",
    website: "wekicode.dev",
    joinDate: user?.created_at ? new Date(user.created_at).toLocaleDateString("ar-EG", { month: "long", year: "numeric" }) : "يناير 2023",
    points: profile?.points ?? 2450,
    level: profile?.level ?? 5,
    rank: getLevelRank(profile?.level ?? 5),
    badges: profile?.badges ?? ["first_question", "first_answer", "streak_7_days"],
    skills: profile?.skills ?? ["React", "Node.js", "TypeScript", "MongoDB", "Python", "Docker"],
    stats: {
      projects: 12,
      answers: 45,
      courses: 8,
      rating: 4.9
    },
    social: {
      github: "ahmed_dev",
      linkedin: "ahmed-mohammed",
      twitter: "ahmed_codes"
    },
    streak: 14,
    ranking: 23
  };

  function getLevelRank(level: number): string {
    if (level >= 10) return "أسطورة البرمجة";
    if (level >= 7) return "مبرمج محترف";
    if (level >= 5) return "مبرمج متميز";
    if (level >= 3) return "مبرمج متقدم";
    return "مبرمج مبتدئ";
  }

  function getLevelIcon(level: number) {
    if (level >= 10) return Crown;
    if (level >= 7) return Trophy;
    if (level >= 5) return Medal;
    if (level >= 3) return Star;
    return Zap;
  }

  const LevelIcon = getLevelIcon(userData.level);
  const pointsToNextLevel = userData.level * 200;
  const currentLevelPoints = (userData.level - 1) * 200;
  const progressInLevel = userData.points - currentLevelPoints;
  const progressPercentage = Math.min((progressInLevel / 200) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Profile Header - Enhanced */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden mb-8"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="relative glass border-border/30 p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Section - Avatar & Quick Stats */}
                <div className="flex flex-col items-center lg:items-start gap-6">
                  {/* Avatar with Level Badge */}
                  <div className="relative group">
                    <div className="w-36 h-36 rounded-3xl bg-gradient-primary p-1 shadow-glow">
                      <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center">
                        <img 
                          src="https://randomuser.me/api/portraits/men/32.jpg" 
                          alt={userData.name}
                          className="w-full h-full rounded-3xl object-cover"
                        />
                      </div>
                    </div>
                    {/* Level Badge */}
                    <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-accent">
                      <div className="text-center">
                        <LevelIcon className="w-5 h-5 text-accent-foreground mx-auto" />
                        <span className="text-xs font-bold text-accent-foreground">Lv.{userData.level}</span>
                      </div>
                    </div>
                    {/* Online Status */}
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-success border-2 border-card animate-pulse" />
                  </div>

                  {/* Streak Card */}
                  <div className="glass rounded-2xl p-4 border-accent/30 w-full max-w-[200px]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <Flame className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-foreground">{userData.streak}</div>
                        <div className="text-xs text-muted-foreground">يوم متتالي</div>
                      </div>
                    </div>
                  </div>

                  {/* Ranking */}
                  <div className="glass rounded-2xl p-4 border-primary/30 w-full max-w-[200px]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-foreground">#{userData.ranking}</div>
                        <div className="text-xs text-muted-foreground">الترتيب العام</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Info */}
                <div className="flex-1">
                  {/* Name & Rank */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-3xl md:text-4xl font-black text-foreground">{userData.name}</h1>
                    <span className="px-4 py-1.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold">
                      {userData.rank}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-2">{userData.username}</p>
                  <p className="text-foreground/80 mb-6 max-w-xl text-lg">{userData.bio}</p>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2 hover:text-primary transition-colors">
                      <MapPin className="w-4 h-4" />
                      <span>{userData.location}</span>
                    </div>
                    <a href={`https://${userData.website}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Globe className="w-4 h-4" />
                      <span>{userData.website}</span>
                    </a>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>انضم في {userData.joinDate}</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3 mb-6">
                    <a href={`https://github.com/${userData.social.github}`} 
                       className="w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
                      <Github className="w-5 h-5 text-foreground" />
                    </a>
                    <a href={`https://linkedin.com/in/${userData.social.linkedin}`}
                       className="w-10 h-10 rounded-xl bg-secondary hover:bg-blue-600/20 flex items-center justify-center transition-colors">
                      <Linkedin className="w-5 h-5 text-foreground" />
                    </a>
                    <a href={`https://twitter.com/${userData.social.twitter}`}
                       className="w-10 h-10 rounded-xl bg-secondary hover:bg-sky-500/20 flex items-center justify-center transition-colors">
                      <Twitter className="w-5 h-5 text-foreground" />
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="hero" className="shadow-glow">
                      <Edit className="w-4 h-4" />
                      تعديل الملف الشخصي
                    </Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4" />
                      الإعدادات
                    </Button>
                  </div>
                </div>

                {/* Right Section - Points & Progress */}
                <div className="lg:w-72 space-y-4">
                  {/* Points Card */}
                  <div className="glass rounded-2xl p-6 border-accent/30">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-accent">
                        <Coins className="w-8 h-8 text-accent-foreground" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-gradient-accent">{userData.points.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">نقطة مكتسبة</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">المستوى {userData.level}</span>
                        <span className="text-primary font-medium">المستوى {userData.level + 1}</span>
                      </div>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-accent rounded-full" 
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-center">
                        {pointsToNextLevel - userData.points} نقطة للمستوى التالي
                      </div>
                    </div>
                  </div>

                  {/* Weekly Activity Mini Chart */}
                  <div className="glass rounded-2xl p-4 border-border/50">
                    <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      نشاط الأسبوع
                    </h4>
                    <div className="flex items-end justify-between gap-1 h-16">
                      {activityData.map((day, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.value / 12) * 100}%` }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="w-full bg-gradient-primary rounded-t-sm min-h-[4px]"
                          />
                          <span className="text-[10px] text-muted-foreground">{day.day.slice(0, 1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-5 border-primary/20 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-foreground">{userData.stats.projects}</div>
                      <div className="text-sm text-muted-foreground">مشروع مكتمل</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-5 border-accent/20 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-foreground">{userData.stats.answers}</div>
                      <div className="text-sm text-muted-foreground">إجابة مفيدة</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-5 border-success/20 hover:border-success/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-foreground">{userData.stats.courses}</div>
                      <div className="text-sm text-muted-foreground">دورة مكتملة</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-5 border-warning/20 hover:border-warning/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                      <Star className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-foreground">{userData.stats.rating}</div>
                      <div className="text-sm text-muted-foreground">تقييم عام</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 border-border/50"
          >
            {activeTab === "نظرة عامة" && (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Achievements */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-warning" />
                    الإنجازات الأخيرة
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {achievements.map((ach, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center">
                          <ach.icon className={`w-6 h-6 ${ach.color}`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{ach.title}</h4>
                          <p className="text-sm text-muted-foreground">{ach.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" />
                    المهارات
                  </h3>
                  <div className="space-y-3">
                    {userData.skills.map((skill, i) => (
                      <motion.div 
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                      >
                        <span className="font-medium text-foreground">{skill}</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star 
                              key={j} 
                              className={`w-3 h-3 ${j < 4 ? "text-warning fill-warning" : "text-muted-foreground"}`} 
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    النشاط الأخير
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <span className="text-foreground font-medium">أكملت مشروع</span>
                      </div>
                      <p className="text-muted-foreground text-sm">تطبيق إدارة المهام</p>
                      <p className="text-xs text-muted-foreground mt-2">منذ يومين</p>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <span className="text-foreground font-medium">أجبت على سؤال</span>
                      </div>
                      <p className="text-muted-foreground text-sm">React Hooks Best Practices</p>
                      <p className="text-xs text-muted-foreground mt-2">منذ 3 أيام</p>
                    </div>
                    <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <Coins className="w-5 h-5 text-accent" />
                        <span className="text-foreground font-medium">حصلت على نقاط</span>
                      </div>
                      <p className="text-muted-foreground text-sm">+80 نقطة من الإجابات</p>
                      <p className="text-xs text-muted-foreground mt-2">منذ أسبوع</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "الشارات" && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  شاراتي وإنجازاتي
                </h3>
                <BadgeDisplay badges={userData.badges as string[]} showAll />
              </div>
            )}

            {activeTab === "المشاريع" && (
              <div className="space-y-4">
                {projects.map((project, i) => (
                  <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-lg text-foreground">{project.title}</h4>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                        project.status === "مكتمل" 
                          ? "bg-success/10 text-success" 
                          : "bg-warning/10 text-warning"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map(t => (
                        <span key={t} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="text-success font-bold">{project.budget}</span>
                      <span className="text-muted-foreground">{project.date}</span>
                      {project.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(project.rating)].map((_, j) => (
                            <Star key={j} className="w-4 h-4 text-warning fill-warning" />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "الأسئلة" && (
              <div className="space-y-4">
                {questions.map((q, i) => (
                  <motion.div 
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {q.solved && (
                        <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                          <CheckCircle className="w-5 h-5 text-success" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-foreground mb-2">{q.title}</h4>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {q.answers} إجابة
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {q.votes} صوت
                          </span>
                          <span>{q.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "الدورات" && (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">لم تشارك أي دورات بعد</h4>
                <p className="text-muted-foreground mb-6">شارك معرفتك مع المجتمع وأنشئ دورتك الأولى</p>
                <Button variant="hero" className="shadow-glow">
                  <BookOpen className="w-4 h-4" />
                  شارك دورة جديدة
                </Button>
              </div>
            )}

            {activeTab === "الفواتير" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    فواتير الوورك سبيس
                  </h3>
                </div>
                {invoices.map((invoice, i) => (
                  <motion.div 
                    key={invoice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm text-muted-foreground">{invoice.id}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            invoice.status === "مدفوع" 
                              ? "bg-success/10 text-success" 
                              : "bg-warning/10 text-warning"
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                        <p className="font-medium text-foreground">{invoice.description}</p>
                        <p className="text-sm text-muted-foreground mt-1">{invoice.date}</p>
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-black text-foreground">{invoice.amount}</div>
                        <Button variant="ghost" size="sm" className="mt-2">
                          <ExternalLink className="w-4 h-4" />
                          عرض
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
