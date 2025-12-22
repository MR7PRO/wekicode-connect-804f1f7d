import { GraduationCap, Building2, Wifi } from "lucide-react";

const partners = [
  { name: "الجامعة الإسلامية - غزة", icon: GraduationCap },
  { name: "جامعة الأزهر", icon: GraduationCap },
  { name: "وزارة الاتصالات", icon: Building2 },
];

export function PartnersSection() {
  return (
    <section className="py-8 border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <span className="text-muted-foreground text-sm font-medium">شركاء النجاح:</span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {partners.map((partner) => {
              const Icon = partner.icon;
              return (
                <div
                  key={partner.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-card/80 transition-colors"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground/80">{partner.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
