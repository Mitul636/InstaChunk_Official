import { useEffect } from "react";
import { useAppStore } from "../store";
import { CheckCircle2, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Toast() {
  const { toast, hideToast } = useAppStore();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, x: '120%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '120%' }}
          transition={{ 
            type: "spring", 
            duration: 0.4, 
            bounce: 0.25 
          }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-[#0D2028] border border-[#E8420A]/40 shadow-[0_0_20px_rgba(232,66,10,0.2)] text-white px-5 py-4 rounded-xl overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 h-1 bg-[#FFC570] toast-progress" style={{ '--duration': '3s' } as any} />
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-[#E8420A] flex-shrink-0" />
          )}
          <span className="font-medium text-sm pr-4">{toast.message}</span>
          <button
            onClick={hideToast}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
