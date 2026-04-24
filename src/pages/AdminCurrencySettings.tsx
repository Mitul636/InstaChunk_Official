import { useState } from "react";
import { useAppStore, Currency, Plan } from "../store";
import { Save, RefreshCw } from "lucide-react";

export default function AdminCurrencySettings() {
  const { settings, updateSettings, plans, updatePlan } = useAppStore();

  const [rateBDT, setRateBDT] = useState<number>(settings.rateINRtoBDT);
  const [rateUSD, setRateUSD] = useState<number>(settings.rateINRtoUSD);
  const [defaultCurrency, setDefaultCurrency] = useState<Currency>(
    settings.defaultCurrency,
  );
  const [showCurrencyToggle, setShowCurrencyToggle] = useState<boolean>(
    settings.showCurrencyToggle,
  );
  const [autoDetectCurrency, setAutoDetectCurrency] = useState<boolean>(
    settings.autoDetectCurrency,
  );
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleString(),
  );

  const handleSaveRates = () => {
    updateSettings({
      rateINRtoBDT: rateBDT,
      rateINRtoUSD: rateUSD,
    });
    setLastUpdated(new Date().toLocaleString());
  };

  const handleSaveDisplaySettings = () => {
    updateSettings({
      defaultCurrency,
      showCurrencyToggle,
      autoDetectCurrency,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Currency Settings
        </h2>
        <p className="text-gray-400">
          Manage exchange rates, default currencies, and plan prices.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Exchange Rates Box */}
        <div className="bg-navy p-6 rounded-2xl shadow-sm border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Exchange Rates</h3>
            <span className="text-xs text-gray-500">
              Last updated: {lastUpdated}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-300 font-medium w-24">1 INR =</span>
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.01"
                  value={rateBDT}
                  onChange={(e) => setRateBDT(parseFloat(e.target.value))}
                  className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric"
                />
                <span className="absolute right-4 top-2 text-gray-500">
                  BDT
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-300 font-medium w-24">1 INR =</span>
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.001"
                  value={rateUSD}
                  onChange={(e) => setRateUSD(parseFloat(e.target.value))}
                  className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric"
                />
                <span className="absolute right-4 top-2 text-gray-500">
                  USD
                </span>
              </div>
            </div>

            <button
              onClick={handleSaveRates}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-electric hover:bg-electric-light text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Update Rates
            </button>
          </div>
        </div>

        {/* Display Settings Box */}
        <div className="bg-navy p-6 rounded-2xl shadow-sm border border-white/10">
          <h3 className="text-lg font-bold text-white mb-6">
            Display Settings
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Default Currency
              </label>
              <select
                value={defaultCurrency}
                onChange={(e) => setDefaultCurrency(e.target.value as Currency)}
                className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric"
              >
                <option value="INR">INR (₹)</option>
                <option value="BDT">BDT (৳)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Show Currency Toggle</h4>
                <p className="text-xs text-gray-500">
                  Display currency switcher in navbar
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showCurrencyToggle}
                  onChange={(e) => setShowCurrencyToggle(e.target.checked)}
                />
                <div className="w-11 h-6 bg-navy-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric border border-white/10"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  Auto-Detect Geolocation
                </h4>
                <p className="text-xs text-gray-500">
                  Detect currency by user IP on first visit
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={autoDetectCurrency}
                  onChange={(e) => setAutoDetectCurrency(e.target.checked)}
                />
                <div className="w-11 h-6 bg-navy-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric border border-white/10"></div>
              </label>
            </div>

            <button
              onClick={handleSaveDisplaySettings}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl transition-colors border border-white/10"
            >
              <Save className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Plan Currency Config Box */}
      <div className="bg-navy p-6 rounded-2xl shadow-sm border border-white/10 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-6">
          Plan Pricing Configuration
        </h3>

        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-4 px-4 text-sm font-semibold text-gray-400">
                  Plan Name
                </th>
                <th className="pb-4 px-4 text-sm font-semibold text-gray-400">
                  Price INR (₹)
                </th>
                <th className="pb-4 px-4 text-sm font-semibold text-gray-400">
                  Price BDT (৳)
                </th>
                <th className="pb-4 px-4 text-sm font-semibold text-gray-400">
                  Price USD ($)
                </th>
                <th className="pb-4 px-4 text-sm font-semibold text-gray-400 text-center">
                  Auto Convert
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {plans.map((plan) => (
                <PlanCurrencyRow
                  key={plan.id}
                  plan={plan}
                  rateBDT={rateBDT}
                  rateUSD={rateUSD}
                  onUpdate={(id, updates) => updatePlan(id, updates)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PlanCurrencyRow({
  plan,
  rateBDT,
  rateUSD,
  onUpdate,
}: {
  key?: string | number;
  plan: Plan;
  rateBDT: number;
  rateUSD: number;
  onUpdate: (id: string, updates: any) => void;
}) {
  const [inr, setInr] = useState(plan.priceINR);
  const [bdt, setBdt] = useState(plan.priceBDT);
  const [usd, setUsd] = useState(plan.priceUSD);
  const [autoConvert, setAutoConvert] = useState(false);

  const handleInrChange = (val: number) => {
    setInr(val);
    let newBdt = bdt;
    let newUsd = usd;

    if (autoConvert) {
      newBdt = Math.round(val * rateBDT);
      newUsd = parseFloat((val * rateUSD).toFixed(2));
      setBdt(newBdt);
      setUsd(newUsd);
    }

    onUpdate(plan.id, { priceINR: val, priceBDT: newBdt, priceUSD: newUsd });
  };

  const handleBdtChange = (val: number) => {
    setBdt(val);
    onUpdate(plan.id, { priceBDT: val });
  };

  const handleUsdChange = (val: number) => {
    setUsd(val);
    onUpdate(plan.id, { priceUSD: val });
  };

  const toggleAutoConvert = () => {
    const nextConvert = !autoConvert;
    setAutoConvert(nextConvert);
    if (nextConvert) {
      const newBdt = Math.round(inr * rateBDT);
      const newUsd = parseFloat((inr * rateUSD).toFixed(2));
      setBdt(newBdt);
      setUsd(newUsd);
      onUpdate(plan.id, { priceBDT: newBdt, priceUSD: newUsd });
    }
  };

  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="py-4 px-4 font-medium text-white">{plan.name}</td>
      <td className="py-4 px-4">
        <input
          type="number"
          value={inr}
          onChange={(e) => handleInrChange(parseFloat(e.target.value) || 0)}
          className="w-24 bg-navy-dark border border-white/10 rounded px-3 py-1.5 text-white focus:outline-none focus:border-electric"
        />
      </td>
      <td className="py-4 px-4">
        <input
          type="number"
          value={bdt}
          onChange={(e) => handleBdtChange(parseFloat(e.target.value) || 0)}
          disabled={autoConvert}
          className={`w-24 border border-white/10 rounded px-3 py-1.5 text-white focus:outline-none focus:border-electric ${autoConvert ? "bg-navy-dark/50 opacity-60" : "bg-navy-dark"}`}
        />
      </td>
      <td className="py-4 px-4">
        <input
          type="number"
          step="0.01"
          value={usd}
          onChange={(e) => handleUsdChange(parseFloat(e.target.value) || 0)}
          disabled={autoConvert}
          className={`w-24 border border-white/10 rounded px-3 py-1.5 text-white focus:outline-none focus:border-electric ${autoConvert ? "bg-navy-dark/50 opacity-60" : "bg-navy-dark"}`}
        />
      </td>
      <td className="py-4 px-4 text-center">
        <button
          onClick={toggleAutoConvert}
          className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${autoConvert ? "bg-electric/20 text-electric border-electric/30" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"}`}
        >
          {autoConvert ? "Auto ON" : "Auto OFF"}
        </button>
      </td>
    </tr>
  );
}
