import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  HelpCircle, 
  Briefcase, 
  BookOpen, 
  Gift, 
  User, 
  Menu,
  X,
  Coins
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { path: "/", label: "الرئيسية", icon: Code2 },
  { path: "/questions", label: "الأسئلة", icon: HelpCircle },
  { path: "/jobs", label: "الوظائف", icon: Briefcase },
  { path: "/courses", label: "التعليم", icon: BookOpen },
  { path: "/rewards", label: "المكافآت", icon: Gift },
  { path: "/profile", label: "ملفي", icon: User },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient-primary">wekicode</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={isActive ? "shadow-glow" : ""}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Points Display & Auth */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-accent text-accent-foreground font-bold">
              <Coins className="w-5 h-5" />
              <span>1,250</span>
            </div>
            <Button variant="hero" size="sm">
              تسجيل الدخول
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-accent text-accent-foreground font-bold">
                  <Coins className="w-5 h-5" />
                  <span>1,250</span>
                </div>
                <Button variant="hero" size="sm">
                  تسجيل الدخول
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
