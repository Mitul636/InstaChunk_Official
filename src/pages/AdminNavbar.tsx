import { useState } from "react";
import { useAppStore, NavDropdown, NavDropdownItem } from "../store";
import {
  Plus,
  GripVertical,
  Settings2,
  Check,
  X,
  ShieldAlert,
  Edit2,
  Trash2,
  LinkIcon,
  Flag,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AdminNavbar() {
  const { settings, updateSettings, showToast } = useAppStore();
  const dropdowns = settings.navbarDropdowns || [];

  const [editingDropdownKey, setEditingDropdownKey] = useState<string | null>(
    null,
  );

  const toggleDropdownVisibility = (id: string) => {
    const newDropdowns = dropdowns.map((d) =>
      d.id === id ? { ...d, showInNavbar: !d.showInNavbar } : d,
    );
    updateSettings({ navbarDropdowns: newDropdowns });
    showToast("Navbar updated", "success");
  };

  const updateDropdownFields = (id: string, updates: Partial<NavDropdown>) => {
    const newDropdowns = dropdowns.map((d) =>
      d.id === id ? { ...d, ...updates } : d,
    );
    updateSettings({ navbarDropdowns: newDropdowns });
  };

  const addItemToDropdown = (dropdownId: string) => {
    const dropdown = dropdowns.find((d) => d.id === dropdownId);
    if (!dropdown) return;

    const newItem: NavDropdownItem = {
      id: `item_${Date.now()}`,
      name: "New Item",
      iconOrFlag: "🇮🇳",
      url: "#",
      active: true,
      order: dropdown.items.length + 1,
    };

    updateDropdownFields(dropdownId, { items: [...dropdown.items, newItem] });
    showToast("Item added", "success");
  };

  const updateItem = (
    dropdownId: string,
    itemId: string,
    updates: Partial<NavDropdownItem>,
  ) => {
    const dropdown = dropdowns.find((d) => d.id === dropdownId);
    if (!dropdown) return;

    const newItems = dropdown.items.map((i) =>
      i.id === itemId ? { ...i, ...updates } : i,
    );
    updateDropdownFields(dropdownId, { items: newItems });
  };

  const removeItem = (dropdownId: string, itemId: string) => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    const dropdown = dropdowns.find((d) => d.id === dropdownId);
    if (!dropdown) return;

    const newItems = dropdown.items.filter((i) => i.id !== itemId);
    updateDropdownFields(dropdownId, { items: newItems });
    showToast("Item removed", "info");
  };

  const moveItem = (
    dropdownId: string,
    index: number,
    direction: "up" | "down",
  ) => {
    const dropdown = dropdowns.find((d) => d.id === dropdownId);
    if (!dropdown) return;

    const items = [...dropdown.items];
    if (direction === "up" && index > 0) {
      const temp = items[index];
      items[index] = items[index - 1];
      items[index - 1] = temp;
    } else if (direction === "down" && index < items.length - 1) {
      const temp = items[index];
      items[index] = items[index + 1];
      items[index + 1] = temp;
    }

    updateDropdownFields(dropdownId, { items });
  };

  const addNewDropdown = () => {
    const id = prompt("Enter a unique ID for this dropdown (e.g., 'minecraft'):");
    if (!id) return;
    if (dropdowns.find(d => d.id === id)) {
      alert("ID already exists!");
      return;
    }

    const newDropdown: NavDropdown = {
      id,
      name: "New Category",
      showInNavbar: true,
      description: "Choose your perfect plan",
      viewAllLink: "#",
      items: [],
    };

    updateSettings({ navbarDropdowns: [...dropdowns, newDropdown] });
    showToast("Dropdown category added", "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Navbar Dropdowns
          </h2>
          <p className="text-gray-400">
            Configure the service menus shown in your main navigation bar.
          </p>
        </div>
        <button
          onClick={addNewDropdown}
          className="bg-electric/10 hover:bg-electric/20 text-electric border border-electric/30 px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-medium"
        >
          <Plus className="w-5 h-5" /> Add Dropdown
        </button>
      </div>

      <div className="grid gap-6">
        {dropdowns.map((dropdown) => (
          <div
            key={dropdown.id}
            className={`bg-navy border ${editingDropdownKey === dropdown.id ? 'border-electric/50 shadow-[0_0_20px_rgba(0,180,216,0.15)]' : 'border-white/10'} rounded-2xl overflow-hidden transition-all`}
          >
            <div className="bg-white/5 p-5 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${dropdown.showInNavbar ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-600'}`} />
                  <h3 className="text-xl font-bold text-white">
                    {dropdown.name}
                  </h3>
                </div>
                
                <div className="h-6 w-px bg-white/10 hidden md:block" />

                <button 
                  onClick={() => toggleDropdownVisibility(dropdown.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${dropdown.showInNavbar ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-gray-400 border border-white/10'}`}
                >
                  {dropdown.showInNavbar ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {dropdown.showInNavbar ? 'VISIBLE' : 'HIDDEN'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setEditingDropdownKey(
                      editingDropdownKey === dropdown.id ? null : dropdown.id,
                    )
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${editingDropdownKey === dropdown.id ? 'bg-electric text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
                >
                  {editingDropdownKey === dropdown.id ? (
                    <>
                      <Check className="w-4 h-4" /> Done
                    </>
                  ) : (
                    <>
                      <Settings2 className="w-4 h-4" /> Configure
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete the entire "${dropdown.name}" dropdown?`)) {
                      updateSettings({ navbarDropdowns: dropdowns.filter(d => d.id !== dropdown.id) });
                      showToast("Dropdown deleted", "info");
                    }
                  }}
                  className="p-2.5 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {editingDropdownKey === dropdown.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-8 border-b border-white/5 space-y-6 bg-black/20">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-300">
                          Navbar Label
                        </label>
                        <input
                          type="text"
                          value={dropdown.name}
                          onChange={(e) =>
                            updateDropdownFields(dropdown.id, {
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g. Minecraft"
                          className="w-full bg-navy-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-electric transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-300">
                          Subtitle / Description
                        </label>
                        <input
                          type="text"
                          value={dropdown.description}
                          onChange={(e) =>
                            updateDropdownFields(dropdown.id, {
                              description: e.target.value,
                            })
                          }
                          placeholder="e.g. Choose your perfect plan"
                          className="w-full bg-navy-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-electric transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-300">
                          "View All" Link
                        </label>
                        <input
                          type="text"
                          value={dropdown.viewAllLink}
                          onChange={(e) =>
                            updateDropdownFields(dropdown.id, {
                              viewAllLink: e.target.value,
                            })
                          }
                          placeholder="e.g. /services/minecraft"
                          className="w-full bg-navy-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-electric transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white">
                          Dropdown Items
                        </h4>
                        <span className="bg-white/5 text-gray-400 text-[10px] px-2 py-0.5 rounded-full border border-white/5">
                          {dropdown.items.length} TOTAL
                        </span>
                      </div>
                      <button
                        onClick={() => addItemToDropdown(dropdown.id)}
                        className="text-sm bg-electric text-white px-4 py-2 rounded-xl hover:bg-electric-light transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,180,216,0.3)]"
                      >
                        <Plus className="w-4 h-4" /> Add New Item
                      </button>
                    </div>

                    <div className="space-y-4">
                      {dropdown.items.length === 0 ? (
                        <div className="text-sm text-gray-500 text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
                          No items found for this category.
                        </div>
                      ) : (
                        dropdown.items.map((item, index) => (
                          <div
                            key={item.id}
                            className={`flex flex-col lg:flex-row lg:items-center gap-4 bg-navy-dark/50 border ${item.active ? 'border-white/10' : 'border-red-500/20 opacity-60'} p-4 rounded-2xl transition-all hover:bg-navy-dark`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col gap-1">
                                <button
                                  onClick={() => moveItem(dropdown.id, index, "up")}
                                  disabled={index === 0}
                                  className="p-1 hover:text-electric disabled:opacity-20 transition-colors"
                                  title="Move Up"
                                >
                                  <ChevronUp className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => moveItem(dropdown.id, index, "down")}
                                  disabled={index === dropdown.items.length - 1}
                                  className="p-1 hover:text-electric disabled:opacity-20 transition-colors"
                                  title="Move Down"
                                >
                                  <ChevronDown className="w-5 h-5" />
                                </button>
                              </div>
                              <div className="w-12 h-12 bg-navy border border-white/10 rounded-xl flex items-center justify-center text-2xl">
                                {item.iconOrFlag || '🚩'}
                              </div>
                            </div>
                            
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Icon / Flag</span>
                                <input
                                  type="text"
                                  value={item.iconOrFlag}
                                  onChange={(e) => updateItem(dropdown.id, item.id, { iconOrFlag: e.target.value })}
                                  placeholder="Emoji or URL"
                                  className="w-full bg-navy border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-electric outline-none transition-colors"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Item Label</span>
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => updateItem(dropdown.id, item.id, { name: e.target.value })}
                                  placeholder="e.g. India MC"
                                  className="w-full bg-navy border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-electric outline-none transition-colors"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Target URL</span>
                                <input
                                  type="text"
                                  value={item.url}
                                  onChange={(e) => updateItem(dropdown.id, item.id, { url: e.target.value })}
                                  placeholder="e.g. /services/minecraft#in"
                                  className="w-full bg-navy border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-electric outline-none transition-colors"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5">
                              <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    checked={item.active}
                                    onChange={(e) => updateItem(dropdown.id, item.id, { active: e.target.checked })}
                                    className="sr-only"
                                  />
                                  <div className={`w-10 h-5 rounded-full transition-colors ${item.active ? 'bg-electric' : 'bg-gray-700'}`} />
                                  <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${item.active ? 'translate-x-5' : ''}`} />
                                </div>
                                <span className={`text-xs font-bold transition-colors ${item.active ? 'text-electric' : 'text-gray-500'}`}>
                                  {item.active ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                              </label>

                              <button
                                onClick={() => removeItem(dropdown.id, item.id)}
                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                title="Remove Item"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      {!dropdowns.length && (
        <div className="bg-navy border border-dashed border-white/10 rounded-2xl p-20 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <LinkIcon className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">No dropdowns configured</h3>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">Create your first service dropdown category to start organizing your navbar.</p>
          <button
            onClick={addNewDropdown}
            className="bg-electric text-white px-6 py-2.5 rounded-xl font-bold hover:bg-electric-light transition-all"
          >
            Add First Dropdown
          </button>
        </div>
      )}
    </div>
  );
}
