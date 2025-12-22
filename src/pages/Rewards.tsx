import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Gift, 
  Coins, 
  Zap, 
  Wifi,
  CreditCard,
  Coffee,
  Monitor,
  Star,
  Clock,
  CheckCircle,
  ShoppingBag,
  Smartphone,
  Headphones,
  Ticket,
  PartyPopper,
  Loader2
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["الكل", "اشتراكات", "قسائم مالية", "خدمات", "هدايا", "أجهزة"];

const initialRewards = [
  {
    id: 1,
    title: "اشتراك شهري في الوورك سبيس",
    description: "شهر كامل من العمل في مساحة مجهزة بالكهرباء والإنترنت السريع",
    points: 500,
    category: "اشتراكات",
    icon: Zap,
    color: "primary",
    stock: 10,
    popular: true
  },
  {
    id: 2,
    title: "قسيمة مالية $25",
    description: "قسيمة قابلة للصرف أو التحويل إلى حسابك البنكي",
    points: 250,
    category: "قسائم مالية",
    icon: CreditCard,
    color: "success",
    stock: 20,
    popular: true
  },
  {
    id: 3,
    title: "قسيمة مالية $50",
    description: "قسيمة قابلة للصرف أو التحويل إلى حسابك البنكي",
    points: 480,
    category: "قسائم مالية",
    icon: CreditCard,
    color: "success",
    stock: 15,
    popular: false
  },
  {
    id: 4,
    title: "يوم عمل في الوورك سبيس",
    description: "يوم كامل من العمل مع كهرباء وإنترنت ومشروبات",
    points: 30,
    category: "اشتراكات",
    icon: Coffee,
    color: "accent",
    stock: 50,
    popular: false
  },
  {
    id: 5,
    title: "أسبوع في الوورك سبيس",
    description: "أسبوع كامل من العمل في بيئة مثالية للإنتاجية",
    points: 150,
    category: "اشتراكات",
    icon: Monitor,
    color: "primary",
    stock: 25,
    popular: true
  },
  {
    id: 6,
    title: "اشتراك إنترنت إضافي",
    description: "باقة إنترنت إضافية 10GB لجهازك الشخصي",
    points: 80,
    category: "خدمات",
    icon: Wifi,
    color: "warning",
    stock: 30,
    popular: false
  },
  {
    id: 7,
    title: "دورة مدفوعة مجانية",
    description: "اختر أي دورة مدفوعة من المنصة واحصل عليها مجاناً",
    points: 200,
    category: "خدمات",
    icon: Star,
    color: "accent",
    stock: 15,
    popular: true
  },
  {
    id: 8,
    title: "كوب قهوة مجاني",
    description: "كوب قهوة أو مشروب من اختيارك في الوورك سبيس",
    points: 10,
    category: "هدايا",
    icon: Coffee,
    color: "warning",
    stock: 100,
    popular: false
  },
  {
    id: 9,
    title: "سماعات بلوتوث",
    description: "سماعات لاسلكية عالية الجودة للعمل والترفيه",
    points: 800,
    category: "أجهزة",
    icon: Headphones,
    color: "primary",
    stock: 5,
    popular: true
  },
  {
    id: 10,
    title: "شاحن متنقل 20000mAh",
    description: "باور بانك سريع الشحن لأجهزتك المحمولة",
    points: 350,
    category: "أجهزة",
    icon: Smartphone,
    color: "success",
    stock: 12,
    popular: false
  },
  {
    id: 11,
    title: "تذكرة حضور فعالية تقنية",
    description: "تذكرة مجانية لحضور أي فعالية تقنية قادمة",
    points: 300,
    category: "هدايا",
    icon: Ticket,
    color: "accent",
    stock: 20,
    popular: true
  },
  {
    id: 12,
    title: "قسيمة مالية $100",
    description: "قسيمة قابلة للصرف أو التحويل إلى حسابك البنكي",
    points: 900,
    category: "قسائم مالية",
    icon: CreditCard,
    color: "success",
    stock: 8,
    popular: true
  },
];

const initialRedemptions = [
  {
    id: 1,
    title: "يوم عمل في الوورك سبيس",
    points: 30,
    date: "2024-01-15",
    status: "مستخدم",
    code: "WK-2024-001"
  },
  {
    id: 2,
    title: "قسيمة مالية $25",
    points: 250,
    date: "2024-01-10",
    status: "مفعل",
    code: "VC-2024-025"
  },
];

export default function Rewards() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [userPoints, setUserPoints] = useState(1250);
  const [rewards, setRewards] = useState(initialRewards);
  const [myRedemptions, setMyRedemptions] = useState(initialRedemptions);
  const [selectedReward, setSelectedReward] = useState<typeof initialRewards[0] | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastRedeemed, setLastRedeemed] = useState<typeof initialRewards[0] | null>(null);

  const filteredRewards = rewards.filter(r => 
    selectedCategory === "الكل" || r.category === selectedCategory
  );

  const handleRedeem = async (reward: typeof initialRewards[0]) => {
    if (userPoints < reward.points) {
      toast({
        title: "نقاط غير كافية",
        description: `تحتاج ${reward.points - userPoints} نقطة إضافية`,
        variant: "destructive"
      });
      return;
    }

    if (reward.stock <= 0) {
      toast({
        title: "نفذت الكمية",
        description: "هذه المكافأة غير متوفرة حالياً",
        variant: "destructive"
      });
      return;
    }

    setSelectedReward(reward);
    setIsRedeeming(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Deduct points
    setUserPoints(prev => prev - reward.points);
    
    // Decrease stock
    setRewards(rewards.map(r => 
      r.id === reward.id ? { ...r, stock: r.stock - 1 } : r
    ));

    // Add to redemptions
    const newRedemption = {
      id: myRedemptions.length + 1,
      title: reward.title,
      points: reward.points,
      date: new Date().toISOString().split('T')[0],
      status: "مفعل",
      code: `RD-${Date.now().toString().slice(-6)}`
    };
    setMyRedemptions([newRedemption, ...myRedemptions]);

    setIsRedeeming(false);
    setLastRedeemed(reward);
    setShowSuccess(true);
  };

  const closeSuccessDialog = () => {
    setShowSuccess(false);
    setSelectedReward(null);
    setLastRedeemed(null);
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
                <span className="text-foreground">المكافآت</span>
                {" "}
                <span className="text-gradient-accent">والجوائز</span>
              </h1>
              <p className="text-muted-foreground">
                استبدل نقاطك بمكافآت حقيقية واشتراكات وقسائم مالية
              </p>
            </div>
            
            {/* User Points Card */}
            <div className="glass rounded-2xl p-6 border-accent/30 shadow-accent min-w-[200px]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center">
                  <Coins className="w-8 h-8 text-accent-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">رصيدك الحالي</div>
                  <div className="text-3xl font-black text-gradient-accent">{userPoints.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">نقطة</div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Earn */}
          <div className="glass rounded-2xl p-6 border-border/50 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Gift className="w-6 h-6 text-primary" />
              كيف تكسب النقاط؟
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <div className="text-2xl font-bold text-gradient-primary mb-1">+10</div>
                <div className="text-sm text-muted-foreground">لكل إجابة</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <div className="text-2xl font-bold text-gradient-accent mb-1">+50</div>
                <div className="text-sm text-muted-foreground">لكل مشروع</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <div className="text-2xl font-bold text-gradient-primary mb-1">+25</div>
                <div className="text-sm text-muted-foreground">لكل محتوى تعليمي</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 text-center">
                <div className="text-2xl font-bold text-gradient-accent mb-1">+15</div>
                <div className="text-sm text-muted-foreground">لكل تقييم 5 نجوم</div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-accent text-accent-foreground shadow-accent"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredRewards.map((reward) => {
              const Icon = reward.icon;
              const canRedeem = userPoints >= reward.points && reward.stock > 0;
              const colorClass = reward.color === "primary" 
                ? "from-primary/20 to-primary/5 border-primary/30" 
                : reward.color === "success"
                ? "from-success/20 to-success/5 border-success/30"
                : reward.color === "accent"
                ? "from-accent/20 to-accent/5 border-accent/30"
                : "from-warning/20 to-warning/5 border-warning/30";

              return (
                <motion.div
                  key={reward.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`glass rounded-2xl p-5 border hover-lift transition-all relative overflow-hidden bg-gradient-to-b ${colorClass} ${
                    reward.stock === 0 ? "opacity-60" : ""
                  }`}
                >
                  {reward.popular && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-md bg-accent text-accent-foreground text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        شائع
                      </span>
                    </div>
                  )}

                  {reward.stock === 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-md bg-destructive/10 text-destructive text-xs font-bold">
                        نفذت
                      </span>
                    </div>
                  )}

                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    reward.color === "primary" ? "bg-primary/20" :
                    reward.color === "success" ? "bg-success/20" :
                    reward.color === "accent" ? "bg-accent/20" : "bg-warning/20"
                  }`}>
                    <Icon className={`w-7 h-7 ${
                      reward.color === "primary" ? "text-primary" :
                      reward.color === "success" ? "text-success" :
                      reward.color === "accent" ? "text-accent" : "text-warning"
                    }`} />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {reward.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {reward.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-lg font-bold text-gradient-accent">
                      <Coins className="w-5 h-5 text-accent" />
                      <span>{reward.points}</span>
                    </div>
                    <span className={`text-xs ${reward.stock <= 5 ? "text-destructive" : "text-muted-foreground"}`}>
                      متبقي: {reward.stock}
                    </span>
                  </div>

                  <Button 
                    variant={canRedeem ? "hero" : "secondary"} 
                    size="sm" 
                    className="w-full"
                    disabled={!canRedeem || isRedeeming}
                    onClick={() => handleRedeem(reward)}
                  >
                    {isRedeeming && selectedReward?.id === reward.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        جاري الاستبدال...
                      </>
                    ) : canRedeem ? (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        استبدال
                      </>
                    ) : reward.stock === 0 ? (
                      "نفذت الكمية"
                    ) : (
                      <>
                        <Clock className="w-4 h-4" />
                        نقاط غير كافية
                      </>
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* My Redemptions */}
          <div className="glass rounded-2xl p-6 border-border/50">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-success" />
              سجل الاستبدالات ({myRedemptions.length})
            </h2>
            
            {myRedemptions.length > 0 ? (
              <div className="space-y-3">
                {myRedemptions.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div>
                      <div className="font-medium text-foreground">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.date}</div>
                      <div className="text-xs text-primary font-mono mt-1">كود: {item.code}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-accent font-bold flex items-center gap-1">
                        <Coins className="w-4 h-4" />
                        {item.points}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "مفعل" 
                          ? "bg-success/10 text-success" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                لم تقم بأي استبدالات بعد
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={closeSuccessDialog}>
        <DialogContent className="sm:max-w-[400px] text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mx-auto w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-4"
          >
            <PartyPopper className="w-10 h-10 text-success" />
          </motion.div>
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">تهانينا! 🎉</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-muted-foreground">
              تم استبدال {lastRedeemed?.title} بنجاح!
            </p>
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="text-sm text-muted-foreground mb-1">رصيدك المتبقي</div>
              <div className="text-3xl font-black text-gradient-accent">{userPoints.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">نقطة</div>
            </div>
            <p className="text-sm text-muted-foreground">
              ستجد تفاصيل المكافأة في سجل الاستبدالات
            </p>
            <Button className="w-full" variant="hero" onClick={closeSuccessDialog}>
              <CheckCircle className="w-4 h-4" />
              تم
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
