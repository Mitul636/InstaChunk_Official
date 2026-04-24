import { useState } from "react";
import { useAppStore } from "../store";
import { Save, Plus, Trash2 } from "lucide-react";

export default function AdminFreePlans() {
  const { settings, updateSettings, showToast } = useAppStore();
  const [freePlans, setFreePlans] = useState(settings.freePlans);

  const handleSave = () => {
    updateSettings({ freePlans });
    showToast("Free plan settings saved", "success");
  };

  const addRule = () => {
    setFreePlans((prev) => ({ ...prev, rules: [...prev.rules, "New rule"] }));
  };

  const removeRule = (idx: number) => {
    setFreePlans((prev) => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== idx),
    }));
  };

  const updateRule = (idx: number, val: string) => {
    const newRules = [...freePlans.rules];
    newRules[idx] = val;
    setFreePlans((prev) => ({ ...prev, rules: newRules }));
  };

  const addFeature = (type: "minecraft" | "vps") => {
    setFreePlans((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        features: [
          ...prev[type].features,
          { included: true, text: "New Feature" },
        ],
      },
    }));
  };

  const removeFeature = (type: "minecraft" | "vps", idx: number) => {
    setFreePlans((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        features: prev[type].features.filter((_, i) => i !== idx),
      },
    }));
  };

  const updateFeature = (
    type: "minecraft" | "vps",
    idx: number,
    key: "included" | "text",
    val: any,
  ) => {
    const newFeatures = [...freePlans[type].features];
    newFeatures[idx] = { ...newFeatures[idx], [key]: val };
    setFreePlans((prev) => ({
      ...prev,
      [type]: { ...prev[type], features: newFeatures },
    }));
  };

  const renderPlanSettings = (type: "minecraft" | "vps", title: string) => {
    const data = freePlans[type];
    return (
      <div className="bg-navy p-6 rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-xl font-bold text-white">{title} Settings</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={data.active}
              onChange={(e) =>
                setFreePlans((prev) => ({
                  ...prev,
                  [type]: { ...prev[type], active: e.target.checked },
                }))
              }
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric"></div>
            <span className="ml-3 text-sm font-medium text-gray-400">
              Active
            </span>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Total Slots
            </label>
            <input
              type="number"
              value={data.totalSlots}
              onChange={(e) =>
                setFreePlans((prev) => ({
                  ...prev,
                  [type]: {
                    ...prev[type],
                    totalSlots: parseInt(e.target.value) || 0,
                  },
                }))
              }
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Used Slots
            </label>
            <input
              type="number"
              value={data.usedSlots}
              onChange={(e) =>
                setFreePlans((prev) => ({
                  ...prev,
                  [type]: {
                    ...prev[type],
                    usedSlots: parseInt(e.target.value) || 0,
                  },
                }))
              }
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Normal Cost (INR)
            </label>
            <input
              type="number"
              value={data.normallyCostsINR}
              onChange={(e) =>
                setFreePlans((prev) => ({
                  ...prev,
                  [type]: {
                    ...prev[type],
                    normallyCostsINR: parseInt(e.target.value) || 0,
                  },
                }))
              }
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Discord Channel
            </label>
            <input
              type="text"
              value={data.claimChannel}
              onChange={(e) =>
                setFreePlans((prev) => ({
                  ...prev,
                  [type]: { ...prev[type], claimChannel: e.target.value },
                }))
              }
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Discord Invite Link
            </label>
            <input
              type="text"
              value={data.discordLink}
              onChange={(e) =>
                setFreePlans((prev) => ({
                  ...prev,
                  [type]: { ...prev[type], discordLink: e.target.value },
                }))
              }
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-400">
              Features
            </label>
            <button
              onClick={() => addFeature(type)}
              className="text-electric hover:text-electric-light text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Feature
            </button>
          </div>
          <div className="space-y-2">
            {data.features.map((feature, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={feature.included}
                  onChange={(e) =>
                    updateFeature(type, idx, "included", e.target.checked)
                  }
                  className="w-5 h-5 rounded border-gray-600 bg-navy-dark"
                />
                <input
                  type="text"
                  value={feature.text}
                  onChange={(e) =>
                    updateFeature(type, idx, "text", e.target.value)
                  }
                  className="flex-1 bg-navy-dark border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm"
                />
                <button
                  onClick={() => removeFeature(type, idx)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Free Plans Settings
          </h2>
          <p className="text-gray-400">
            Configure your promotional free plans.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-electric hover:bg-electric-light text-white font-semibold py-2.5 px-6 rounded-xl transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="bg-navy p-6 rounded-2xl border border-white/10 space-y-6">
        <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">
          General Settings
        </h3>
        <div className="flex items-center justify-between">
          <label className="text-md font-medium text-gray-300">
            Show Free Plans Page
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={freePlans.showPage}
              onChange={(e) =>
                setFreePlans((prev) => ({
                  ...prev,
                  showPage: e.target.checked,
                }))
              }
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric"></div>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Page Title
            </label>
            <input
              type="text"
              value={freePlans.pageTitle}
              onChange={(e) =>
                setFreePlans((prev) => ({ ...prev, pageTitle: e.target.value }))
              }
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Upgrade Banner Text
            </label>
            <input
              type="text"
              value={freePlans.upgradeBannerText}
              onChange={(e) =>
                setFreePlans((prev) => ({
                  ...prev,
                  upgradeBannerText: e.target.value,
                }))
              }
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Page Description
            </label>
            <textarea
              value={freePlans.pageDescription}
              onChange={(e) =>
                setFreePlans((prev) => ({
                  ...prev,
                  pageDescription: e.target.value,
                }))
              }
              rows={2}
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Warning Message (orange box)
            </label>
            <input
              type="text"
              value={freePlans.warningMessage}
              onChange={(e) =>
                setFreePlans((prev) => ({
                  ...prev,
                  warningMessage: e.target.value,
                }))
              }
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-400">
              Rules
            </label>
            <button
              onClick={addRule}
              className="text-electric hover:text-electric-light text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Rule
            </button>
          </div>
          <div className="space-y-3">
            {freePlans.rules.map((rule, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => updateRule(idx, e.target.value)}
                  className="flex-1 bg-navy-dark border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                />
                <button
                  onClick={() => removeRule(idx)}
                  className="text-red-400 hover:text-red-300 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {renderPlanSettings("minecraft", "Minecraft")}
      {renderPlanSettings("vps", "VPS")}
    </div>
  );
}
