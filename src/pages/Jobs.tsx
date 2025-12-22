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
  Bookmark,
  BookmarkCheck,
  Plus,
  Send,
  X
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const jobTypes = ["الكل", "عمل عن بُعد", "عقد", "مشروع واحد", "دوام جزئي"];

const initialJobs = [
  {
    id: 1,
    title: "تطوير تطبيق ويب متكامل باستخدام React و Node.js",
    company: "شركة التقنية الحديثة",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
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
    companyLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop",
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
    companyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
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
    companyLogo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
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
    companyLogo: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=100&h=100&fit=crop",
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
  {
    id: 6,
    title: "تطوير تطبيق Flutter للأندرويد والآيفون",
    company: "شركة التطبيقات الذكية",
    companyLogo: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=100&h=100&fit=crop",
    budget: "$800 - $1,500",
    type: "مشروع واحد",
    duration: "شهر - شهرين",
    location: "عن بُعد",
    posted: "منذ 4 ساعات",
    proposals: 10,
    skills: ["Flutter", "Dart", "Firebase", "REST API"],
    description: "نبحث عن مطور Flutter لبناء تطبيق حجز مواعيد طبية...",
    verified: true,
    featured: true
  },
  {
    id: 7,
    title: "إعداد خوادم وبنية تحتية AWS",
    company: "شركة الحوسبة السحابية",
    companyLogo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop",
    budget: "$400 - $700",
    type: "عقد",
    duration: "أسبوعين",
    location: "عن بُعد",
    posted: "منذ 5 ساعات",
    proposals: 4,
    skills: ["AWS", "Docker", "Kubernetes", "Linux"],
    description: "مطلوب DevOps Engineer لإعداد بيئة الإنتاج على AWS...",
    verified: true,
    featured: false
  },
  {
    id: 8,
    title: "تطوير لعبة ويب تعليمية للأطفال",
    company: "مؤسسة التعليم الرقمي",
    companyLogo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop",
    budget: "$600 - $1,200",
    type: "مشروع واحد",
    duration: "شهر واحد",
    location: "عن بُعد",
    posted: "منذ يوم",
    proposals: 6,
    skills: ["JavaScript", "Canvas", "Game Development", "Animation"],
    description: "نريد تطوير لعبة تعليمية تفاعلية للأطفال من سن 6-12...",
    verified: false,
    featured: false
  },
];

export default function Jobs() {
  const [selectedType, setSelectedType] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState(initialJobs);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof initialJobs[0] | null>(null);
  
  // New job form
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    budget: "",
    duration: "",
    skills: "",
    type: "مشروع واحد"
  });

  // Apply form
  const [applyForm, setApplyForm] = useState({
    coverLetter: "",
    portfolio: "",
    expectedBudget: ""
  });

  const filteredJobs = jobs.filter(j => {
    const matchesType = selectedType === "الكل" || j.type === selectedType;
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handlePostJob = () => {
    if (!newJob.title || !newJob.description || !newJob.budget) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const job = {
      id: jobs.length + 1,
      title: newJob.title,
      company: "شركتك",
      companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      budget: newJob.budget,
      type: newJob.type,
      duration: newJob.duration || "غير محدد",
      location: "عن بُعد",
      posted: "الآن",
      proposals: 0,
      skills: newJob.skills.split(",").map(s => s.trim()).filter(Boolean),
      description: newJob.description,
      verified: false,
      featured: false
    };

    setJobs([job, ...jobs]);
    setNewJob({ title: "", description: "", budget: "", duration: "", skills: "", type: "مشروع واحد" });
    setIsPostDialogOpen(false);
    
    toast({
      title: "تم نشر المشروع! 🎉",
      description: "سيظهر مشروعك للمستقلين الآن",
    });
  };

  const handleApply = () => {
    if (!applyForm.coverLetter) {
      toast({
        title: "خطأ",
        description: "يرجى كتابة رسالة التقديم",
        variant: "destructive"
      });
      return;
    }

    if (selectedJob) {
      setAppliedJobs([...appliedJobs, selectedJob.id]);
      setJobs(jobs.map(j => 
        j.id === selectedJob.id ? { ...j, proposals: j.proposals + 1 } : j
      ));
    }
    
    setApplyForm({ coverLetter: "", portfolio: "", expectedBudget: "" });
    setIsApplyDialogOpen(false);
    setSelectedJob(null);
    
    toast({
      title: "تم إرسال طلبك! 🎉",
      description: "ستحصل على إشعار عند قبول طلبك (+5 نقاط)",
    });
  };

  const toggleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast({ title: "تم إزالة المشروع من المحفوظات" });
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast({ title: "تم حفظ المشروع ⭐" });
    }
  };

  const openApplyDialog = (job: typeof initialJobs[0]) => {
    setSelectedJob(job);
    setIsApplyDialogOpen(true);
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
                <span className="text-foreground">فرص</span>
                {" "}
                <span className="text-gradient-primary">العمل الحر</span>
              </h1>
              <p className="text-muted-foreground">
                تصفح المشاريع وقدم على العمل الذي يناسب مهاراتك
              </p>
            </div>
            
            <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="accent" size="lg">
                  <Briefcase className="w-5 h-5" />
                  انشر مشروعاً
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">انشر مشروعك</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">عنوان المشروع *</label>
                    <Input
                      placeholder="مثال: تطوير تطبيق ويب باستخدام React"
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">وصف المشروع *</label>
                    <Textarea
                      placeholder="اشرح تفاصيل المشروع والمتطلبات..."
                      rows={4}
                      value={newJob.description}
                      onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">الميزانية *</label>
                      <Input
                        placeholder="$100 - $500"
                        value={newJob.budget}
                        onChange={(e) => setNewJob({...newJob, budget: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">المدة المتوقعة</label>
                      <Input
                        placeholder="أسبوع - شهر"
                        value={newJob.duration}
                        onChange={(e) => setNewJob({...newJob, duration: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">نوع العمل</label>
                      <select
                        className="w-full h-10 rounded-lg bg-secondary border border-border px-3"
                        value={newJob.type}
                        onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                      >
                        {jobTypes.filter(t => t !== "الكل").map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">المهارات المطلوبة</label>
                      <Input
                        placeholder="React, Node.js..."
                        value={newJob.skills}
                        onChange={(e) => setNewJob({...newJob, skills: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button className="w-full" variant="hero" onClick={handlePostJob}>
                    <Send className="w-4 h-4" />
                    نشر المشروع
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-xl p-4 border-border/50">
              <Briefcase className="w-6 h-6 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">{jobs.length}</div>
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
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`glass rounded-2xl p-6 border-border/50 hover:border-primary/30 hover-lift transition-all ${
                  job.featured ? "border-accent/30 bg-accent/5" : ""
                } ${appliedJobs.includes(job.id) ? "border-success/30 bg-success/5" : ""}`}
              >
                <div className="flex items-start gap-2 mb-3">
                  {job.featured && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="text-xs font-medium text-accent">مميز</span>
                    </div>
                  )}
                  {appliedJobs.includes(job.id) && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-xs font-medium text-success">تم التقديم</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  {/* Company Logo */}
                  <div className="hidden md:block w-14 h-14 rounded-xl overflow-hidden">
                    <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <button 
                        onClick={() => toggleSaveJob(job.id)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        {savedJobs.includes(job.id) ? (
                          <BookmarkCheck className="w-5 h-5 text-primary" />
                        ) : (
                          <Bookmark className="w-5 h-5 text-muted-foreground hover:text-primary" />
                        )}
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

                      {appliedJobs.includes(job.id) ? (
                        <Button variant="secondary" size="sm" disabled>
                          <CheckCircle className="w-4 h-4" />
                          تم التقديم
                        </Button>
                      ) : (
                        <Button variant="hero" size="sm" onClick={() => openApplyDialog(job)}>
                          قدم الآن
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">لا توجد فرص</h3>
              <p className="text-muted-foreground mb-4">لم نجد أي فرص تطابق بحثك</p>
              <Button variant="hero" onClick={() => setIsPostDialogOpen(true)}>
                <Plus className="w-4 h-4" />
                انشر مشروعك الأول
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredJobs.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                عرض المزيد من الفرص
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Apply Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">التقديم على المشروع</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 rounded-xl bg-secondary/50">
              <h3 className="font-bold text-foreground mb-1">{selectedJob?.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedJob?.company}</p>
              <p className="text-sm text-success font-medium mt-2">{selectedJob?.budget}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">رسالة التقديم *</label>
              <Textarea
                placeholder="اشرح لماذا أنت مناسب لهذا المشروع..."
                rows={5}
                value={applyForm.coverLetter}
                onChange={(e) => setApplyForm({...applyForm, coverLetter: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">رابط معرض أعمالك</label>
                <Input
                  placeholder="https://..."
                  value={applyForm.portfolio}
                  onChange={(e) => setApplyForm({...applyForm, portfolio: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">العرض المالي</label>
                <Input
                  placeholder="$500"
                  value={applyForm.expectedBudget}
                  onChange={(e) => setApplyForm({...applyForm, expectedBudget: e.target.value})}
                />
              </div>
            </div>
            
            <Button className="w-full" variant="hero" onClick={handleApply}>
              <Send className="w-4 h-4" />
              إرسال الطلب
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
