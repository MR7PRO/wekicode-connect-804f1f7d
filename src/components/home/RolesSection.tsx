import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Laptop, Building2, Star, Check } from "lucide-react";

const roles = [
  {
    title: "للطلاب",
    icon: GraduationCap,
    description: "ابدأ مسيرتك المهنية واكسب خبرة عملية من خلال مشاريع حقيقية",
    features: [
      "مشاريع تدريبية مجانية",
      "مسارات تعلم مخصصة",
      "نقاط إضافية للطلاب",
      "شهادات معتمدة",
    ],
    cta: "انضم كطالب",
    popular: false,
  },
  {
    title: "للمستقلين",
    icon: Laptop,
    description: "اعثر على عملاء جدد وزد دخلك من خلال مشاريع متنوعة ومربحة",
    features: [
      "عمولة منخفضة 5% فقط",
      "مدفوعات آمنة ومضمونة",
      "تقييمات شفافة",
      "دعم على مدار الساعة",
    ],
    cta: "ابدأ العمل الحر",
    popular: true,
  },
  {
    title: "للشركات",
    icon: Building2,
    description: "اعثر على أفضل المواهب البرمجية واستقطب الخبرات المناسبة لمشاريعك",
    features: [
      "قاعدة مواهب متخصصة",
      "أدوات إدارة متقدمة",
      "ضمان جودة العمل",
      "خصومات للمشاريع الكبيرة",
    ],
    cta: "ابدأ التوظيف",
    popular: false,
  },
];

export function RolesSection() {
  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            منصة لـ<span className="text-gradient-primary">الجميع</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            سواء كنت طالباً أو مستقلاً أو شركة، لدينا ما يناسبك
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.title}
                className={`relative glass border-border/50 hover-lift ${
                  role.popular ? "ring-2 ring-primary shadow-glow" : ""
                }`}
              >
                {role.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold">
                      <Star className="w-3 h-3" />
                      الأكثر شعبية
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary/20 flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">{role.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {role.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-success shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth">
                    <Button
                      variant={role.popular ? "default" : "outline"}
                      className="w-full"
                    >
                      {role.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
