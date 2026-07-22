import React from 'react';
import { 
  ShieldAlert, 
  Search, 
  Bell, 
  EyeOff, 
  Eye, 
  User, 
  CheckCircle2, 
  ChevronDown,
  Sparkles,
  Lock
} from 'lucide-react';
import { INITIAL_ADMIN_ROLES } from './mockAdminData';

export default function AdminHeader({ 
  user, 
  activeAdminRole, 
  setActiveAdminRole, 
  maskPii, 
  setMaskPii 
}) {
  const currentRoleObj = INITIAL_ADMIN_ROLES[activeAdminRole] || INITIAL_ADMIN_ROLES.SUPER_ADMIN;

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-6 py-3 shadow-2xs backdrop-blur-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        
        {/* Title & Quick Role Switcher */}
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-display text-slate-900 leading-none">AGRILOG Administration</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${currentRoleObj.badgeColor}`}>
                {currentRoleObj.title}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">Operational Hub • agrilog-pi.vercel.app</span>
          </div>

          {/* Quick RBAC Role Select Dropdown */}
          <div className="hidden md:flex items-center gap-1.5 pl-4 border-l border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role Scope:</span>
            <select
              value={activeAdminRole}
              onChange={(e) => setActiveAdminRole(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-800 font-bold px-2.5 py-1 rounded-lg focus:outline-hidden"
            >
              <option value="SUPER_ADMIN">Super Admin (Full)</option>
              <option value="OPERATIONS">Operations Admin</option>
              <option value="AGRONOMY">Agronomy Manager</option>
              <option value="FINANCE">Finance Admin</option>
            </select>
          </div>
        </div>

        {/* Right Info & PII Mask Badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          
          {/* PII Masking Status */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            {maskPii ? (
              <>
                <EyeOff size={14} className="text-amber-600" />
                <span className="text-[11px] font-bold text-slate-700">PII Masked</span>
              </>
            ) : (
              <>
                <Eye size={14} className="text-emerald-600" />
                <span className="text-[11px] font-bold text-emerald-800">PII Unmasked</span>
              </>
            )}
          </div>

          {/* User Avatar & Name */}
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="p-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-2xs">
              <User size={14} />
            </div>
            <div className="hidden lg:block text-right">
              <span className="text-xs font-bold text-slate-900 block leading-tight">{user?.name || 'Administrator'}</span>
              <span className="text-[10px] text-slate-400 font-medium">{user?.email || 'admin@agrilog.in'}</span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
