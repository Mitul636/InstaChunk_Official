import { Plan, useAppStore } from "../store";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Check,
  X,
  Bell,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import React, { useState } from "react";
import { StatsCounter } from "./StatsCounter";
import { ScrollReveal } from "./ScrollReveal";
import { Link } from "react-router-dom";

interface PlanCardProps {
  key?: React.Key;
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const { currency, settings } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);

  const getPrice = (plan: Plan) => {
    if (currency === "USD") return `$ ${plan.priceUSD.toFixed(2)}`;
    return currency === "INR" ? `₹ ${plan.priceINR}` : `৳ ${plan.priceBDT}`;
  };

  const getOriginalPrice = (plan: Plan) => {
    if (!plan.freeSettings) return "";
    if (currency === "USD")
      return `$${plan.freeSettings.originalPriceUSD.toFixed(2)}`;
    return currency === "INR"
      ? `₹${plan.freeSettings.originalPriceINR}`
      : `৳${plan.freeSettings.originalPriceBDT}`;
  };

  const isPopular = plan.badge?.toLowerCase() === "popular" || plan.isPopular;

  if (plan.isFree && plan.freeSettings) {
    const data = plan.freeSettings;
    const isFull = data.usedSlots >= data.totalSlots;
    const progressPercent = Math.min(
      (data.usedSlots / data.totalSlots) * 100,
      100,
    );

    let progressColor = "bg-[#25D366]";
    if (progressPercent > 50 && progressPercent <= 80)
      progressColor = "bg-[#FFA500]";
    if (progressPercent > 80) progressColor = "bg-[#FF4444]";

    return (
      <>
        <div className="bg-[#1a1a2e]/90 backdrop-blur-md rounded-3xl p-8 border-2 border-[#5865F2] hover:shadow-[0_0_30px_rgba(88,101,242,0.3)] transition-all flex flex-col relative">
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#25D366] text-navy px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-[0_4px_10px_rgba(37,211,102,0.4)]">
            {data.badgeText || "FREE"}
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <div className="border-b border-white/10 w-full mb-6 mt-2"></div>

          <div className="mb-8">
            <div className="flex items-end gap-2 text-[#25D366]">
              <span className="text-5xl font-display font-bold">$0 FREE</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 line-through">
              {getOriginalPrice(plan)}/mo
            </p>
          </div>

          <ul className="space-y-4 mb-10 flex-1">
            {plan.features.map((feature, fIdx) => {
              const isNegative = feature.toLowerCase().startsWith("no ");
              return (
                <li key={fIdx} className="flex items-start gap-3 text-sm">
                  {isNegative ? (
                    <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <Check className="w-5 h-5 text-[#25D366] flex-shrink-0" />
                  )}
                  <span
                    className={isNegative ? "text-gray-500" : "text-gray-200"}
                  >
                    {feature}
                  </span>
                </li>
              );
            })}
          </ul>

          {data.showSlots && (
            <ScrollReveal className="mb-6 mt-auto">
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span className="text-gray-300 flex items-center gap-1">
                  🎰 Slots Available:
                </span>
                <span className={isFull ? "text-[#FF4444]" : "text-white"}>
                  {isFull
                    ? "SLOTS FULL"
                    : <><StatsCounter target={data.totalSlots - data.usedSlots} duration={1500} />/{data.totalSlots} available</>}
                </span>
              </div>
              <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: progressPercent + "%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={"h-full " + progressColor}
                ></motion.div>
              </div>
            </ScrollReveal>
          )}

          {isFull ? (
            <button
              onClick={() => setModalOpen(true)}
              className="w-full bg-[#36393f] hover:bg-[#40444b] border border-gray-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              😢 Slots Full — Join Waitlist
            </button>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="w-full bg-[#5865F2] hover:bg-[#6974fa] text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(88,101,242,0.4)] flex items-center justify-center gap-2 text-lg"
            >
              🎁 Claim Free Plan
            </button>
          )}
        </div>

        <AnimatePresence>
          {modalOpen && (
            <div className="fixed inset-0 z-[100] flex flex-col justify-end md:justify-center p-0 md:p-4 pb-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setModalOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: "100%", md: { y: 20, scale: 0.95 } }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: "100%", md: { y: 20, scale: 0.95 } }}
                className="relative w-full max-w-md mx-auto bg-[rgba(13,32,40,0.98)] md:border border-[#5865F2]/40 md:shadow-[0_0_30px_rgba(88,101,242,0.2)] rounded-t-3xl md:rounded-3xl overflow-hidden"
              >
                {isFull ? (
                  <>
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        😢 All Slots Are Taken!
                      </h2>
                      <button
                        onClick={() => setModalOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-300 mb-6">
                        Join our Discord to get notified when slots open up.
                      </p>
                      <button
                        onClick={() => {
                          window.open(data.discordLink, "_blank");
                          setModalOpen(false);
                        }}
                        className="w-full bg-[#5865F2] hover:bg-[#6974fa] text-white py-4 px-5 rounded-xl font-bold transition-all"
                      >
                        Join Discord Waitlist
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        🎁 Claim Your Free Plan
                        <br />
                        <span className="text-sm font-normal text-gray-400 block mt-1">
                          {plan.name}
                        </span>
                      </h2>
                      <button
                        onClick={() => setModalOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                        📋 How to Claim:
                      </h3>
                      <div className="space-y-3 mb-6 bg-black/20 p-5 rounded-xl border border-white/5">
                        {data.discordInstructions.map((inst, idx) => (
                          <p key={idx} className="text-gray-300 text-sm">
                            {idx + 1}️⃣ {inst.replace("[Plan Name]", plan.name)}
                          </p>
                        ))}
                      </div>

                      <div className="mb-8 border-t border-white/10 pt-6 mt-6">
                        <h4 className="text-[#E8420A] text-sm font-bold flex items-center gap-1 mb-2">
                          ⚠️ Rules:
                        </h4>
                        <ul className="text-xs text-gray-400 space-y-1 ml-1 list-disc list-inside">
                          <li>1 free plan per account</li>
                          <li>{data.durationDays} days only</li>
                          <li>No abuse</li>
                        </ul>
                      </div>

                      <div className="space-y-3 pb-8 md:pb-0">
                        {data.claimMethod !== "whatsapp" && (
                          <button
                            onClick={() => {
                              window.open(data.discordLink, "_blank");
                              setModalOpen(false);
                            }}
                            className="w-full flex items-center justify-between bg-[#5865F2] hover:bg-[#6974fa] text-white py-4 px-5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)]"
                          >
                            <span className="flex items-center gap-2">
                              <MessageSquare className="w-5 h-5" /> Join Discord
                              & Claim
                            </span>
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        )}
                        {data.claimMethod === "whatsapp" && (
                          <button
                            onClick={() => {
                              window.open(
                                "https://wa.me/?text=" +
                                  encodeURIComponent(
                                    "I want to claim " + plan.name,
                                  ),
                                "_blank",
                              );
                              setModalOpen(false);
                            }}
                            className="w-full flex items-center justify-between bg-[#25D366] hover:bg-[#20BE5A] text-white py-4 px-5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                          >
                            <span className="flex items-center gap-2">
                              <MessageSquare className="w-5 h-5" /> Claim via
                              WhatsApp
                            </span>
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => setModalOpen(false)}
                          className="w-full py-4 px-5 rounded-xl font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div
      className={`plan-card bg-navy rounded-3xl p-8 border h-full ${isPopular ? "border-2 border-electric relative shadow-[0_0_40px_rgba(0,180,216,0.25)] transform md:-translate-y-4 z-10" : "border-white/10 hover:border-white/20 hover:shadow-xl"} flex flex-col transition-all`}
    >
      {plan.badge && (
        <div
          className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-electric text-white px-6 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-[0_4px_10px_rgba(0,180,216,0.5)] whitespace-nowrap`}
        >
          {plan.badge}
        </div>
      )}
      <h3
        className={`text-2xl font-bold text-white mb-2 ${plan.badge ? "mt-2" : ""}`}
      >
        {plan.name}
      </h3>
      <div className="flex items-baseline gap-1 mb-8 mt-4 whitespace-nowrap overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={currency + getPrice(plan)}
            initial={{ opacity: 0, rotateX: -90, y: 10 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 90, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-5xl font-display font-bold text-white flex-shrink-0 block"
            style={{ transformOrigin: "center" }}
          >
            {getPrice(plan)}
          </motion.span>
        </AnimatePresence>
        <span className="text-gray-400 font-medium">/mo</span>
      </div>
      <ul className="space-y-4 mb-10 flex-1">
        {plan.features.map((feature, fIdx) => (
          <li
            key={fIdx}
            className={`flex items-start gap-3 ${isPopular ? "text-gray-300 font-medium" : "text-gray-300"}`}
          >
            <CheckCircle2
              className={`w-5 h-5 text-electric mt-0.5 flex-shrink-0 ${isPopular ? "drop-shadow-[0_0_5px_rgba(0,180,216,0.5)]" : ""}`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to={`/order/${plan.slug}`}
        className="btn-order w-full font-rajdhani font-bold text-xl py-3 rounded-xl transition-all mt-auto text-white flex items-center justify-center gap-2 hover:scale-[1.05]"
        style={{
          backgroundColor: settings.orderButtonColor || "#E8420A",
          boxShadow: `0 0 20px ${settings.orderButtonColor || "#E8420A"}80`,
        }}
      >
        {settings.orderButtonText || "Order Now 🚀"}
      </Link>
    </div>
  );
}
