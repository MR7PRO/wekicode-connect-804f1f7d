import { Button } from "@/components/ui/button";
import { Wifi, Zap, Clock, Users, Coffee, Monitor, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const amenities = [
  { icon: Wifi, label: "إنترنت فائق السرعة", desc: "100 Mbps" },
  { icon: Zap, label: "كهرباء 24/7", desc: "مولدات احتياطية" },
  { icon: Clock, label: "متاح طوال الأسبوع", desc: "8 ص - 10 م" },
  { icon: Users, label: "مجتمع داعم", desc: "50+ مبرمج" },
  { icon: Coffee, label: "مشروبات مجانية", desc: "قهوة وشاي" },
  { icon: Monitor, label: "أجهزة حديثة", desc: "شاشات وطاولات" },
];

export function WorkspaceSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(187_85%_53%/0.08),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-video rounded-3xl overflow-hidden glass border-primary/20 shadow-glow">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-card to-accent/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏢</div>
                  <h3 className="text-2xl font-bold text-foreground">wekicode Workspace</h3>
                  <p className="text-muted-foreground">غزة، فلسطين 🇵🇸</p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 border-success/30 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-success flex items-center justify-center">
                  <Zap className="w-6 h-6 text-success-foreground" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">كهرباء متوفرة</div>
                  <div className="text-sm text-success">24/7 بدون انقطاع</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <span className="text-lg">🇵🇸</span>
              <span className="text-sm font-medium text-primary">وورك سبيس غزة</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-foreground">مساحة عمل</span>
              <br />
              <span className="text-gradient-primary">مجهزة لإنتاجيتك</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              في ظل الظروف الصعبة، نوفر لك بيئة عمل متكاملة مع كهرباء وإنترنت سريع. 
              انضم لمجتمع المبرمجين واعمل في مساحة تحفز الإبداع والإنتاجية.
            </p>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {amenities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <Link to="/rewards">
              <Button variant="hero" size="lg">
                احجز مكانك الآن
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
