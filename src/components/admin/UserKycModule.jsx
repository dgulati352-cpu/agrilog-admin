import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Award, 
  MapPin, 
  Building, 
  Phone, 
  Mail, 
  ExternalLink,
  Lock,
  Unlock,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import KycDocumentViewerModal from './KycDocumentViewerModal';

export default function UserKycModule({ users, onUpdateUserStatus, maskPii, activeAdminRole }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [selectedUserForKyc, setSelectedUserForKyc] = useState(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // Extract unique states for filter dropdown
  const availableStates = Array.from(new Set(users.map(u => u.state || u.location.split(', ').pop()))).filter(Boolean);

  // Filtered users list
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone && user.phone.includes(searchQuery));

    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || user.verificationStatus === statusFilter;
    const matchesState = stateFilter === 'ALL' || (user.state === stateFilter || user.location.includes(stateFilter));

    return matchesSearch && matchesRole && matchesStatus && matchesState;
  });

  const handleApproveKyc = (userId) => {
    const userObj = users.find(u => u.id === userId);
    let defaultBadge = 'Verified AGRILOG Member';
    if (userObj.role === 'FARMER') defaultBadge = 'Verified AGRILOG Farmer';
    if (userObj.role === 'EQUIPMENT_PARTNER') defaultBadge = 'Verified Equipment Partner';
    if (userObj.role === 'DOMESTIC_BUYER' || userObj.role === 'ENTERPRISE_BUYER') defaultBadge = 'Verified AGRILOG Buyer';

    onUpdateUserStatus(userId, {
      verificationStatus: 'VERIFIED',
      verifiedBadge: defaultBadge,
      rejectionReason: null
    });

    setActionSuccessMsg(`Verification APPROVED for ${userObj.name}. Issued "${defaultBadge}" badge.`);
    setSelectedUserForKyc(null);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleRejectKyc = (userId, reasonCode, notes) => {
    const userObj = users.find(u => u.id === userId);
    onUpdateUserStatus(userId, {
      verificationStatus: 'REJECTED',
      rejectionReason: `[${reasonCode}] ${notes}`,
      verifiedBadge: null
    });

    setActionSuccessMsg(`Verification REJECTED for ${userObj.name} with code: ${reasonCode}.`);
    setSelectedUserForKyc(null);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleRequestReupload = (userId) => {
    const userObj = users.find(u => u.id === userId);
    onUpdateUserStatus(userId, {
      verificationStatus: 'PENDING',
      rejectionReason: 'Re-upload requested by admin for updated documentation.',
      verifiedBadge: null
    });

    setActionSuccessMsg(`Re-upload request sent to ${userObj.name}. Status updated to PENDING.`);
    setSelectedUserForKyc(null);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleToggleBadge = (userObj) => {
    const newBadge = userObj.verifiedBadge ? null : (
      userObj.role === 'FARMER' ? 'Verified AGRILOG Farmer' :
      userObj.role === 'EQUIPMENT_PARTNER' ? 'Verified Equipment Partner' : 'Verified AGRILOG Buyer'
    );
    onUpdateUserStatus(userObj.id, {
      verifiedBadge: newBadge
    });
  };

  const formatRoleLabel = (role) => {
    switch (role) {
      case 'FARMER': return 'Farmer';
      case 'EQUIPMENT_PARTNER': return 'Equipment Partner';
      case 'DOMESTIC_BUYER': return 'Domestic Buyer';
      case 'ENTERPRISE_BUYER': return 'Enterprise Buyer';
      default: return role;
    }
  };

  const maskString = (str) => {
    if (!str) return 'N/A';
    if (!maskPii) return str;
    return str.replace(/(\+91\s?\d{2})\d{5}(\d{3})/, '$1-*****-$2');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Title & Overview Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">User & KYC Verification Management</h2>
            <span className="px-2.5 py-0.5 bg-forest-50 text-forest-700 border border-forest-200 rounded-full text-xs font-semibold">
              Module 01
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Verify identity, farm land holdings, machinery RC books, GST certificates, and issue verified badges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span className="font-semibold text-slate-700">Verified: {users.filter(u => u.verificationStatus === 'VERIFIED').length}</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center gap-2">
            <Clock size={14} className="text-amber-600" />
            <span className="font-semibold text-slate-700">Pending: {users.filter(u => u.verificationStatus === 'PENDING').length}</span>
          </div>
        </div>
      </div>

      {/* Action Notification */}
      {actionSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-forest-600 focus:bg-white text-slate-800"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="ALL">All Roles</option>
            <option value="FARMER">Farmers</option>
            <option value="EQUIPMENT_PARTNER">Equipment Partners</option>
            <option value="DOMESTIC_BUYER">Domestic Buyers</option>
            <option value="ENTERPRISE_BUYER">Enterprise Buyers</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="ALL">All Verification Statuses</option>
            <option value="PENDING">Pending Review</option>
            <option value="VERIFIED">Verified</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* State Filter */}
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="ALL">All States/Regions</option>
            {availableStates.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">User & Entity</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Contact Details</th>
                <th className="px-6 py-4">KYC Status</th>
                <th className="px-6 py-4">Platform Badge</th>
                <th className="px-6 py-4 text-right">KYC Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredUsers.map((user) => {
                const isVerified = user.verificationStatus === 'VERIFIED';
                const isPending = user.verificationStatus === 'PENDING';
                const isRejected = user.verificationStatus === 'REJECTED';

                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-extrabold text-slate-900 block text-sm">{user.name}</span>
                        {user.company && (
                          <span className="text-[11px] font-semibold text-forest-700 flex items-center gap-1 mt-0.5">
                            <Building size={12} />
                            {user.company}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">ID: {user.id}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        user.role === 'FARMER' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        user.role === 'EQUIPMENT_PARTNER' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        user.role === 'ENTERPRISE_BUYER' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {formatRoleLabel(user.role)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600 font-medium">
                      <div className="flex items-center gap-1">
                        <MapPin size={13} className="text-slate-400" />
                        <span>{user.location}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      <div>
                        <span className="block font-semibold">{user.email}</span>
                        <span className="text-slate-400 font-mono text-[11px] block mt-0.5">
                          {maskString(user.phone)}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isVerified ? 'bg-emerald-100 text-emerald-800' :
                        isRejected ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800 animate-pulse'
                      }`}>
                        {isVerified && <CheckCircle2 size={12} />}
                        {isRejected && <XCircle size={12} />}
                        {isPending && <Clock size={12} />}
                        <span>{user.verificationStatus}</span>
                      </span>

                      {user.rejectionReason && (
                        <p className="text-[10px] text-rose-600 font-medium mt-1 truncate max-w-xs" title={user.rejectionReason}>
                          {user.rejectionReason}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {user.verifiedBadge ? (
                        <div className="flex items-center gap-1.5">
                          <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-800 rounded-lg text-[10px] font-bold shadow-2xs flex items-center gap-1">
                            <Award size={12} className="text-emerald-600" />
                            {user.verifiedBadge}
                          </span>
                          <button
                            onClick={() => handleToggleBadge(user)}
                            className="text-[10px] text-slate-400 hover:text-slate-600 underline"
                          >
                            Revoke
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleToggleBadge(user)}
                          className="text-[10px] font-semibold text-slate-400 hover:text-emerald-600 underline flex items-center gap-1"
                        >
                          <Award size={12} />
                          Issue Badge
                        </button>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedUserForKyc(user)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-forest-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye size={13} />
                        <span>Inspect KYC</span>
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-slate-400">
                    <Users size={36} className="mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold">No user verification records found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC Inspection Modal */}
      {selectedUserForKyc && (
        <KycDocumentViewerModal
          user={selectedUserForKyc}
          maskPii={maskPii}
          onClose={() => setSelectedUserForKyc(null)}
          onApprove={handleApproveKyc}
          onReject={handleRejectKyc}
          onRequestReupload={handleRequestReupload}
        />
      )}

    </div>
  );
}
