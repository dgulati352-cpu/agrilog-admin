import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  FileText, 
  Truck, 
  Wallet, 
  BarChart3, 
  Scale, 
  Settings, 
  Plug, 
  Search, 
  Bell, 
  ChevronDown, 
  Globe, 
  DollarSign, 
  ShoppingBag, 
  Store, 
  UserCheck, 
  PieChart, 
  Clock, 
  AlertTriangle, 
  Plus, 
  CheckCircle2 
} from 'lucide-react';

export default function AdminPanel({ 
  users = [], 
  requirements = [], 
  orders = [], 
  currentSubView, 
  setCurrentSubView 
}) {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const sidebarItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Users', icon: <Users size={18} />, hasSub: true },
    { label: 'Products', icon: <Package size={18} />, hasSub: true },
    { label: 'Orders', icon: <FileText size={18} /> },
    { label: 'Trade & Logistics', icon: <Truck size={18} />, hasSub: true },
    { label: 'Finance', icon: <Wallet size={18} />, hasSub: true },
    { label: 'Reports & Analytics', icon: <BarChart3 size={18} /> },
    { label: 'Disputes', icon: <Scale size={18} /> },
    { label: 'System Settings', icon: <Settings size={18} /> },
    { label: 'Integrations', icon: <Plug size={18} /> }
  ];

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      
      {/* LEFT SIDEBAR (Dark Deep Green) */}
      <aside className="w-64 bg-forest-950 text-slate-300 flex flex-col justify-between p-4 border-r border-forest-900 shrink-0 hidden md:flex select-none">
        <div>
          {/* Brand Header */}
          <div className="p-2 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-forest-600 rounded-xl text-white shadow-xs">
                <ShieldCheckIcon size={20} className="stroke-[2.5]" />
              </span>
              <div>
                <h1 className="font-serif-title font-bold text-lg text-white leading-none">AGRILOG</h1>
                <p className="text-[9px] text-gold-300/80 font-serif-title italic mt-0.5">Connecting Agriculture Beyond Borders</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-forest-800/90 text-white font-bold shadow-xs border border-forest-600/40' 
                      : 'text-slate-400 hover:text-white hover:bg-forest-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-gold-400' : 'text-slate-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.hasSub && <ChevronDown size={12} className="text-slate-500" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Admin Profile Box */}
        <div className="pt-4 border-t border-forest-900/80">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-forest-900/40 border border-forest-800/60">
            <div className="w-8 h-8 bg-gold-600 rounded-full flex items-center justify-center text-forest-950 font-bold text-xs">
              A
            </div>
            <div className="flex-1 truncate">
              <h4 className="text-xs font-bold text-white truncate">Admin User</h4>
              <p className="text-[9px] text-gold-300 font-medium">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold font-display text-slate-900">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search users, orders, products..." 
                className="pl-9 pr-4 py-1.5 text-xs bg-slate-100/80 border border-slate-200 rounded-full w-64 focus:outline-hidden focus:bg-white focus:border-forest-600 transition-all"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full relative cursor-pointer">
                <Bell size={18} />
                <span className="w-2 h-2 bg-emerald-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white" />
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-7 h-7 bg-gold-600 text-forest-950 rounded-full flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div className="flex flex-col text-left hidden lg:block">
                  <span className="text-xs font-bold text-slate-800">Admin User</span>
                  <span className="text-[9px] text-slate-400 font-medium">Super Admin</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY CANVASES */}
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* METRICS ROW (6 Cards matching design) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Users</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-extrabold font-display text-slate-900">2,458</h3>
                <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">+8.4%</span>
              </div>
              <span className="text-[9px] text-slate-400 block">from last month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Sellers</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-extrabold font-display text-slate-900">1,256</h3>
                <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">+7.2%</span>
              </div>
              <span className="text-[9px] text-slate-400 block">from last month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Buyers</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-extrabold font-display text-slate-900">1,202</h3>
                <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">+9.6%</span>
              </div>
              <span className="text-[9px] text-slate-400 block">from last month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Orders</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-extrabold font-display text-slate-900">5,860</h3>
                <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">+11.5%</span>
              </div>
              <span className="text-[9px] text-slate-400 block">from last month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total GMV</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-extrabold font-display text-slate-900">$4,867,750</h3>
                <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">+12.7%</span>
              </div>
              <span className="text-[9px] text-slate-400 block">from last month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Revenue</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-extrabold font-display text-slate-900">$86,540</h3>
                <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">+10.1%</span>
              </div>
              <span className="text-[9px] text-slate-400 block">from last month</span>
            </div>
          </div>

          {/* MIDDLE SECTION: Platform Overview Map + Order Analytics Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Platform Overview Global Map */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">Platform Overview</h3>
                  <p className="text-xs text-slate-400">Global trade activity & logistics performance</p>
                </div>
              </div>

              {/* Map Graphic Container */}
              <div className="bg-forest-950 rounded-xl p-4 relative overflow-hidden min-h-[220px] flex items-center justify-center border border-forest-800">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(85,141,49,0.25),transparent_70%)]" />
                <Globe size={110} className="text-gold-400/30 stroke-[1]" />
                
                {/* Overlay Metrics */}
                <div className="absolute top-4 right-4 text-right space-y-2">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Active Countries</span>
                    <span className="text-lg font-bold text-white">50+</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Total Shipments</span>
                    <span className="text-lg font-bold text-white">12,560</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 space-y-2">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">On-Time Delivery</span>
                    <span className="text-sm font-bold text-emerald-400">96.2%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Dispute Rate</span>
                    <span className="text-sm font-bold text-amber-400">1.2%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Analytics Donut Chart */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-900 text-base font-display">Order Analytics</h3>
                <select className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-semibold">
                  <option>This Month</option>
                  <option>Year 2026</option>
                </select>
              </div>

              {/* Donut Visualizer SVG */}
              <div className="flex items-center justify-around py-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#32561c" strokeWidth="4" strokeDasharray="38, 100" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="19, 100" strokeDashoffset="-38" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="26, 100" strokeDashoffset="-57" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="16, 100" strokeDashoffset="-83" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-base font-extrabold font-display text-slate-900 block">5,860</span>
                    <span className="text-[9px] text-slate-400 uppercase font-bold">Total Orders</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-forest-700" />
                    <span className="text-slate-600">Confirmed</span>
                    <span className="text-slate-900 font-bold">2,245 (38%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-slate-600">Processing</span>
                    <span className="text-slate-900 font-bold">1,125 (19%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-slate-600">Shipped</span>
                    <span className="text-slate-900 font-bold">1,540 (26%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-600">Delivered</span>
                    <span className="text-slate-900 font-bold">950 (16%)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: Recent Activities + Top Selling Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Recent Activities Timeline */}
            <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 text-base font-display">Recent Activities</h3>
                <button className="text-xs text-forest-700 hover:underline font-semibold cursor-pointer">
                  View All
                </button>
              </div>

              <div className="space-y-3.5">
                {[
                  { title: 'New seller registered', desc: 'Green Valley Farms, India', time: '2 min ago', icon: <UserCheck size={14} className="text-emerald-600" /> },
                  { title: 'New order placed', desc: 'ORD-2024-00129', time: '10 min ago', icon: <ShoppingBag size={14} className="text-blue-600" /> },
                  { title: 'Payment received', desc: '$5,620 from Global Farms Ltd.', time: '25 min ago', icon: <Wallet size={14} className="text-forest-600" /> },
                  { title: 'Dispute raised', desc: 'ORD-2024-00121', time: '1 hr ago', icon: <AlertTriangle size={14} className="text-amber-600" /> }
                ].map((act, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl text-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-slate-200">
                        {act.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{act.title}</h4>
                        <p className="text-[10px] text-slate-500">{act.desc}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling Categories Progress Bars */}
            <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 text-base font-display">Top Selling Categories</h3>
                <select className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-semibold">
                  <option>This Month</option>
                  <option>Year 2026</option>
                </select>
              </div>

              <div className="space-y-4 pt-1">
                {[
                  { name: 'Grains & Cereals', val: '$1,24,500', pct: '85%' },
                  { name: 'Spices', val: '$98,420', pct: '68%' },
                  { name: 'Tea & Coffee', val: '$76,230', pct: '52%' },
                  { name: 'Oil Seeds', val: '$54,680', pct: '38%' },
                  { name: 'Cotton', val: '$32,860', pct: '24%' }
                ].map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>{cat.name}</span>
                      <span className="text-forest-700">{cat.val}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-forest-700 h-full rounded-full transition-all duration-500" style={{ width: cat.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
