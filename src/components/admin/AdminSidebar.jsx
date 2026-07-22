import React from 'react';
import { 
  BarChart3, 
  Users, 
  Sprout, 
  Tractor, 
  ShoppingBag, 
  DollarSign, 
  Globe, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Lock,
  ChevronLeft
} from 'lucide-react';

export default function AdminSidebar({ 
  activeTab, 
  setActiveTab, 
  pendingKycCount, 
  disputeCount, 
  collapsed, 
  setCollapsed 
}) {
  const menuItems = [
    {
      id: 'analytics',
      label: 'Dashboard & Analytics',
      icon: BarChart3,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'kyc',
      label: 'User Directory & KYC',
      icon: Users,
      badge: pendingKycCount > 0 ? `${pendingKycCount} Pending` : null,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'demand-advisory',
      label: 'Crop Demand & Advisory',
      icon: Sprout,
      badge: 'Live',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'equipment-rentals',
      label: 'Equipment & Rentals',
      icon: Tractor,
      badge: disputeCount > 0 ? `${disputeCount} Alert` : null,
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    {
      id: 'marketplace-orders',
      label: 'Marketplace & Orders',
      icon: ShoppingBag,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'finance-commissions',
      label: 'Finance & Commissions',
      icon: DollarSign,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'localization-cms',
      label: 'Localization & CMS',
      icon: Globe,
      badge: '9 Langs',
      badgeColor: 'bg-teal-100 text-teal-800'
    },
    {
      id: 'audit-security',
      label: 'Audit & System Config',
      icon: ShieldCheck,
      badge: 'RBAC',
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <aside 
      className={`bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 space-y-6">
        
        {/* Title & Collapse Toggle */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-slate-900 rounded-lg text-white font-bold text-xs">AG</span>
              <div>
                <span className="font-extrabold text-sm font-display text-slate-900 block leading-tight">AGRILOG ADMIN</span>
                <span className="text-[10px] text-slate-400 font-mono">agrilog-pi.vercel.app</span>
              </div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all mx-auto"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-forest-400' : 'text-slate-400'} />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 m-3 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[11px] font-bold text-slate-700">Audit Stream Online</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">v1.0 • Minimum Latency</span>
        </div>
      )}
    </aside>
  );
}
