import { useAppStore, Plan } from "../store";
import { X, Copy, MessageCircle, MessageSquare, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCallback, useState } from "react";
import { Confetti } from "./Confetti";

export default function OrderModal() {
  const {
    orderModalOpen,
    setOrderModalOpen,
    selectedPlanForOrder,
    setSelectedPlanForOrder,
    settings,
    showToast,
    currency,
  } = useAppStore();

  const [isSuccess, setIsSuccess] = useState(false);

  const getPrice = useCallback(
    (plan: Plan) => {
      if (currency === "USD") return `$${plan.priceUSD.toFixed(2)}`;
      return currency === "INR" ? `₹${plan.priceINR}` : `৳${plan.priceBDT}`;
    },
    [currency],
  );

  const handleClose = () => {
    setOrderModalOpen(false);
    setTimeout(() => {
      setSelectedPlanForOrder(null);
      setIsSuccess(false);
    }, 300);
  };

  const getOrderText = () => {
    if (!selectedPlanForOrder) return "";
    return `━━━━━━━━━━━━━━━━━━━━━
🐯 ${settings.brandName || "TigerHost"} Order Request
━━━━━━━━━━━━━━━━━━━━━
📦 Plan: ${selectedPlanForOrder.name}
💰 Price: ${getPrice(selectedPlanForOrder)}/mo
💱 Currency: ${currency}
⚙️ Features:
${selectedPlanForOrder.features.map((f) => `  • ${f}`).join("\n")}
━━━━━━━━━━━━━━━━━━━━━
Sent from ${window.location.hostname}`;
  };

  const copyToClipboard = () => {
    const text = getOrderText();
    navigator.clipboard.writeText(text);
    setIsSuccess(true);
  };

  const openDiscord = () => {
    setIsSuccess(true);
    setTimeout(() => {
      window.open(settings.discordLink, "_blank");
    }, 1500);
  };

  const openWhatsapp = () => {
    if (!selectedPlanForOrder) return;
    setIsSuccess(true);
    const text = encodeURIComponent(`Hi! I want to order:
Plan: ${selectedPlanForOrder.name}
Price: ${getPrice(selectedPlanForOrder)}/mo

Please help me get started!`);
    setTimeout(() => {
    window.open(
      `https://wa.me/${settings.orderWhatsappNumber.replace(/[^0-9]/g, "")}?text=${text}`,
      "_blank",
    );
    }, 1500);
  };

  if (!selectedPlanForOrder && orderModalOpen) return null;

  return (
    <AnimatePresence>
      {orderModalOpen && selectedPlanForOrder && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[rgba(13,32,40,0.95)] border border-[#E8420A]/40 shadow-[0_0_30px_rgba(232,66,10,0.2)] rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🐯 Complete Your Order
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            {isSuccess ? (
              <div className="p-8 text-center relative overflow-hidden">
                <Confetti />
                <div className="mx-auto w-24 h-24 mb-6 relative">
                  <svg className="w-full h-full text-green-400 check-circle" viewBox="0 0 52 52">
                    <circle className="text-green-400/20" cx="26" cy="26" r="25" fill="none" strokeWidth="2" stroke="currentColor"/>
                    <path className="text-green-400" fill="none" strokeWidth="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" 
                      d="M14.1 27.2l7.1 7.2 16.7-16.8" 
                    />
                  </svg>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Order Initiated!</h3>
                  <p className="text-gray-400 mb-6">Your order has been initiated successfully.</p>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  onClick={handleClose}
                  className="w-full bg-[#E8420A] text-white py-3 rounded-xl font-bold hover:bg-[#E8420A]/80 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            ) : (
            <div className="p-6">
              <div className="bg-black/30 rounded-xl p-4 mb-6 border border-white/5">
                <p className="text-gray-400 text-sm mb-1">Selected Plan</p>
                <div className="flex justify-between items-end">
                  <h3 className="text-xl font-bold text-white">
                    {selectedPlanForOrder.name}
                  </h3>
                  <div className="text-lg font-display text-electric font-bold">
                    {getPrice(selectedPlanForOrder)}
                    <span className="text-sm font-sans text-gray-500 font-normal">
                      /mo
                    </span>
                  </div>
                </div>
              </div>

              {settings.orderMethod === "discord" ||
              settings.orderMethod === "both" ? (
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3 text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    HOW TO ORDER VIA DISCORD:
                  </h4>
                  <div className="bg-[#122A35] rounded-xl p-4 border border-[#E8420A]/20">
                    <p className="whitespace-pre-line text-sm text-gray-300 leading-relaxed font-mono">
                      {settings.orderInstructions ||
                        "Step 1: Join our Discord\nStep 2: Go to #orders channel\nStep 3: Create a ticket\nStep 4: Paste your order info"}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="space-y-3 pt-2">
                {(settings.orderMethod === "both" ||
                  settings.orderMethod === "discord") && (
                  <button
                    onClick={openDiscord}
                    className="w-full flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#6974fa] text-white py-3.5 px-4 rounded-xl font-semibold transition-all hover:shadow-[0_0_20px_rgba(88,101,242,0.4)]"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" />
                    Join Discord & Order
                  </button>
                )}

                {(settings.orderMethod === "both" ||
                  settings.orderMethod === "whatsapp") && (
                  <button
                    onClick={openWhatsapp}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BE5A] text-white py-3.5 px-4 rounded-xl font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    Order via WhatsApp
                  </button>
                )}

                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#E8420A]/60 hover:bg-[#E8420A]/10 text-[#E8420A] py-3.5 px-4 rounded-xl font-semibold transition-all"
                >
                  <Copy className="w-4 h-4" />
                  Copy Order Details
                </button>
              </div>
            </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
