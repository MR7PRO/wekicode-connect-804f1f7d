import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  DollarSign, 
  Clock, 
  MapPin,
  Search,
  Filter,
  Star,
  Users,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Bookmark
} from "lucide-react";
import { useState } from "react";

const jobTypes = ["الكل", "عمل عن بُعد", "عقد", "مشروع واحد", "دوام جزئي"];

const jobs = [
  {
    id: 1,
    title: "تطوير تطبيق ويب متكامل باستخدام React و Node.js",
    company: "شركة التقنية الحديثة",
    companyAvatar: "ش",
    budget: "$500 - $1,000",
    type: "مشروع واحد",
    duration: "2-4 أسابيع",
    location: "عن بُعد",
    posted: "منذ ساعة",
    proposals: 8,
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    description: "نبحث عن مطور Full Stack لبناء تطبيق ويب لإدارة المهام مع واجهة مستخدم حديثة...",
    verified: true,
    featured: true
  },
  {
    id: 2,
    title: "تصميم واجهات مستخدم لتطبيق موبايل",
    company: "ستارت أب ديجيتال",
    companyAvatar: "س",
    budget: "$200 - $400",
    type: "مشروع واحد",
    duration: "أسبوع واحد",
    location: "عن بُعد",
    posted: "منذ 3 ساعات",
    proposals: 12,
    skills: ["Figma", "UI/UX", "Mobile Design"],
    description: "مطلوب مصمم UI/UX لتصميم 10 شاشات لتطبيق توصيل طعام...",
    verified: true,
    featured: false
  },
  {
    id: 3,
    title: "بناء API باستخدام Python و FastAPI",
    company: "مؤسسة البيانات",
    companyAvatar: "م",
    budget: "$300 - $600",
    type: "عقد",
    duration: "شهر واحد",
    location: "عن بُعد",
    posted: "منذ يوم",
    proposals: 5,
    skills: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    description: "نحتاج مطور Python لبناء RESTful API لنظام إدارة المخزون...",
    verified: false,
    featured: true
  },
  {
    id: 4,
    title: "تطوير متجر إلكتروني باستخدام Shopify",
    company: "متجر الأزياء",
    companyAvatar: "م",
    budget: "$400 - $800",
    type: "مشروع واحد",
    duration: "2-3 أسابيع",
    location: "عن بُعد",
    posted: "منذ يومين",
    proposals: 15,
    skills: ["Shopify", "Liquid", "E-commerce"],
    description: "إنشاء متجر إلكتروني متكامل مع بوابة دفع وربط مع شركات الشحن...",
    verified: true,
    featured: false
  },
  {
    id: 5,
    title: "كتابة محتوى تقني وتوثيق API",
    company: "شركة البرمجيات",
    companyAvatar: "ش",
    budget: "$150 - $300",
    type: "دوام جزئي",
    duration: "مستمر",
    location: "عن بُعد",
    posted: "منذ 3 أيام",
    proposals: 7,
    skills: ["Technical Writing", "API Documentation", "Markdown"],
    description: "مطلوب كاتب محتوى تقني لتوثيق APIs وكتابة أدلة المستخدم...",
    verified: true,
    featured: false
  },
];

export default function Jobs() {
  const [selectedType, setSelectedType] = useState("الكل");
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
                <span className="text-foreground">فرص</span>
                {" "}
                <span className="text-gradient-primary">العمل الحر</span>
              </h1>
              <p className="text-muted-foreground">
                تصفح المشاريع وقدم على العمل الذي يناسب مهاراتك
              </p>
            </div>
            <Button variant="accent" size="lg">
              <Briefcase className="w-5 h-5" />
              انشر مشروعاً
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4 border-border/50">
              <Briefcase className="w-6 h-6 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">فرصة متاحة</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <DollarSign className="w-6 h-6 text-success mb-2" />
              <div className="text-2xl font-bold text-foreground">$45K+</div>
              <div className="text-sm text-muted-foreground">إجمالي المدفوعات</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <Users className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl font-bold text-foreground">234</div>
              <div className="text-sm text-muted-foreground">فريلانسر نشط</div>
            </div>
            <div className="glass rounded-xl p-4 border-border/50">
              <CheckCircle className="w-6 h-6 text-warning mb-2" />
              <div className="text-2xl font-bold text-foreground">+50</div>
              <div className="text-sm text-muted-foreground">نقاط لكل مشروع</div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="ابحث عن مشروع أو مهارة..."
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

          {/* Job Types */}
          <div className="flex flex-wrap gap-2 mb-8">
            {jobTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedType === type
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`glass rounded-2xl p-6 border-border/50 hover:border-primary/30 hover-lift transition-all cursor-pointer ${
                  job.featured ? "border-accent/30 bg-accent/5" : ""
                }`}
              >
                {job.featured && (
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-xs font-medium text-accent">مميز</span>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4">
                  {/* Company Avatar */}
                  <div className="hidden md:flex w-14 h-14 rounded-xl bg-gradient-primary items-center justify-center text-xl font-bold text-primary-foreground">
                    {job.companyAvatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                        <Bookmark className="w-5 h-5 text-muted-foreground hover:text-primary" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                      <span className="flex items-center gap-1 text-foreground">
                        {job.company}
                        {job.verified && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="flex items-center gap-1 text-success font-medium">
                        <DollarSign className="w-4 h-4" />
                        {job.budget}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{job.posted}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{job.proposals} عرض</span>
                        </div>
                      </div>

                      <Button variant="hero" size="sm">
                        قدم الآن
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              عرض المزيد من الفرص
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
