import { useState, useEffect } from "react";
import { Calendar, Gift, Check, Coins, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface DailyCheckin {
  id: string;
  checkin_date: string;
  points_earned: number;
}

export function DailyCheckinCalendar() {
  const { user, refreshProfile } = useAuth();
  const [checkins, setCheckins] = useState<DailyCheckin[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get days in current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth, year, month };
  };

  const { daysInMonth, firstDayOfMonth, year, month } = getDaysInMonth(currentMonth);

  // Check if a specific day has been checked in
  const isCheckedIn = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return checkins.some(c => c.checkin_date === dateStr);
  };

  // Check if today can be checked in
  const today = new Date();
  const isToday = (day: number) => {
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day;
  };

  const todayCheckedIn = isCheckedIn(today.getDate()) && 
    today.getFullYear() === year && 
    today.getMonth() === month;

  useEffect(() => {
    if (user) {
      fetchCheckins();
    } else {
      setLoading(false);
    }
  }, [user, currentMonth]);

  const fetchCheckins = async () => {
    if (!user) return;
    
    setLoading(true);
    const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month + 1).padStart(2, '0')}-${daysInMonth}`;

    const { data, error } = await supabase
      .from('daily_checkins')
      .select('*')
      .eq('user_id', user.id)
      .gte('checkin_date', startDate)
      .lte('checkin_date', endDate);

    if (error) {
      console.error('Error fetching checkins:', error);
    } else {
      setCheckins(data || []);
    }
    setLoading(false);
  };

  const handleCheckin = async () => {
    if (!user) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "قم بتسجيل الدخول للحصول على نقاط الحضور اليومي",
        variant: "destructive"
      });
      return;
    }

    setCheckingIn(true);

    const { error } = await supabase
      .from('daily_checkins')
      .insert({
        user_id: user.id,
        checkin_date: new Date().toISOString().split('T')[0],
        points_earned: 5
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "تم تسجيل الحضور مسبقاً",
          description: "لقد سجلت حضورك اليوم بالفعل!",
          variant: "destructive"
        });
      } else {
        console.error('Error checking in:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تسجيل الحضور",
          variant: "destructive"
        });
      }
    } else {
      await fetchCheckins();
      await refreshProfile();
      toast({
        title: "🎉 تم تسجيل الحضور!",
        description: "حصلت على 5 نقاط مجانية!",
      });
    }

    setCheckingIn(false);
  };

  const monthNames = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  const dayNames = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const totalPointsThisMonth = checkins.reduce((sum, c) => sum + c.points_earned, 0);

  return (
    <div className="glass rounded-2xl p-6 border-primary/30 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          الحضور اليومي
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <Gift className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">+5 نقاط يومياً</span>
        </div>
      </div>

      {/* Welcome bonus info */}
      <div className="bg-gradient-to-r from-success/20 to-success/5 rounded-xl p-4 mb-4 border border-success/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
            <Gift className="w-5 h-5 text-success" />
          </div>
          <div>
            <div className="font-medium text-foreground">هدية الترحيب</div>
            <div className="text-sm text-muted-foreground">كل مستخدم جديد يحصل على <span className="text-success font-bold">10 نقاط</span> مجاناً!</div>
          </div>
        </div>
      </div>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          ←
        </button>
        <span className="font-medium text-foreground">
          {monthNames[month]} {year}
        </span>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          →
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Day names header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs text-muted-foreground py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const checked = isCheckedIn(day);
              const isTodayCell = isToday(day);
              const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

              return (
                <motion.div
                  key={day}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium relative transition-all ${
                    checked
                      ? "bg-gradient-to-br from-success to-success/80 text-success-foreground shadow-lg"
                      : isTodayCell
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : isPast
                      ? "bg-secondary/30 text-muted-foreground"
                      : "bg-secondary/50 text-foreground"
                  }`}
                >
                  {checked ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    day
                  )}
                  {isTodayCell && !checked && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 mb-4">
            <div className="text-sm text-muted-foreground">
              أيام الحضور هذا الشهر: <span className="text-foreground font-bold">{checkins.length}</span>
            </div>
            <div className="flex items-center gap-1 text-accent font-bold">
              <Coins className="w-4 h-4" />
              <span>+{totalPointsThisMonth}</span>
            </div>
          </div>

          {/* Check-in button */}
          {user ? (
            <Button
              onClick={handleCheckin}
              disabled={todayCheckedIn || checkingIn}
              className="w-full"
              variant={todayCheckedIn ? "secondary" : "hero"}
            >
              {checkingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري التسجيل...
                </>
              ) : todayCheckedIn ? (
                <>
                  <Check className="w-4 h-4" />
                  تم تسجيل حضور اليوم ✓
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  سجّل حضورك واحصل على 5 نقاط!
                </>
              )}
            </Button>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-2">
              سجّل دخولك للحصول على نقاط الحضور اليومي
            </div>
          )}
        </>
      )}
    </div>
  );
}
