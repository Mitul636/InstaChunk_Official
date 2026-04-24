import { useState } from "react";
import { useAppStore, Plan } from "../store";
import { Plus, Edit2, Trash2, Save, X, Settings } from "lucide-react";

export default function AdminPlans() {
  const { plans, services, addPlan, updatePlan, deletePlan, showToast } =
    useAppStore();
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const handleEdit = (plan: Plan) => {
    setEditingPlan({ ...plan });
  };

  const handleCreate = () => {
    setEditingPlan({
      id: Date.now().toString(),
      name: "",
      serviceId: services[0]?.id || "",
      priceINR: 0,
      priceBDT: 0,
      priceUSD: 0,
      features: [""],
      badge: "",
      active: true,
      isPopular: false,
      isFree: false,
      freeSettings: {
        claimMethod: "discord",
        discordLink: "https://discord.gg/",
        discordChannel: "#free-plans",
        discordInstructions: [
          "Join our Discord server",
          "Go to #free-plans channel",
          "Create a ticket",
          'Type "Free"',
          "Wait for staff reply",
        ],
        totalSlots: 10,
        usedSlots: 0,
        showSlots: true,
        originalPriceINR: 199,
        originalPriceBDT: 260,
        originalPriceUSD: 2.49,
        durationDays: 7,
        badgeText: "FREE",
      },
    });
  };

  const handleSave = () => {
    if (!editingPlan) return;
    if (!editingPlan.name) {
      showToast("Name is required", "info");
      return;
    }
    const exists = plans.find((p) => p.id === editingPlan.id);
    if (exists) {
      updatePlan(editingPlan.id, editingPlan);
    } else {
      addPlan(editingPlan);
    }
    setEditingPlan(null);
    showToast("Plan saved successfully");
  };

  const updateFeature = (idx: number, val: string) => {
    if (!editingPlan) return;
    const feats = [...editingPlan.features];
    feats[idx] = val;
    setEditingPlan({ ...editingPlan, features: feats });
  };

  const addFeature = () => {
    if (!editingPlan) return;
    setEditingPlan({ ...editingPlan, features: [...editingPlan.features, ""] });
  };

  const removeFeature = (idx: number) => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.filter((_, i) => i !== idx),
    });
  };

  const updateFreeInstruction = (idx: number, val: string) => {
    if (!editingPlan || !editingPlan.freeSettings) return;
    const inst = [...editingPlan.freeSettings.discordInstructions];
    inst[idx] = val;
    setEditingPlan({
      ...editingPlan,
      freeSettings: { ...editingPlan.freeSettings, discordInstructions: inst },
    });
  };

  const addFreeInstruction = () => {
    if (!editingPlan || !editingPlan.freeSettings) return;
    setEditingPlan({
      ...editingPlan,
      freeSettings: {
        ...editingPlan.freeSettings,
        discordInstructions: [
          ...editingPlan.freeSettings.discordInstructions,
          "",
        ],
      },
    });
  };

  const removeFreeInstruction = (idx: number) => {
    if (!editingPlan || !editingPlan.freeSettings) return;
    setEditingPlan({
      ...editingPlan,
      freeSettings: {
        ...editingPlan.freeSettings,
        discordInstructions:
          editingPlan.freeSettings.discordInstructions.filter(
            (_, i) => i !== idx,
          ),
      },
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      {!editingPlan ? (
        <>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Manage Plans
              </h2>
              <p className="text-gray-400">
                Add, edit or remove pricing plans.
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 bg-electric hover:bg-electric-light text-white font-semibold py-2.5 px-6 rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Plan
            </button>
          </div>

          <div className="bg-navy border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">
                    Name
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">
                    Service
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">
                    Price (USD)
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">
                    Type
                  </th>
                  <th className="px-6 py-4 text-sm text-right font-semibold text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-white">
                      {plan.name}
                      {!plan.active && (
                        <span className="ml-2 text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {services.find((s) => s.id === plan.serviceId)?.name ||
                        "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      ${plan.priceUSD}
                    </td>
                    <td className="px-6 py-4">
                      {plan.isFree ? (
                        <span className="text-xs font-bold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 py-1 px-2.5 rounded-lg">
                          FREE PLAN
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-gray-400 bg-gray-400/10 border border-gray-400/20 py-1 px-2.5 rounded-lg">
                          PAID PLAN
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="p-2 text-electric hover:bg-electric/10 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletePlan(plan.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {plans.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      No plans found. Add one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="bg-navy p-6 md:p-8 rounded-2xl border border-white/10 space-y-8 relative">
          <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <h3 className="text-2xl font-bold text-white">
              {editingPlan.id.length > 5 ? "Edit Plan" : "Add Plan"}
            </h3>
            <button
              onClick={() => setEditingPlan(null)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Plan Name
              </label>
              <input
                type="text"
                value={editingPlan.name}
                onChange={(e) =>
                  setEditingPlan({ ...editingPlan, name: e.target.value })
                }
                className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-electric focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Service Category
              </label>
              <select
                value={editingPlan.serviceId}
                onChange={(e) =>
                  setEditingPlan({ ...editingPlan, serviceId: e.target.value })
                }
                className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-electric focus:outline-none"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Badge (Optional)
              </label>
              <input
                type="text"
                value={editingPlan.badge || ""}
                onChange={(e) =>
                  setEditingPlan({ ...editingPlan, badge: e.target.value })
                }
                className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-electric focus:outline-none"
                placeholder="e.g. Popular, Best Value"
              />
            </div>
            <div className="flex items-center gap-6 pt-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingPlan.active}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, active: e.target.checked })
                  }
                  className="w-5 h-5 rounded bg-navy-dark border-white/10"
                />
                <span className="text-gray-300">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingPlan.isPopular}
                  onChange={(e) =>
                    setEditingPlan({
                      ...editingPlan,
                      isPopular: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded bg-navy-dark border-white/10"
                />
                <span className="text-gray-300">Mark as Popular</span>
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Price (USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={editingPlan.priceUSD}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    priceUSD: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Price (INR)
              </label>
              <input
                type="number"
                value={editingPlan.priceINR}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    priceINR: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Price (BDT)
              </label>
              <input
                type="number"
                value={editingPlan.priceBDT}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    priceBDT: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-400">
                Features
              </label>
              <button
                onClick={addFeature}
                className="text-electric hover:text-electric-light text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {editingPlan.features.map((feat, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => updateFeature(idx, e.target.value)}
                    className="flex-1 bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white"
                    placeholder="e.g. 2GB RAM"
                  />
                  <button
                    onClick={() => removeFeature(idx)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 🎁 FREE PLAN SETTINGS */}
          <div className="border border-[#5865F2]/50 bg-[#122A35] rounded-2xl p-6 md:p-8 space-y-8 mt-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#5865F2]/5 mix-blend-overlay pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                  <span className="text-2xl">🎁</span> FREE PLAN SETTINGS
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Configure this plan as a free promotional plan.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-4 md:mt-0">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={editingPlan.isFree || false}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newSettings =
                      checked && !editingPlan.freeSettings
                        ? {
                            claimMethod: "discord" as const,
                            discordLink: "https://discord.gg/",
                            discordChannel: "#free-plans",
                            discordInstructions: [
                              "Join our Discord server",
                              "Go to #free-plans channel",
                              "Create a ticket",
                              'Type "Free"',
                              "Wait for staff reply",
                            ],
                            totalSlots: 10,
                            usedSlots: 0,
                            showSlots: true,
                            originalPriceINR: editingPlan.priceINR,
                            originalPriceBDT: editingPlan.priceBDT,
                            originalPriceUSD: editingPlan.priceUSD,
                            durationDays: 7,
                            badgeText: "FREE",
                          }
                        : editingPlan.freeSettings;

                    setEditingPlan({
                      ...editingPlan,
                      isFree: checked,
                      freeSettings: newSettings,
                    });
                  }}
                />
                <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#5865F2]"></div>
                <span className="ml-3 text-sm font-medium text-white">
                  Mark as Free Plan
                </span>
              </label>
            </div>

            {editingPlan.isFree && editingPlan.freeSettings && (
              <div className="space-y-8 relative z-10 animate-in slide-in-from-top-4 duration-300">
                {/* Claim Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Claim Method:
                  </label>
                  <div className="flex gap-6">
                    {["discord", "whatsapp", "both"].map((method) => (
                      <label
                        key={method}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="claimMethod"
                          value={method}
                          checked={
                            editingPlan.freeSettings?.claimMethod === method
                          }
                          onChange={(e) =>
                            setEditingPlan({
                              ...editingPlan,
                              freeSettings: {
                                ...editingPlan.freeSettings!,
                                claimMethod: e.target.value as any,
                              },
                            })
                          }
                          className="text-[#5865F2] w-4 h-4 bg-navy focus:ring-[#5865F2] border-white/20"
                        />
                        <span className="text-gray-300 capitalize">
                          {method === "discord"
                            ? "Discord Invite Only"
                            : method === "whatsapp"
                              ? "WhatsApp Only"
                              : "Both"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-lg font-bold text-white mb-4">
                    Discord Settings
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Discord Invite Link
                      </label>
                      <input
                        type="text"
                        value={editingPlan.freeSettings.discordLink}
                        onChange={(e) =>
                          setEditingPlan({
                            ...editingPlan,
                            freeSettings: {
                              ...editingPlan.freeSettings!,
                              discordLink: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2 text-white"
                        placeholder="https://discord.gg/xxxxxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Discord Channel Name
                      </label>
                      <input
                        type="text"
                        value={editingPlan.freeSettings.discordChannel}
                        onChange={(e) =>
                          setEditingPlan({
                            ...editingPlan,
                            freeSettings: {
                              ...editingPlan.freeSettings!,
                              discordChannel: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2 text-white"
                        placeholder="#free-plans"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        hint: "where users make ticket"
                      </p>
                    </div>
                  </div>

                  <div className="bg-navy border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-300">
                        Discord Instructions{" "}
                        <span className="text-gray-500 font-normal">
                          (editable steps shown on frontend)
                        </span>
                      </label>
                    </div>
                    <div className="space-y-3">
                      {editingPlan.freeSettings.discordInstructions.map(
                        (inst, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <span className="text-gray-500 text-sm font-mono whitespace-nowrap">
                              Step {idx + 1}:
                            </span>
                            <input
                              type="text"
                              value={inst}
                              onChange={(e) =>
                                updateFreeInstruction(idx, e.target.value)
                              }
                              className="flex-1 bg-navy-dark border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm"
                            />
                            <button
                              onClick={() => removeFreeInstruction(idx)}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ),
                      )}
                      <button
                        onClick={addFreeInstruction}
                        className="mt-2 text-sm text-[#5865F2] hover:text-white transition-colors flex items-center gap-1 font-medium"
                      >
                        <Plus className="w-4 h-4" /> Add Step
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-lg font-bold text-white mb-4">
                    Slots Settings
                  </h4>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Total Slots
                      </label>
                      <input
                        type="number"
                        value={editingPlan.freeSettings.totalSlots}
                        onChange={(e) =>
                          setEditingPlan({
                            ...editingPlan,
                            freeSettings: {
                              ...editingPlan.freeSettings!,
                              totalSlots: parseInt(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Used Slots
                      </label>
                      <input
                        type="number"
                        value={editingPlan.freeSettings.usedSlots}
                        onChange={(e) =>
                          setEditingPlan({
                            ...editingPlan,
                            freeSettings: {
                              ...editingPlan.freeSettings!,
                              usedSlots: parseInt(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                    <div className="bg-navy border border-white/10 rounded-lg p-4 flex flex-col justify-center">
                      <div className="text-xs text-gray-400 mb-1">
                        Available Slots
                      </div>
                      <div className="text-2xl font-bold text-[#25D366]">
                        {Math.max(
                          0,
                          editingPlan.freeSettings.totalSlots -
                            editingPlan.freeSettings.usedSlots,
                        )}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-1">
                        (auto calculated)
                      </div>
                    </div>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPlan.freeSettings.showSlots}
                      onChange={(e) =>
                        setEditingPlan({
                          ...editingPlan,
                          freeSettings: {
                            ...editingPlan.freeSettings!,
                            showSlots: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 rounded bg-navy-dark border-white/10"
                    />
                    <span className="text-gray-300">
                      Show Slot Counter on frontend
                    </span>
                  </label>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-lg font-bold text-white mb-4">
                    Display & Price Overrides
                  </h4>
                  <div className="bg-navy border border-white/10 rounded-xl p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Original Price (crossed out){" "}
                        <span className="text-gray-500 font-normal ml-2">
                          hint: "shown as strikethrough on card"
                        </span>
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            INR (₹)
                          </label>
                          <input
                            type="number"
                            value={editingPlan.freeSettings.originalPriceINR}
                            onChange={(e) =>
                              setEditingPlan({
                                ...editingPlan,
                                freeSettings: {
                                  ...editingPlan.freeSettings!,
                                  originalPriceINR:
                                    parseInt(e.target.value) || 0,
                                },
                              })
                            }
                            className="w-full bg-navy-dark border border-white/10 rounded-lg px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            BDT (৳)
                          </label>
                          <input
                            type="number"
                            value={editingPlan.freeSettings.originalPriceBDT}
                            onChange={(e) =>
                              setEditingPlan({
                                ...editingPlan,
                                freeSettings: {
                                  ...editingPlan.freeSettings!,
                                  originalPriceBDT:
                                    parseInt(e.target.value) || 0,
                                },
                              })
                            }
                            className="w-full bg-navy-dark border border-white/10 rounded-lg px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            USD ($)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={editingPlan.freeSettings.originalPriceUSD}
                            onChange={(e) =>
                              setEditingPlan({
                                ...editingPlan,
                                freeSettings: {
                                  ...editingPlan.freeSettings!,
                                  originalPriceUSD:
                                    parseFloat(e.target.value) || 0,
                                },
                              })
                            }
                            className="w-full bg-navy-dark border border-white/10 rounded-lg px-3 py-2 text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Free Plan Duration (days)
                        </label>
                        <input
                          type="number"
                          value={editingPlan.freeSettings.durationDays}
                          onChange={(e) =>
                            setEditingPlan({
                              ...editingPlan,
                              freeSettings: {
                                ...editingPlan.freeSettings!,
                                durationDays: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                          className="w-full bg-navy-dark border border-white/10 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Free Plan Badge Text
                        </label>
                        <input
                          type="text"
                          value={editingPlan.freeSettings.badgeText}
                          onChange={(e) =>
                            setEditingPlan({
                              ...editingPlan,
                              freeSettings: {
                                ...editingPlan.freeSettings!,
                                badgeText: e.target.value,
                              },
                            })
                          }
                          className="w-full bg-navy-dark border border-white/10 rounded-lg px-3 py-2 text-white"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          ← shown on card top right
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-electric hover:bg-electric-light text-white font-bold py-3 px-10 rounded-xl shadow-[0_0_20px_rgba(0,82,255,0.4)] transition-all hover:scale-[1.02]"
            >
              <Save className="w-5 h-5" />
              Save Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
