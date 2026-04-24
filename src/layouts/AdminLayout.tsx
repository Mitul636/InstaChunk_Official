import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Activity,
  BarChart3,
  AlertTriangle,
  ShieldCheck,
  LogOut,
  Box,
  Menu,
  X,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";
import { useAppStore } from "../store";

export default function AdminLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings } = useAppStore();

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Navbar", href: "/admin/navbar", icon: Menu },
    { name: "Plans", href: "/admin/plans", icon: Box },
    { name: "Currency Settings", href: "/admin/currency", icon: BarChart3 },
    { name: "Order Settings", href: "/admin/order-settings", icon: Settings },
    { name: "Free Plans", href: "/admin/free-plans", icon: Zap },
    { name: "User Management", href: "#", icon: Users },
    { name: "Server Health", href: "#", icon: Activity },
    { name: "Alerts", href: "#", icon: AlertTriangle },
    { name: "Security", href: "#", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-navy-dark text-white flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 w-64 bg-navy text-white flex-shrink-0 flex-col border-r border-white/5 z-50 transform transition-transform duration-300 md:transform-none",
          isMobileMenuOpen ? "translate-x-0 flex" : "-translate-x-full md:flex",
        )}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center">
              <Box
                className="w-6 h-6 text-white fill-electric"
                strokeWidth={1.5}
              />
            </div>
            <span className="font-display font-bold tracking-tight text-white uppercase">
              {settings.brandName}
            </span>
          </Link>
          <button
            className="md:hidden text-white hover:text-electric-light transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200",
                location.pathname === item.href
                  ? "bg-electric border border-electric-light text-white shadow-lg shadow-electric/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 bg-navy-dark/50">
          <div className="flex items-center gap-3 px-3 py-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-navy border border-electric/30 flex items-center justify-center font-semibold text-white">
              S
            </div>
            <div>
              <p className="text-sm font-medium text-white">Super Admin</p>
              <p className="text-xs text-electric-light">Root Access</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full text-left">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0 pointer-events-none mix-blend-overlay"></div>
        <header className="h-20 bg-navy/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl md:text-2xl font-display font-semibold text-white">
              Global Administration
            </h1>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8 relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
