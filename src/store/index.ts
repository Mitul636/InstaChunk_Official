import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = "INR" | "BDT" | "USD";

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  iconName: string; // Storing lucide icon name
  visible: boolean;
}

export interface Plan {
  id: string;
  name: string;
  serviceId: string;
  priceINR: number;
  priceBDT: number;
  priceUSD: number;
  features: string[];
  badge: string; // 'Popular', 'New', 'Hot', or empty
  active: boolean;
  isPopular?: boolean;
  isFree?: boolean;
  freeSettings?: {
    claimMethod: "discord" | "whatsapp" | "both";
    discordLink: string;
    discordChannel: string;
    discordInstructions: string[];
    totalSlots: number;
    usedSlots: number;
    showSlots: boolean;
    originalPriceINR: number;
    originalPriceBDT: number;
    originalPriceUSD: number;
    durationDays: number;
    badgeText: string;
  };
}

export interface NavDropdownItem {
  id: string;
  name: string;
  iconOrFlag: string;
  url: string;
  active: boolean;
  order: number;
}

export interface NavDropdown {
  id: string;
  name: string;
  showInNavbar: boolean;
  description: string;
  viewAllLink: string;
  items: NavDropdownItem[];
}

export interface SiteSettings {
  adminEmail: string;
  adminPass: string;
  brandName: string;
  discordLink: string;
  panelUrl: string;
  gamePanelUrl: string;
  vpsPanelUrl: string;
  contactEmail: string;
  exchangeRateManual: boolean;
  rateINRtoBDT: number;
  rateINRtoUSD: number;
  defaultCurrency: Currency;
  showCurrencyToggle: boolean;
  autoDetectCurrency: boolean;
  orderMethod: "discord" | "whatsapp" | "both";
  orderDiscordChannel: string;
  orderWhatsappNumber: string;
  orderInstructions: string;
  orderButtonText: string;
  orderButtonColor: string;
  navbarDropdowns?: NavDropdown[];
  freePlans: {
    minecraft: {
      active: boolean;
      totalSlots: number;
      usedSlots: number;
      ram: string;
      cpu: string;
      storage: string;
      durationDays: number;
      features: { included: boolean; text: string }[];
      normallyCostsINR: number;
      claimChannel: string;
      discordLink: string;
    };
    vps: {
      active: boolean;
      totalSlots: number;
      usedSlots: number;
      ram: string;
      cpu: string;
      storage: string;
      durationDays: number;
      features: { included: boolean; text: string }[];
      normallyCostsINR: number;
      claimChannel: string;
      discordLink: string;
    };
    pageTitle: string;
    pageDescription: string;
    warningMessage: string;
    rules: string[];
    upgradeBannerText: string;
    showPage: boolean;
  };
}

interface ToastInfo {
  message: string;
  type: "success" | "info";
}

interface AppState {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  currencyInitialized: boolean;
  setCurrencyInitialized: (val: boolean) => void;

  toast: ToastInfo | null;
  showToast: (message: string, type?: "success" | "info") => void;
  hideToast: () => void;

  orderModalOpen: boolean;
  setOrderModalOpen: (open: boolean) => void;
  selectedPlanForOrder: Plan | null;
  setSelectedPlanForOrder: (plan: Plan | null) => void;

  services: ServiceCategory[];
  plans: Plan[];
  settings: SiteSettings;

  initialize: () => Promise<void>;
  
  addService: (s: ServiceCategory) => Promise<void>;
  updateService: (id: string, s: Partial<ServiceCategory>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  addPlan: (p: Plan) => Promise<void>;
  updatePlan: (id: string, p: Partial<Plan>) => Promise<void>;
  deletePlan: (id: string) => Promise<void>;

  updateSettings: (s: Partial<SiteSettings>) => Promise<void>;

  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const defaultServices: ServiceCategory[] = [
  {
    id: "1",
    name: "KVM VPS",
    description: "Dedicated resources for high performance.",
    iconName: "Server",
    visible: true,
  },
  {
    id: "2",
    name: "Minecraft",
    description: "Premium nodes for lag-free gaming.",
    iconName: "Box",
    visible: true,
  },
  {
    id: "3",
    name: "OVH",
    description: "Unmatched DDoS protection and routing.",
    iconName: "ShieldAlert",
    visible: true,
  },
  {
    id: "4",
    name: "VPS",
    description: "Affordable virtual instances to build on.",
    iconName: "Server",
    visible: true,
  },
  {
    id: "5",
    name: "RDP",
    description: "High-speed remote desktops globally.",
    iconName: "LinkIcon",
    visible: true,
  },
  {
    id: "6",
    name: "Bot Hosting",
    description: "Keep your Discord bots online 24/7.",
    iconName: "Lock",
    visible: true,
  },
];

const defaultPlans: Plan[] = [
  {
    id: "1",
    name: "Starter Web",
    serviceId: "4",
    priceINR: 199,
    priceBDT: 265,
    priceUSD: 2.39,
    features: [
      "10GB NVMe SSD Storage",
      "Unmetered Bandwidth",
      "Free Let's Encrypt SSL",
      "Standard Priority Support",
    ],
    badge: "",
    active: true,
    isPopular: false,
  },
  {
    id: "2",
    name: "Minecraft Premium",
    serviceId: "2",
    priceINR: 799,
    priceBDT: 1065,
    priceUSD: 9.59,
    features: [
      "8GB Dedicated RAM",
      "Ryzen 9 5950X / i9-9900K",
      "Automated Off-site Backups",
      "Premium DDoS Mitigation",
    ],
    badge: "Popular",
    active: true,
    isPopular: true,
  },
  {
    id: "3",
    name: "VPS Performance",
    serviceId: "1",
    priceINR: 1499,
    priceBDT: 1999,
    priceUSD: 17.99,
    features: [
      "4 vCPU Cores",
      "16GB ECC RAM",
      "100GB NVMe Storage",
      "1 Gbit/s Port Speed",
    ],
    badge: "",
    active: true,
    isPopular: false,
  },
];

const defaultSettings: SiteSettings = {
  adminEmail: "adminpannel199@gmail.com",
  adminPass: "PONCUNA10",
  brandName: "InstaChunk",
  discordLink: "https://discord.gg/instachunk",
  panelUrl: "https://panel.instachunk.com",
  contactEmail: "support@instachunk.com",
  exchangeRateManual: true,
  rateINRtoBDT: 1.33,
  rateINRtoUSD: 0.012,
  defaultCurrency: "INR",
  showCurrencyToggle: true,
  autoDetectCurrency: true,
  orderMethod: "both",
  orderDiscordChannel: "#orders",
  orderWhatsappNumber: "+1234567890",
  orderInstructions:
    "Step 1: Join our Discord\nStep 2: Go to #orders channel\nStep 3: Create a ticket\nStep 4: Paste your order info",
  orderButtonText: "Order Now 🚀",
  orderButtonColor: "#E8420A",
  navbarDropdowns: [
    {
      id: "minecraft",
      name: "Minecraft",
      showInNavbar: true,
      description: "Choose your perfect plan",
      viewAllLink: "/services/minecraft",
      items: [
        {
          id: "mc_in",
          name: "India MC",
          iconOrFlag: "🇮🇳",
          url: "/services/minecraft#in",
          active: true,
          order: 1,
        },
        {
          id: "mc_sg",
          name: "Singapore MC",
          iconOrFlag: "🇸🇬",
          url: "/services/minecraft#sg",
          active: true,
          order: 2,
        },
      ],
    },
    {
      id: "kvm",
      name: "KVM",
      showInNavbar: true,
      description: "Choose your perfect plan",
      viewAllLink: "/services/kvm",
      items: [
        {
          id: "kvm_in",
          name: "India KVM",
          iconOrFlag: "🇮🇳",
          url: "/services/kvm#in",
          active: true,
          order: 1,
        },
        {
          id: "kvm_sg",
          name: "Singapore KVM",
          iconOrFlag: "🇸🇬",
          url: "/services/kvm#sg",
          active: true,
          order: 2,
        },
      ],
    },
    {
      id: "rdp",
      name: "RDP",
      showInNavbar: true,
      description: "Choose your perfect plan",
      viewAllLink: "/services/rdp",
      items: [
        {
          id: "rdp_in",
          name: "India RDP",
          iconOrFlag: "🇮🇳",
          url: "/services/rdp#in",
          active: true,
          order: 1,
        },
        {
          id: "rdp_us",
          name: "USA RDP",
          iconOrFlag: "🇺🇸",
          url: "/services/rdp#us",
          active: true,
          order: 2,
        },
      ],
    },
    {
      id: "web",
      name: "Web",
      showInNavbar: true,
      description: "Choose your perfect plan",
      viewAllLink: "/shared-hosting",
      items: [
        {
          id: "web_starter",
          name: "Starter Web",
          iconOrFlag: "🌱",
          url: "/shared-hosting#starter",
          active: true,
          order: 1,
        },
        {
          id: "web_pro",
          name: "Pro Web",
          iconOrFlag: "🚀",
          url: "/shared-hosting#pro",
          active: true,
          order: 2,
        },
      ],
    },
  ],
  freePlans: {
    minecraft: {
      active: true,
      totalSlots: 10,
      usedSlots: 4,
      ram: "2GB",
      cpu: "1 vCPU",
      storage: "10GB NVMe SSD",
      durationDays: 7,
      features: [
        { included: true, text: "2GB RAM" },
        { included: true, text: "1 vCPU" },
        { included: true, text: "10GB NVMe SSD" },
        { included: true, text: "1 Server Allocation" },
        { included: true, text: "Basic DDoS Protection" },
        { included: true, text: "7 Days Duration" },
        { included: false, text: "No Backups" },
        { included: false, text: "No Custom Domain" },
        { included: false, text: "Limited Support" },
      ],
      normallyCostsINR: 199,
      claimChannel: "#free-plans",
      discordLink: "https://discord.gg/",
    },
    vps: {
      active: true,
      totalSlots: 10,
      usedSlots: 10,
      ram: "1GB",
      cpu: "1 vCPU",
      storage: "15GB NVMe SSD",
      durationDays: 7,
      features: [
        { included: true, text: "1GB RAM" },
        { included: true, text: "1 vCPU" },
        { included: true, text: "15GB NVMe SSD" },
        { included: true, text: "Shared IPv4" },
        { included: true, text: "Basic DDoS Protection" },
        { included: true, text: "7 Days Duration" },
        { included: false, text: "No Root Access" },
        { included: false, text: "No Backups" },
        { included: false, text: "Limited Support" },
      ],
      normallyCostsINR: 299,
      claimChannel: "#free-plans",
      discordLink: "https://discord.gg/",
    },
    pageTitle: "Get FREE Hosting 🐯",
    pageDescription:
      "Join our Discord and claim your free Minecraft or VPS plan today!",
    warningMessage: "Free plans are limited! First come, first served basis.",
    rules: [
      "One free plan per Discord account",
      "Free plans last 7 days only",
      "No extensions or renewals",
      "Abuse = immediate termination",
      "Must stay in Discord server",
      "Upgrade anytime to paid plan",
      "Staff decision is final",
    ],
    upgradeBannerText: "Want more power? Upgrade to Premium! 🚀",
    showPage: true,
  },
};

export const useAppStore = create<AppState>((set, get) => ({
  currency: "INR",
  setCurrency: (c) => set({ currency: c }),
  currencyInitialized: false,
  setCurrencyInitialized: (val) => set({ currencyInitialized: val }),

  toast: null,
  showToast: (message, type = "success") =>
    set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),

  orderModalOpen: false,
  setOrderModalOpen: (open) => set({ orderModalOpen: open }),
  selectedPlanForOrder: null,
  setSelectedPlanForOrder: (plan) => set({ selectedPlanForOrder: plan }),

  services: [],
  plans: [],
  settings: defaultSettings,

  initialize: async () => {
    try {
      const res = await fetch('/api/data');
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (data.services && data.services.length > 0) set({ services: data.services });
      else set({ services: defaultServices });

      if (data.plans && data.plans.length > 0) set({ plans: data.plans });
      else set({ plans: defaultPlans });

      if (data.settings && Object.keys(data.settings).length > 0) {
          set({ settings: { ...defaultSettings, ...data.settings } });
      } else {
          set({ settings: defaultSettings });
      }
    } catch (e) {
      console.error("Failed to initialize data from DB, using defaults", e);
      set({ services: defaultServices, plans: defaultPlans, settings: defaultSettings });
    }
  },

  addService: async (s) => {
    const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'service', action: 'add', payload: s })
    });
    if (res.ok) {
        const newS = await res.json();
        set((state) => ({ services: [...state.services, newS] }));
    }
  },
  updateService: async (id, newS) => {
    const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'service', action: 'update', payload: { ...newS, id } })
    });
    if (res.ok) {
        set((state) => ({
            services: state.services.map((s) =>
                s.id === id ? { ...s, ...newS } : s,
            ),
        }));
    }
  },
  deleteService: async (id) => {
    const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'service', action: 'delete', payload: { id } })
    });
    if (res.ok) {
        set((state) => ({
            services: state.services.filter((s) => s.id !== id),
        }));
    }
  },

  addPlan: async (p) => {
      const res = await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'plan', action: 'add', payload: p })
      });
      if (res.ok) {
          const newP = await res.json();
          set((state) => ({ plans: [...state.plans, newP] }));
      }
  },
  updatePlan: async (id, newP) => {
    const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'plan', action: 'update', payload: { ...newP, id } })
    });
    if (res.ok) {
        set((state) => ({
            plans: state.plans.map((p) => (p.id === id ? { ...p, ...newP } : p)),
        }));
    }
  },
  deletePlan: async (id) => {
    const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'plan', action: 'delete', payload: { id } })
    });
    if (res.ok) {
        set((state) => ({ plans: state.plans.filter((p) => p.id !== id) }));
    }
  },

  updateSettings: async (newS) => {
      const currentSettings = get().settings;
      const updated = { ...currentSettings, ...newS };
      const res = await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'settings', payload: updated })
      });
      if (res.ok) {
          set({ settings: updated });
      }
  },

  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));
