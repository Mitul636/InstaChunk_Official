import { Outlet, Link } from "react-router-dom";
import { Box, Menu, X, ChevronDown, User, Home, Grid, Gamepad2, Server, Monitor, Globe, Tag, Users, Phone, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../store";

export default function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currency, setCurrency, settings } = useAppStore();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Services", path: "/services", icon: Grid },
    { name: "Minecraft", path: "/services/minecraft", icon: Gamepad2 },
    { name: "KVM", path: "/services/kvm", icon: Server },
    { name: "RDP", path: "/services/rdp", icon: Monitor },
    { name: "Web", path: "/shared-hosting", icon: Globe },
    { name: "Offers", path: "#", icon: Tag },
    { name: "Team", path: "#", icon: Users },
    { name: "Contact", path: "#", icon: Phone },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1B2A] text-[#A8B8C8]">
      <header className="sticky top-0 z-50 h-16 bg-[#0D1B2A] border-b border-[#4A7B9D]/30 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
          <Box className="w-8 h-8 text-[#FFB347]" />
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFB347]">
            InstaChunk
          </span>
          </Link>
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center gap-2 text-[#A8B8C8] hover:text-[#FFB347] transition-colors font-medium text-sm group"
              >
                <link.icon className="w-4 h-4 text-[#4A7B9D] group-hover:text-[#FFB347]" />
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-[#4A7B9D] rounded-md text-[#4A7B9D] hover:text-[#FFB347] hover:border-[#FFB347] transition-colors">
              <DollarSign className="w-4 h-4" />
              {currency}
            </button>
            <div className="relative group/panel">
              <button className="flex items-center gap-2 px-4 py-2 border border-[#FFB347] rounded-md text-[#FFB347] hover:bg-[#FFB347] hover:text-[#0D1B2A] transition-all">
                <User className="w-4 h-4" />
                CLIENT SPACE
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 top-full pt-2 w-64 opacity-0 invisible group-hover/panel:opacity-100 group-hover/panel:visible transition-all">
                <div className="bg-[#1A2744] border border-[#4A7B9D]/30 rounded-xl p-2 shadow-2xl">
                    <Link to={settings.gamePanelUrl || "#"} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[rgba(255,179,71,0.1)]">
                        <div className="w-8 h-8 rounded bg-[#4A7B9D] flex items-center justify-center text-white">🎮</div>
                        <div>
                            <div className="font-bold text-white">Game Panel</div>
                            <div className="text-xs text-[#A8B8C8]">Manage game servers</div>
                        </div>
                    </Link>
                    <Link to={settings.vpsPanelUrl || "#"} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[rgba(255,179,71,0.1)]">
                        <div className="w-8 h-8 rounded bg-[#9B59B6] flex items-center justify-center text-white">🖥️</div>
                        <div>
                            <div className="font-bold text-white">VPS Panel</div>
                            <div className="text-xs text-[#A8B8C8]">Manage VPS services</div>
                        </div>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow"><Outlet /></main>
    </div>
  );
}
