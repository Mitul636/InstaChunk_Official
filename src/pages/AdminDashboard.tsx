import {
  Users,
  Activity,
  DollarSign,
  AlertTriangle,
  MoreVertical,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const data = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 7800 },
    { name: "May", revenue: 6800 },
    { name: "Jun", revenue: 9500 },
    { name: "Jul", revenue: 11000 },
  ];

  const recentUsers = [
    {
      name: "Acme Corp",
      email: "hello@acme.com",
      plan: "Business",
      status: "Active",
    },
    {
      name: "Jane Smith",
      email: "jane@smith.net",
      plan: "Starter",
      status: "Suspended",
    },
    {
      name: "DevStudio",
      email: "contact@dev.io",
      plan: "Pro",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-navy p-6 rounded-2xl shadow-sm border border-white/10 hover:border-white/20 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 flex items-center justify-center rounded-xl border border-indigo-500/30">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+12%</span>
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">Total Users</p>
          <h3 className="text-3xl font-display font-bold text-white">4,291</h3>
        </div>

        <div className="bg-navy p-6 rounded-2xl shadow-sm border border-white/10 hover:border-white/20 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 flex items-center justify-center rounded-xl border border-emerald-500/30">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+24%</span>
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">MRR</p>
          <h3 className="text-3xl font-display font-bold text-white">
            $54,230
          </h3>
        </div>

        <div className="bg-navy p-6 rounded-2xl shadow-sm border border-white/10 hover:border-white/20 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-electric/20 flex items-center justify-center rounded-xl border border-electric/30">
              <Activity className="w-5 h-5 text-electric-light" />
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium mb-1">
            Avg Uptime (30d)
          </p>
          <h3 className="text-3xl font-display font-bold text-white">99.99%</h3>
        </div>

        <div className="bg-navy p-6 rounded-2xl shadow-sm border border-red-500/20 hover:border-red-500/40 transition-all overflow-hidden relative">
          <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 bg-red-500/20 flex items-center justify-center rounded-xl border border-red-500/30">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
          </div>
          <p className="text-red-400 text-sm font-medium mb-1 relative z-10">
            Active Alerts
          </p>
          <h3 className="text-3xl font-display font-bold text-red-500 relative z-10">
            2 Nodes
          </h3>
        </div>
      </div>

      {/* Charts & Alerts */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-navy p-6 rounded-2xl shadow-sm border border-white/10">
          <h3 className="text-lg font-bold text-white mb-6">Revenue Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00B4D8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  textAnchor="middle"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <CartesianGrid
                  vertical={false}
                  stroke="#ffffff"
                  strokeOpacity={0.05}
                  strokeDasharray="4 4"
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "#03045E",
                    color: "white",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.5)",
                  }}
                  itemStyle={{ color: "#00B4D8", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00B4D8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-navy p-6 rounded-2xl shadow-sm border border-white/10">
          <h3 className="text-lg font-bold text-white mb-6">
            Server Health Alerts
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-red-400 mb-1">
                  High CPU Load: Node-EU-4
                </h4>
                <p className="text-xs text-red-300">
                  CPU usage sustained above 90% for 5 minutes. Auto-scaling
                  initiated.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex gap-3">
              <Activity className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-orange-300 mb-1">
                  Disk Space Warning: DB-Vol-2
                </h4>
                <p className="text-xs text-orange-200">
                  Storage capacity at 85%. Consider expanding volume soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-navy rounded-2xl shadow-sm border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-navy-light/30">
          <h3 className="text-lg font-bold text-white">Recent Signups</h3>
          <button className="text-sm font-medium text-electric hover:text-electric-light transition-colors">
            View All Users
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy-dark/50">
                <th className="px-6 py-4 text-sm font-semibold text-gray-400">
                  User / Company
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400">
                  Plan
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-400">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-right text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentUsers.map((user, i) => (
                <tr
                  key={i}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-white group-hover:text-electric-light transition-colors">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-300">
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        user.status === "Active"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-500 hover:text-white transition-colors bg-white/5 p-2 rounded-lg hover:bg-white/10">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
