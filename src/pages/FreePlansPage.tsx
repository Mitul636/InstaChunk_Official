import { Link } from "react-router-dom";
import {
  Check,
  X,
  ShieldAlert,
  ArrowRight,
  MessageSquare,
  Bell,
} from "lucide-react";
import { useAppStore } from "../store";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { PlanCard } from "../components/PlanCard";

export default function FreePlansPage() {
  const { settings, showToast, plans: allPlans } = useAppStore();
  const { freePlans } = settings;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState<
    "minecraft" | "vps" | null
  >(null);

  if (!freePlans.showPage) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Free Plans Unavailable
          </h1>
          <p className="text-gray-400 mb-8">
            We are not currently offering free plans. Please check back later.
          </p>
          <Link
            to="/"
            className="bg-electric hover:bg-electric-light text-white px-6 py-3 rounded-lg font-medium"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const handleClaim = (type: "minecraft" | "vps") => {
    setSelectedPlanType(type);
    setModalOpen(true);
  };

  const handleDiscordClick = () => {
    if (!selectedPlanType) return;
    const link =
      selectedPlanType === "minecraft"
        ? freePlans.minecraft.discordLink
        : freePlans.vps.discordLink;
    showToast("Redirecting to Discord...", "info");
    window.open(link, "_blank");
    setModalOpen(false);
  };

  const renderPlanCard = (
    title: string,
    type: "minecraft" | "vps",
    data: typeof freePlans.minecraft | typeof freePlans.vps,
    icon: string,
  ) => {
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1a2e]/90 backdrop-blur-md rounded-2xl p-8 border-2 border-[#5865F2] hover:shadow-[0_0_30px_rgba(88,101,242,0.3)] transition-all flex flex-col relative"
      >
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#25D366] text-navy px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-[0_4px_10px_rgba(37,211,102,0.4)]">
          FREE
        </div>

        <h3 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-2">
          <span>{icon}</span> {title}
        </h3>
        <div className="border-b-2 border-white/10 w-full mb-6"></div>

        <div className="mb-8">
          <div className="flex items-end gap-2 text-white">
            <span className="text-4xl font-display font-bold">$0</span>
            <span className="text-gray-400 font-medium pb-1">/ FREE</span>
          </div>
          <p className="text-gray-500 text-sm mt-1 line-through">
            normally ₹{data.normallyCostsINR}/mo
          </p>
        </div>

        <ul className="space-y-4 mb-10 flex-1">
          {data.features.map((feature, idx) => (
            <li key={idx} className="flex gap-3 text-sm">
              {feature.included ? (
                <Check className="w-5 h-5 text-[#25D366] flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
              <span
                className={feature.included ? "text-gray-200" : "text-gray-500"}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-gray-300 flex items-center gap-1">
              ⚡ Slots Available:
            </span>
            <span className={isFull ? "text-[#FF4444]" : "text-white"}>
              {isFull
                ? "SLOTS FULL 😢"
                : `[${data.totalSlots - data.usedSlots}/${data.totalSlots}]`}
            </span>
          </div>
          <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`h-full ${progressColor}`}
            ></motion.div>
          </div>
        </div>

        {isFull ? (
          <button
            onClick={() => {
              showToast("Redirecting to Discord...", "info");
              window.open(data.discordLink, "_blank");
            }}
            className="w-full bg-[#36393f] hover:bg-[#40444b] border border-gray-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Bell className="w-5 h-5" />
            Notify Me
          </button>
        ) : (
          <button
            onClick={() => handleClaim(type)}
            className="w-full bg-[#5865F2] hover:bg-[#6974fa] text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(88,101,242,0.4)] flex items-center justify-center gap-2"
          >
            <span>{icon}</span> Claim Free{" "}
            {type === "minecraft" ? "Minecraft" : "VPS"}
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0D2028] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] font-sans relative overflow-hidden pb-32">
      {/* Particles/Glow Background */}
      <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] bg-[#5865F2]/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-[30%] right-1/4 w-[400px] h-[400px] bg-[#25D366]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 relative z-10 text-center flex flex-col items-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-flex flex-col items-center gap-1 mb-8"
        >
          <div className="bg-[#E8420A] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-widest shadow-[0_0_15px_rgba(232,66,10,0.6)]">
            🎁 LIMITED FREE SLOTS
          </div>
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold mt-2">
            Slots reset every month
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
          {freePlans.pageTitle}
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl text-center">
          {freePlans.pageDescription}
        </p>

        {freePlans.warningMessage && (
          <div className="bg-[#E8420A]/10 border border-[#E8420A]/30 flex items-start md:items-center gap-3 px-6 py-4 rounded-xl max-w-2xl mx-auto shadow-lg">
            <ShieldAlert className="w-6 h-6 text-[#E8420A] flex-shrink-0" />
            <p className="text-[#E8420A] font-medium text-left">
              {freePlans.warningMessage}
            </p>
          </div>
        )}
      </div>

      {/* Plans Section */}
      <div className="max-w-6xl mx-auto px-4 relative z-10 mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {allPlans
            .filter((p) => p.isFree && p.active)
            .map((plan) => (
              <div key={plan.id}>
                <PlanCard plan={plan} onOrder={() => {}} />
              </div>
            ))}
          {allPlans.filter((p) => p.isFree && p.active).length === 0 && (
            <div className="col-span-full text-center text-gray-400 p-12 bg-black/20 rounded-2xl border border-white/5">
              <p>No free plans are currently available. Check back later!</p>
            </div>
          )}
        </div>
      </div>

      {/* Rules Section */}
      <div className="max-w-4xl mx-auto px-4 relative z-10 mb-20">
        <h2 className="text-3xl font-display font-bold text-white mb-6 text-center">
          📜 Free Plan Rules
        </h2>
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 md:p-10 border-l-4 border-[#E8420A] shadow-lg border-y border-r border-y-white/5 border-r-white/5">
          <ul className="space-y-4">
            {freePlans.rules.map((rule, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <div className="mt-1 w-2 h-2 rounded-full bg-[#E8420A] flex-shrink-0"></div>
                <span className="text-gray-300 font-medium text-lg">
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Upgrade Banner */}
      <div className="w-full bg-[#122A35] border-y border-white/10 py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {freePlans.upgradeBannerText}
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Get more RAM, CPU, storage and priority support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-[#E8420A] hover:bg-[#FF6B35] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(232,66,10,0.4)]"
            >
              View Minecraft Plans
            </Link>
            <Link
              to="/services"
              className="border border-[#E8420A] text-[#E8420A] hover:bg-[#E8420A]/10 px-8 py-3.5 rounded-xl font-bold transition-all"
            >
              View VPS Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      <AnimatePresence>
        {modalOpen && selectedPlanType && (
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
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  🎁 Claim Your Free Plan
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
                  📋 Follow these steps:
                </h3>
                <div className="space-y-3 mb-6 bg-black/20 p-5 rounded-xl border border-white/5">
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#5865F2] font-bold mr-2">
                      Step 1:
                    </span>{" "}
                    🔗 Join TigerHost Discord
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#5865F2] font-bold mr-2">
                      Step 2:
                    </span>{" "}
                    ✅ Verify your account
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#5865F2] font-bold mr-2">
                      Step 3:
                    </span>{" "}
                    📂 Go to{" "}
                    <span className="text-orange-400">
                      {selectedPlanType === "minecraft"
                        ? freePlans.minecraft.claimChannel
                        : freePlans.vps.claimChannel}
                    </span>{" "}
                    channel
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#5865F2] font-bold mr-2">
                      Step 4:
                    </span>{" "}
                    🎫 Create a ticket and type: <br />
                    <span className="bg-black py-1 px-2 rounded font-mono text-electric block mt-2 text-center border border-white/10">
                      "
                      {selectedPlanType === "minecraft"
                        ? "Free Minecraft"
                        : "Free VPS"}
                      "
                    </span>
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="text-[#5865F2] font-bold mr-2">
                      Step 5:
                    </span>{" "}
                    ⏳ Wait for staff to setup your server
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-[#E8420A] text-sm font-bold flex items-center gap-1 mb-2">
                    ⚠️ Rules:
                  </h4>
                  <ul className="text-xs text-gray-400 space-y-1 ml-1 list-disc list-inside">
                    <li>1 free plan per Discord account</li>
                    <li>No abuse or plan gets removed</li>
                    <li>7 days only, no extension</li>
                  </ul>
                </div>

                <div className="space-y-3 pb-8 md:pb-0">
                  <button
                    onClick={handleDiscordClick}
                    className="w-full flex items-center justify-between bg-[#5865F2] hover:bg-[#6974fa] text-white py-4 px-5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)]"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" /> Join Discord & Claim
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="w-full py-4 px-5 rounded-xl font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
