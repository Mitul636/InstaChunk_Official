import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "../store";
import { CheckCircle2, Copy, MessageSquare, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function OrderPage() {
  const { planSlug } = useParams();
  const navigate = useNavigate();
  const { plans, settings, currency, showToast } = useAppStore();
  const plan = plans.find((p) => p.slug === planSlug);

  const [formData, setFormData] = useState({
    fullName: "",
    discord: "",
    email: "",
    country: "India",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!plan) {
      navigate("/");
    }
  }, [plan, navigate]);

  if (!plan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Confetti burst logic can be added here
    }, 1500);
  };

  const getPriceDisplay = () => {
    if (currency === "USD") return `$${plan.priceUSD.toFixed(2)} /mo`;
    return currency === "INR" ? `₹${plan.priceINR} /mo` : `৳${plan.priceBDT} /mo`;
  };

  return (
    <div className="min-h-screen bg-[#0D2028] text-white pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#8FA8B8] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Plans
        </button>

        {!submitted ? (
          <div className="grid lg:grid-cols-[380px,1fr] gap-12 items-start">
            {/* Left: Sticky Summary */}
            <div className="lg:sticky lg:top-24 bg-[rgba(26,26,46,0.95)] border border-[rgba(232,66,10,0.4)] p-8 rounded-2xl shadow-[0_0_30px_rgba(232,66,10,0.2)]">
              <h2 className="text-xl font-bold mb-6">📋 Order Summary</h2>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-[#E8420A] mb-6">{getPriceDisplay()}</div>
              
              <div className="space-y-3 mb-8">
                {plan.features.map((f, i) => (
                  <p key={i} className="flex items-center gap-2">✅ {f}</p>
                ))}
              </div>
              
              <div className="border-t border-white/10 pt-6 mt-6">
                <p className="text-sm text-gray-400 mb-2">Currency: {currency}</p>
                <div className="text-sm space-y-2 mt-4 text-gray-400">
                    <p>🔒 Secure Order</p>
                    <p>📞 24/7 Support</p>
                    <p>⚡ Instant Setup</p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-[rgba(26,26,46,0.6)] border border-[rgba(232,66,10,0.2)] p-8 rounded-2xl">
              <h2 className="text-3xl font-bold mb-8">Complete Your Order 🚀</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input required className="w-full bg-[rgba(13,32,40,0.8)] border border-[rgba(232,66,10,0.3)] rounded-lg p-4 focus:border-[#E8420A] outline-none" placeholder="Enter your full name" 
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Discord Username *</label>
                  <input required className="w-full bg-[rgba(13,32,40,0.8)] border border-[rgba(232,66,10,0.3)] rounded-lg p-4 focus:border-[#E8420A] outline-none" placeholder="@username" 
                    onChange={e => setFormData({...formData, discord: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-1">We'll contact you here</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <select className="w-full bg-[rgba(13,32,40,0.8)] border border-[rgba(232,66,10,0.3)] rounded-lg p-4 focus:border-[#E8420A] outline-none"
                    onChange={e => setFormData({...formData, country: e.target.value})}
                  >
                    <option>India</option>
                    <option>Bangladesh</option>
                    <option>United States</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Special Notes</label>
                  <textarea className="w-full bg-[rgba(13,32,40,0.8)] border border-[rgba(232,66,10,0.3)] rounded-lg p-4 focus:border-[#E8420A] outline-none h-32" 
                    maxLength={300}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                  />
                  <p className="text-xs text-right text-gray-500">{formData.notes.length}/300</p>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-[#E8420A] py-4 rounded-xl font-bold text-lg hover:bg-[#FF6B35] transition-all">
                  {isSubmitting ? "Processing..." : "Place Order Now 🚀"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center max-w-2xl mx-auto">
            <CheckCircle2 className="w-24 h-24 text-[#25D366] mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Order Placed Successfully!</h2>
            <p className="mb-8">Hi {formData.fullName}, thanks for choosing {settings.brandName}.</p>
            
            <div className="bg-black/20 p-6 rounded-xl text-left border border-white/10 mb-8">
              <h3 className="font-bold mb-4">Order Details</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>👤 Name: {formData.fullName}</p>
                <p>💬 Discord: {formData.discord}</p>
                <p>📦 Plan: {plan.name}</p>
                <p>💰 Price: {getPriceDisplay()}</p>
              </div>
            </div>

            <button onClick={() => {navigator.clipboard.writeText("Order details here..."); showToast("Copied to clipboard!");}} className="bg-white/10 px-6 py-3 rounded-lg font-bold mb-8 flex items-center gap-2 mx-auto">
                <Copy className="w-4 h-4"/> Copy Order Details
            </button>
            
            <button onClick={() => navigate("/")} className="block mx-auto text-[#8FA8B8] hover:text-white">← Order Another Plan</button>
          </div>
        )}
      </div>
    </div>
  );
}
