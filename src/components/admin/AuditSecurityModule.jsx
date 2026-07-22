import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Lock, 
  Eye, 
  EyeOff, 
  Search, 
  FileText, 
  UserCheck, 
  Building, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Activity,
  Layers,
  Key
} from 'lucide-react';
import { INITIAL_ADMIN_ROLES } from './mockAdminData';

export default function AuditSecurityModule({ 
  auditLogs, 
  maskPii, 
  setMaskPii, 
  activeAdminRole, 
  setActiveAdminRole 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || log.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">Audit Logs, Security & PII Privacy Settings</h2>
            <span className="px-2.5 py-0.5 bg-slate-900 text-white rounded-full text-xs font-semibold">
              Module 08
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Immutable audit logging of administrative actions, RBAC role scopes, and PII masking privacy compliance.
          </p>
        </div>

        {/* PII Toggle Control */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-2xl">
          <div className="flex items-center gap-2 px-2 text-xs font-semibold text-slate-700">
            {maskPii ? <EyeOff size={16} className="text-amber-600" /> : <Eye size={16} className="text-emerald-600" />}
            <span>PII Masking: <strong>{maskPii ? 'ENABLED' : 'DISABLED'}</strong></span>
          </div>

          {activeAdminRole === 'SUPER_ADMIN' ? (
            <button
              onClick={() => setMaskPii(!maskPii)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                maskPii ? 'bg-amber-600 text-white' : 'bg-slate-800 text-white'
              }`}
            >
              {maskPii ? 'Unmask PII (Super Admin)' : 'Enable Masking'}
            </button>
          ) : (
            <span className="px-3 py-1 bg-slate-200 text-slate-500 rounded-xl text-[10px] font-bold" title="Only Super Admin can unmask PII">
              Locked by Policy
            </span>
          )}
        </div>
      </div>

      {/* RBAC Role Switcher & Scope Visualizer */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
          <Key size={18} className="text-purple-600" />
          Active Admin Role & Scope Assignment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(INITIAL_ADMIN_ROLES).map((roleObj) => {
            const isSelected = activeAdminRole === roleObj.id;

            return (
              <div 
                key={roleObj.id} 
                onClick={() => setActiveAdminRole(roleObj.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected 
                    ? 'border-purple-600 bg-purple-50/40 shadow-sm ring-1 ring-purple-600' 
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${roleObj.badgeColor}`}>
                      {roleObj.title}
                    </span>
                    {isSelected && <CheckCircle2 size={16} className="text-purple-600" />}
                  </div>
                  <p className="text-xs text-slate-600">{roleObj.description}</p>
                </div>

                <div className="text-[10px] font-bold uppercase text-purple-700 pt-2 border-t border-slate-100">
                  {isSelected ? 'ACTIVE SESSION ROLE' : 'Click to Switch Role'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Trail Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Immutable Audit Trail Log</h3>
            <p className="text-xs text-slate-500">Every admin action creates a log entry with admin ID, role, IP address, and details.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            >
              <option value="ALL">All Roles</option>
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="OPERATIONS">Operations</option>
              <option value="AGRONOMY">Agronomy</option>
              <option value="FINANCE">Finance</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Log ID & Timestamp</th>
                <th className="px-6 py-4">Admin Name & Role</th>
                <th className="px-6 py-4">Action Type</th>
                <th className="px-6 py-4">Target Resource</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Details Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-slate-900 block">{log.id}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{new Date(log.timestamp).toLocaleString()}</span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-800 block">{log.adminName}</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-bold uppercase tracking-wider">
                      {log.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-[10px] font-bold font-mono">
                      {log.action}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {log.target}
                  </td>

                  <td className="px-6 py-4 font-mono text-slate-500 text-[11px]">
                    {log.ipAddress}
                  </td>

                  <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={log.details}>
                    {log.details}
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
