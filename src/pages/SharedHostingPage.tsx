import { Server, Lock, Cpu, Globe, Rocket, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store";

export default function SharedHostingPage() {
  const { settings } = useAppStore();

  const features = [
    {
      title: "One-Click Apps",
      description:
        "Install WordPress, Joomla, or Drupal instantly with our automated app installer. No technical knowledge required.",
      icon: Rocket,
    },
    {
      title: "Free SSL Certificates",
      description:
        "Secure your visitors' data and boost your SEO rankings with automatic Let's Encrypt SSL certificates.",
      icon: Lock,
    },
    {
      title: "Ultra-Fast NVMe SSDs",
      description:
        "Our pure solid-state drive arrays provide up to 300% faster data access compared to traditional hard drives.",
      icon: Cpu,
    },
    {
      title: "Daily Automated Backups",
      description:
        "Sleep easy knowing your data is backed up every 24 hours. Restore your site with a single click.",
      icon: Server,
    },
    {
      title: "Global CDN Included",
      description:
        "Serve your content from 200+ global edge locations to ensure lightning-fast load times anywhere.",
      icon: Globe,
    },
    {
      title: "DDoS Protection",
      description:
        "Always-on network layer protection automatically mitigates malicious traffic before it impacts your site.",
      icon: Shield,
    },
  ];

  return (
    <div className="bg-navy-dark min-h-screen text-white pt-16">
      {/* Header */}
      <section className="bg-navy py-20 px-4 text-center relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Shared Hosting, Reinvented.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the power of a VPS with the simplicity of shared hosting.
            Optimized for speed, security, and developer joy.
          </p>
          <a
            href="/#plans"
            className="bg-electric hover:bg-electric-light text-white px-8 py-4 rounded-xl font-bold transition-all inline-block shadow-[0_0_20px_rgba(0,180,216,0.4)]"
          >
            Configure Your Plan
          </a>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 bg-navy-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Everything you need to succeed online
            </h2>
            <p className="text-gray-400 text-lg">
              We don't nickel and dime you. Premium features come standard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-navy p-8 rounded-2xl border border-white/5 hover:border-electric/50 hover:shadow-[0_0_30px_rgba(0,180,216,0.15)] transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-electric/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-electric-light drop-shadow-md" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-electric-light transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#03045E] via-[#0077B6] to-electric py-24 px-4 text-center border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 drop-shadow-md">
            Ready to upgrade your hosting?
          </h2>
          <p className="text-white/90 text-xl mb-10 leading-relaxed">
            Join thousands of creators and businesses who trust{" "}
            {settings.brandName}.
          </p>
          <a
            href="/#plans"
            className="bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-xl font-bold transition-colors inline-block shadow-2xl text-lg hover:scale-105 transform duration-300"
          >
            Get Started Risk-Free
          </a>

          {settings.freePlans?.showPage && (
            <div className="mt-8">
              <Link
                to="/free-plans"
                className="inline-block bg-[#122A35]/80 hover:bg-[#122A35] border border-[#5865F2]/50 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(88,101,242,0.2)] group"
              >
                <span className="text-xl mr-2 group-hover:scale-110 inline-block transition-transform">
                  🎁
                </span>
                Want to try for FREE first? Check our free plan →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
