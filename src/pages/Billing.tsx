import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  FileText, 
  Calendar,
  Check,
  Download,
  ExternalLink,
  Wifi,
  Zap,
  Coffee,
  MapPin,
  Clock,
  Phone,
  Mail,
  HelpCircle,
  RefreshCw,
  Building
} from "lucide-react";
import { useState } from "react";

const invoices = [
  {
    id: "INV-2024-001",
    description: "فاتورة يناير 2024",
    amount: "150 شيكل",
    status: "مدفوع",
    date: "٢٠٢٤/٠١/١٤",
    dueDate: "٢٠٢٤/٠١/١٤",
    paymentMethod: "نقداً",
    services: [
      "مكتب خاص لمدة شهر",
      "كهرباء مستمرة 24/7",
      "إنترنت فائق السرعة",
      "قهوة ومشروبات مجانية",
      "قاعة اجتماعات (5 ساعات)"
    ]
  },
  {
    id: "INV-2023-012",
    description: "فاتورة ديسمبر 2023",
    amount: "150 شيكل",
    status: "مدفوع",
    date: "٢٠٢٣/١٢/١٤",
    dueDate: "٢٠٢٣/١٢/١٤",
    paymentMethod: "نقداً",
    services: [
      "مكتب خاص لمدة شهر",
      "كهرباء مستمرة 24/7",
      "إنترنت فائق السرعة",
      "قهوة ومشروبات مجانية"
    ]
  },
  {
    id: "INV-2023-011",
    description: "فاتورة نوفمبر 2023",
    amount: "120 شيكل",
    status: "مدفوع",
    date: "٢٠٢٣/١١/١٤",
    dueDate: "٢٠٢٣/١١/١٤",
    paymentMethod: "نقداً",
    services: [
      "مكتب مشترك لمدة شهر",
      "كهرباء مستمرة 24/7",
      "إنترنت فائق السرعة"
    ]
  },
];

export default function Billing() {
  const [activeSubscription] = useState(true);
  const [daysRemaining] = useState(8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-foreground">الفواتير</span>
              {" "}
              <span className="text-gradient-primary">وإدارة الاشتراكات</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              تتبع فواتيرك واشتراكاتك في وورك سبيس wekicode بقطاع غزة
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Subscription */}
              <div className="glass rounded-2xl p-6 border-border/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">الاشتراك الحالي</h2>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          activeSubscription 
                            ? "bg-success/10 text-success" 
                            : "bg-destructive/10 text-destructive"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${activeSubscription ? "bg-success" : "bg-destructive"}`} />
                          {activeSubscription ? "نشط" : "غير نشط"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-secondary/50 border border-border/30">
                      <h3 className="text-lg font-bold text-foreground mb-2">الباقة الشهرية المميزة</h3>
                      <div className="text-3xl font-black text-gradient-primary mb-2">150 شيكل<span className="text-base font-normal text-muted-foreground">/شهر</span></div>
                      <p className="text-sm text-muted-foreground mb-4">من ١٤ يناير ٢٠٢٤ إلى ١٤ فبراير ٢٠٢٤</p>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-warning" />
                        <span className="text-warning font-medium">متبقي {daysRemaining} أيام</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-secondary/50 border border-border/30">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-muted-foreground">التجديد التلقائي</span>
                        <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">مفعل</span>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="hero" size="sm" className="flex-1">
                          <RefreshCw className="w-4 h-4" />
                          تجديد الاشتراك
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          تعديل الباقة
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoices */}
              <div className="glass rounded-2xl p-6 border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    الفواتير الأخيرة
                  </h2>
                  <Button variant="ghost" size="sm">
                    عرض جميع الفواتير
                  </Button>
                </div>

                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/30">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-sm text-muted-foreground">{invoice.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              invoice.status === "مدفوع" 
                                ? "bg-success/10 text-success" 
                                : "bg-warning/10 text-warning"
                            }`}>
                              {invoice.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-1">{invoice.description}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>تاريخ الإصدار: {invoice.date}</span>
                            <span>استحقاق الدفع: {invoice.dueDate}</span>
                          </div>
                        </div>
                        <div className="text-left md:text-right">
                          <div className="text-2xl font-bold text-gradient-accent mb-1">{invoice.amount}</div>
                          <div className="text-sm text-muted-foreground">طريقة الدفع: {invoice.paymentMethod}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">الخدمات المشمولة:</h4>
                        <div className="flex flex-wrap gap-2">
                          {invoice.services.map((service, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs">
                              <Check className="w-3 h-3" />
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-border/30">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                          عرض التفاصيل
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                          تحميل PDF
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="glass rounded-xl p-5 border-border/50 text-center">
                  <div className="text-3xl font-black text-gradient-accent mb-1">420</div>
                  <div className="text-sm text-muted-foreground">إجمالي المدفوعات (شيكل)</div>
                </div>
                <div className="glass rounded-xl p-5 border-border/50 text-center">
                  <div className="text-3xl font-black text-gradient-primary mb-1">3</div>
                  <div className="text-sm text-muted-foreground">عدد الفواتير المدفوعة</div>
                </div>
                <div className="glass rounded-xl p-5 border-border/50 text-center">
                  <div className="text-3xl font-black text-gradient-primary mb-1">5</div>
                  <div className="text-sm text-muted-foreground">شهور عضوية</div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Workspace Info */}
              <div className="glass rounded-2xl p-6 border-border/50 overflow-hidden relative">
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop" 
                    alt="Workspace" 
                    className="w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                </div>
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <Building className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">wekicode Workspace</h3>
                      <p className="text-sm text-muted-foreground">Gaza</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>شارع الجامعة، حي الرمال، غزة</span>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      متاح 24/7
                    </span>
                  </div>

                  <h4 className="text-sm font-medium text-foreground mb-3">المرافق والخدمات:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-foreground">مكاتب مجهزة بالكامل</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-2 text-sm">
                        <Wifi className="w-4 h-4 text-primary" />
                        <span className="text-foreground">إنترنت فائق السرعة 100MB</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-2 text-sm">
                        <Coffee className="w-4 h-4 text-accent" />
                        <span className="text-foreground">قهوة ومشروبات مجانية</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-warning" />
                        <span className="text-foreground">قاعات اجتماعات</span>
                      </div>
                      <span className="text-xs text-muted-foreground">10 شيكل/ساعة</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="glass rounded-2xl p-6 border-border/50">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  الدعم والمساعدة
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">billing@wekicode.ps</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground" dir="ltr">+970 8 123 4567</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    تواصل معنا
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    الأسئلة الشائعة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}