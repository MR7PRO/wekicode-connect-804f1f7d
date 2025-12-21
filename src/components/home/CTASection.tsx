import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">انضم لمجتمعنا اليوم</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-6">
            <span className="text-foreground">هل أنت مستعد</span>
            <br />
            <span className="text-gradient-primary">للانطلاق؟</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            سجّل الآن وابدأ رحلتك مع مجتمع من المبرمجين والمبدعين. 
            تعلم، اعمل، واكسب النقاط في منصة واحدة.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="min-w-[200px]">
              إنشاء حساب مجاني
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Link to="/questions">
              <Button variant="glass" size="xl" className="min-w-[200px]">
                استكشف المنصة
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>500+ مبرمج نشط</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>مجاني للبدء</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>دعم فلسطيني 🇵🇸</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
