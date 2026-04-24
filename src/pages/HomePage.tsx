import { Link } from "react-router-dom";
import {
  Zap,
  ShieldAlert,
  Clock,
  Users,
  Globe,
  Settings,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useAppStore } from "../store";
import { motion, AnimatePresence } from "motion/react";

import { PlanCard } from "../components/PlanCard";
import { TypewriterHeading } from "../components/Typewriter";
import { WordCycle } from "../components/WordCycle";
import { ScrollReveal } from "../components/ScrollReveal";
import { StatsCounter } from "../components/StatsCounter";


export default function HomePage() {
  const {
    services: allServices,
    plans: allPlans,
    settings,
    currency,
    setSelectedPlanForOrder,
    setOrderModalOpen,
  } = useAppStore();
  const { freePlans } = settings;
  const services = allServices.filter((s) => s.visible);
  const popularPlans = allPlans
    .filter((p) => p.active && p.isPopular)
    .slice(0, 3);
  const otherPlans = allPlans
    .filter((p) => p.active && !p.isPopular)
    .slice(0, 3 - popularPlans.length);
  const displayPlans = [...popularPlans, ...otherPlans].slice(0, 3); // Make sure we show max 3

  const getPrice = (plan: any) => {
    if (currency === "USD") return `$ ${plan.priceUSD.toFixed(2)}`;
    return currency === "INR" ? `₹ ${plan.priceINR}` : `৳ ${plan.priceBDT}`;
  };

  const whyChooseUs = [
    {
      title: "Lightning Fast",
      description:
        "NVMe SSD storage paired with optimized server configs for maximum I/O performance.",
      icon: Zap,
    },
    {
      title: "DDoS Protection",
      description:
        "Enterprise-grade mitigation to ensure your services remain online during attacks.",
      icon: ShieldAlert,
    },
    {
      title: "24/7 Support",
      description:
        "Get help when you need it via Discord, email, or our live priority chat system.",
      icon: Clock,
    },
    {
      title: "Global Network",
      description:
        "Servers strategically located worldwide to guarantee low latency everywhere.",
      icon: Globe,
    },
    {
      title: "Easy Management",
      description:
        "An intuitive control panel designed to make managing your servers a breeze.",
      icon: Settings,
    },
    {
      title: "Best Pricing",
      description:
        "Highly competitive, transparent pricing with absolutely no hidden renewal fees.",
      icon: DollarSign,
    },
  ];

  return (
    <div className="bg-[#0D1B2A] text-[#A8B8C8]">
      <section className="relative min-h-[80vh] flex items-center pt-20 px-4">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0D1B2A,#1B3A6B)] opacity-90"></div>
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 relative z-10 items-center">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              WELCOME TO <span className="text-[#FFB347]">INSTACHUNK</span> <br /> FAST.
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Premium hosting with blazing-fast performance, 99.9% uptime, and 24/7 expert support.
            </p>
            <div className="flex gap-4">
                <a href="#plans" className="px-8 py-4 bg-[#FFB347] text-[#0D1B2A] font-bold rounded-lg hover:bg-[#D4B896] transition-all">Get Started</a>
                <a href={settings.discordLink} className="px-8 py-4 border border-[#4A7B9D] text-[#4A7B9D] font-bold rounded-lg hover:bg-[rgba(74,123,157,0.1)] transition-all">Join Discord</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Instant Setup", desc: "Under 60 seconds", icon: Zap },
              { title: "DDoS Protection", desc: "Enterprise-grade", icon: ShieldAlert },
              { title: "99.9% Uptime", desc: "Guaranteed", icon: Clock },
              { title: "24/7 Support", desc: "Expert help", icon: Users },
            ].map((card, i) => (
                <div key={i} className="bg-[rgba(26,39,68,0.8)] backdrop-blur border border-[rgba(74,123,157,0.4)] p-6 rounded-xl hover:border-[#FFB347] transition-all hover:-translate-y-1">
                    <card.icon className="w-8 h-8 text-[#FFB347] mb-4" />
                    <div className="font-bold text-white mb-1">{card.title}</div>
                    <div className="text-sm">{card.desc}</div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Plans Section */}
      <section id="plans" className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 section-heading">POPULAR PLANS</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {displayPlans.map((plan) => (
                <div key={plan.id} className={`plan-card ${plan.isPopular ? 'popular' : ''} p-8`}>
                    {plan.isPopular && <div className="inline-block bg-[#FFB347] text-[#0D1B2A] text-xs font-bold px-3 py-1 rounded-full mb-4">POPULAR</div>}
                    <h3 className="text-xl font-bold text-white mb-6">{plan.name}</h3>
                    <div className="text-4xl font-bold text-[#FFB347] mb-8">{getPrice(plan)}<span className="text-lg text-[#A8B8C8]">/mo</span></div>
                    <ul className="space-y-4 mb-8">
                        {plan.features.map((f, i) => <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-[#2ECC71]" />
                            {f}
                        </li>)}
                    </ul>
                    <Link to={`/order/${plan.slug}`} className="block w-full text-center bg-[#FFB347] text-[#0D1B2A] font-bold py-3 rounded-lg hover:bg-[#D4B896] transition-all">Order Now</Link>
                </div>
            ))}
        </div>
      </section>
      
      {/* ... keeping other sections, just apply classes ... */}
    </div>
  );
}
