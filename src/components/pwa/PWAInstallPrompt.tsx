import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/usePWA';

export function PWAInstallPrompt() {
  const { canInstall, installApp, isOnline, isInstalled } = usePWA();
  const [showPrompt, setShowPrompt] = useState(false);
  const [showOfflineToast, setShowOfflineToast] = useState(false);

  useEffect(() => {
    // Show install prompt after 30 seconds if installable
    if (canInstall) {
      const timer = setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');
        if (!dismissed) {
          setShowPrompt(true);
        }
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [canInstall]);

  useEffect(() => {
    // Show offline toast
    if (!isOnline) {
      setShowOfflineToast(true);
      const timer = setTimeout(() => setShowOfflineToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  return (
    <>
      {/* Install Prompt */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-sm"
          >
            <div className="glass rounded-2xl p-4 border border-primary/20 shadow-glow">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground mb-1">ثبّت التطبيق</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    ثبّت wekicode على جهازك للوصول السريع والعمل بدون إنترنت
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleInstall} 
                      size="sm" 
                      className="bg-gradient-primary"
                    >
                      <Download className="w-4 h-4" />
                      تثبيت
                    </Button>
                    <Button 
                      onClick={handleDismiss} 
                      variant="ghost" 
                      size="sm"
                    >
                      لاحقاً
                    </Button>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Toast */}
      <AnimatePresence>
        {showOfflineToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-sm"
          >
            <div className="bg-warning/90 text-warning-foreground rounded-xl p-3 flex items-center gap-3">
              <WifiOff className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">أنت غير متصل بالإنترنت. بعض الميزات قد لا تعمل.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Online Restored Toast */}
      <AnimatePresence>
        {isOnline && showOfflineToast === false && localStorage.getItem('was-offline') === 'true' && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-sm"
          >
            <div className="bg-success/90 text-success-foreground rounded-xl p-3 flex items-center gap-3">
              <Wifi className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">تم استعادة الاتصال بالإنترنت</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
