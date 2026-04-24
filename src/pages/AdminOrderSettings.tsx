import { useAppStore } from "../store";
import { Save } from "lucide-react";
import { useState } from "react";

export default function AdminOrderSettings() {
  const { settings, updateSettings, showToast } = useAppStore();

  const [orderMethod, setOrderMethod] = useState(settings.orderMethod);
  const [discordLink, setDiscordLink] = useState(settings.discordLink);
  const [orderDiscordChannel, setOrderDiscordChannel] = useState(
    settings.orderDiscordChannel,
  );
  const [orderWhatsappNumber, setOrderWhatsappNumber] = useState(
    settings.orderWhatsappNumber,
  );
  const [orderInstructions, setOrderInstructions] = useState(
    settings.orderInstructions,
  );
  const [orderButtonText, setOrderButtonText] = useState(
    settings.orderButtonText,
  );
  const [orderButtonColor, setOrderButtonColor] = useState(
    settings.orderButtonColor,
  );

  const handleSave = () => {
    updateSettings({
      orderMethod,
      discordLink,
      orderDiscordChannel,
      orderWhatsappNumber,
      orderInstructions,
      orderButtonText,
      orderButtonColor,
    });
    showToast("Order settings saved successfully", "success");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Order Settings</h2>
        <p className="text-gray-400">
          Configure how users order plans from your website.
        </p>
      </div>

      <div className="bg-navy p-6 rounded-2xl shadow-sm border border-white/10 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Order Method
          </label>
          <select
            value={orderMethod}
            onChange={(e) => setOrderMethod(e.target.value as any)}
            className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-electric"
          >
            <option value="discord">Discord Only</option>
            <option value="whatsapp">WhatsApp Only</option>
            <option value="both">Both (Recommended)</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Discord Invite Link
            </label>
            <input
              type="text"
              value={discordLink}
              onChange={(e) => setDiscordLink(e.target.value)}
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric"
              placeholder="https://discord.gg/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Discord Order Channel
            </label>
            <input
              type="text"
              value={orderDiscordChannel}
              onChange={(e) => setOrderDiscordChannel(e.target.value)}
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric"
              placeholder="#orders or #create-ticket"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            WhatsApp Number (with country code)
          </label>
          <input
            type="text"
            value={orderWhatsappNumber}
            onChange={(e) => setOrderWhatsappNumber(e.target.value)}
            className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric max-w-md"
            placeholder="+1234567890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Order Instructions (Shown in modal for Discord)
          </label>
          <textarea
            value={orderInstructions}
            onChange={(e) => setOrderInstructions(e.target.value)}
            rows={5}
            className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric font-mono text-sm"
          />
        </div>
      </div>

      <div className="bg-navy p-6 rounded-2xl shadow-sm border border-white/10 space-y-6">
        <h3 className="text-lg font-bold text-white mb-2">
          Card Button Styling
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Button Text
            </label>
            <input
              type="text"
              value={orderButtonText}
              onChange={(e) => setOrderButtonText(e.target.value)}
              className="w-full bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Button Color (Hex)
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={orderButtonColor}
                onChange={(e) => setOrderButtonColor(e.target.value)}
                className="h-10 w-10 rounded border border-white/10 bg-navy-dark cursor-pointer p-1"
              />
              <input
                type="text"
                value={orderButtonColor}
                onChange={(e) => setOrderButtonColor(e.target.value)}
                className="flex-1 bg-navy-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric uppercase"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="pt-4 border-t border-white/10">
          <label className="block text-sm font-medium text-gray-400 mb-4">
            Preview
          </label>
          <button
            className="w-full max-w-sm font-rajdhani text-xl font-bold py-3 rounded-xl transition-all text-white flex items-center justify-center gap-2 hover:scale-[1.05]"
            style={{
              backgroundColor: orderButtonColor,
              boxShadow: `0 0 20px ${orderButtonColor}80`,
            }}
          >
            {orderButtonText}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-electric hover:bg-electric-light text-white font-semibold py-3 px-8 rounded-xl transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Order Settings
        </button>
      </div>
    </div>
  );
}
