import React, { useState } from 'react';
import { 
  Tractor, 
  Search, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Edit3, 
  MapPin, 
  Building, 
  Wrench, 
  FileText, 
  Check, 
  ShieldAlert,
  Calendar,
  ExternalLink
} from 'lucide-react';

export default function EquipmentRentalModule({ 
  equipmentList, 
  bookingsList, 
  onUpdateEquipmentStatus, 
  onAddEquipment, 
  onResolveDispute 
}) {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog', 'bookings', 'payouts'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Dispute Modal
  const [selectedDisputeBooking, setSelectedDisputeBooking] = useState(null);
  const [resolutionAction, setResolutionAction] = useState('FULL_REFUND');
  const [resolutionNotes, setResolutionNotes] = useState('');

  // Equipment Form Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [eqName, setEqName] = useState('');
  const [category, setCategory] = useState('Tractor');
  const [partnerName, setPartnerName] = useState('Vikramjit Agro Machinery');
  const [hourlyRateUSD, setHourlyRateUSD] = useState('18');
  const [dailyRateUSD, setDailyRateUSD] = useState('120');
  const [condition, setCondition] = useState('EXCELLENT');
  const [location, setLocation] = useState('Karnal, Haryana');
  const [state, setState] = useState('Haryana');

  const [successMsg, setSuccessMsg] = useState('');

  const handleCreateEquipment = (e) => {
    e.preventDefault();
    const newEq = {
      id: `EQP-${Math.floor(300 + Math.random() * 900)}`,
      name: eqName,
      category,
      partnerName,
      hourlyRateUSD: Number(hourlyRateUSD),
      dailyRateUSD: Number(dailyRateUSD),
      condition,
      location,
      state,
      status: 'APPROVED',
      availableUnits: 2
    };

    onAddEquipment(newEq);
    setSuccessMsg(`Machinery listing "${eqName}" created and approved!`);
    setShowAddModal(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleConfirmDisputeResolution = (e) => {
    e.preventDefault();
    onResolveDispute(selectedDisputeBooking.id, {
      resolutionAction,
      resolutionNotes,
      resolvedAt: new Date().toISOString()
    });

    setSuccessMsg(`Dispute for booking #${selectedDisputeBooking.id} resolved via ${resolutionAction}.`);
    setSelectedDisputeBooking(null);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Group payouts per partner
  const partnerPayoutsMap = {};
  bookingsList.forEach(b => {
    if (!partnerPayoutsMap[b.partnerName]) {
      partnerPayoutsMap[b.partnerName] = {
        partnerName: b.partnerName,
        totalBookings: 0,
        grossEarningsUSD: 0,
        platformFeeUSD: 0,
        netPayoutUSD: 0
      };
    }
    partnerPayoutsMap[b.partnerName].totalBookings += 1;
    partnerPayoutsMap[b.partnerName].grossEarningsUSD += b.totalFeeUSD;
    partnerPayoutsMap[b.partnerName].platformFeeUSD += (b.platformCommissionUSD || b.totalFeeUSD * 0.08);
    partnerPayoutsMap[b.partnerName].netPayoutUSD += (b.partnerPayoutUSD || b.totalFeeUSD * 0.92);
  });

  const partnerPayoutsList = Object.values(partnerPayoutsMap);

  // Filters
  const filteredEquipment = equipmentList.filter(eq => {
    const matchesSearch = eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          eq.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          eq.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || eq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Title */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">Equipment & Rental Management</h2>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">
              Module 03
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review equipment listings, resolve rental disputes, and manage partner revenue distributions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'catalog'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Machinery Catalog ({equipmentList.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'bookings'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Bookings & Disputes ({bookingsList.length})
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'payouts'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Partner Revenue ({partnerPayoutsList.length})
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* CATALOG TAB */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search equipment or partner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
              >
                <option value="ALL">All Categories</option>
                <option value="Tractor">Tractors</option>
                <option value="Harvester">Harvesters</option>
                <option value="Tiller">Tillers</option>
                <option value="Drone">Spraying Drones</option>
              </select>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus size={16} />
                <span>Add Machinery Listing</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Equipment Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Partner Owner</th>
                    <th className="px-6 py-4">Rental Rates</th>
                    <th className="px-6 py-4">Condition</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Listing Status</th>
                    <th className="px-6 py-4 text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredEquipment.map((eq) => (
                    <tr key={eq.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-extrabold text-slate-900 block text-sm">{eq.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {eq.id}</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold uppercase">
                          {eq.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-800">
                        <div className="flex items-center gap-1">
                          <Building size={13} className="text-slate-400" />
                          <span>{eq.partnerName}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-mono">
                        <span className="font-extrabold text-slate-900">${eq.hourlyRateUSD}/hr</span>
                        <span className="text-slate-400 text-[10px] block">${eq.dailyRateUSD}/day</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          eq.condition === 'NEW' ? 'bg-emerald-100 text-emerald-800' :
                          eq.condition === 'EXCELLENT' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {eq.condition}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin size={13} className="text-slate-400" />
                          <span>{eq.location}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          eq.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                          eq.status === 'SUSPENDED' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {eq.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {eq.status === 'APPROVED' ? (
                          <button
                            onClick={() => onUpdateEquipmentStatus(eq.id, 'SUSPENDED')}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 rounded-lg text-[10px] font-bold text-slate-600 transition-all"
                          >
                            Suspend Listing
                          </button>
                        ) : (
                          <button
                            onClick={() => onUpdateEquipmentStatus(eq.id, 'APPROVED')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold transition-all shadow-2xs"
                          >
                            Approve Listing
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredEquipment.length === 0 && (
                    <tr>
                      <td colSpan="8" className="py-16 text-center text-slate-400">
                        No equipment listings found matching criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* BOOKINGS TAB */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Booking ID</th>
                    <th className="px-6 py-4">Equipment Name</th>
                    <th className="px-6 py-4">Equipment Partner</th>
                    <th className="px-6 py-4">Renter / Farmer</th>
                    <th className="px-6 py-4">Rental Dates</th>
                    <th className="px-6 py-4">Total Rental Fee</th>
                    <th className="px-6 py-4">Booking Status</th>
                    <th className="px-6 py-4 text-right">Dispute Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {bookingsList.map((bkg) => (
                    <tr key={bkg.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-400">
                        {bkg.id}
                      </td>

                      <td className="px-6 py-4 font-bold text-slate-900">
                        {bkg.equipmentName}
                      </td>

                      <td className="px-6 py-4 text-slate-700 font-medium">
                        {bkg.partnerName}
                      </td>

                      <td className="px-6 py-4 text-slate-700 font-medium">
                        {bkg.renterName}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {bkg.startDate} to {bkg.endDate}
                      </td>

                      <td className="px-6 py-4 font-mono font-bold text-slate-900">
                        ${bkg.totalFeeUSD}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          bkg.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                          bkg.status === 'CANCELLED' ? 'bg-slate-100 text-slate-600' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {bkg.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {bkg.disputeStatus === 'DISPUTED' ? (
                          <button
                            onClick={() => setSelectedDisputeBooking(bkg)}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs inline-flex items-center gap-1 cursor-pointer animate-pulse"
                          >
                            <ShieldAlert size={14} />
                            <span>Resolve Dispute</span>
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">No Disputes</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PAYOUTS TAB */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Partner Name</th>
                    <th className="px-6 py-4">Total Rental Bookings</th>
                    <th className="px-6 py-4">Gross Revenue</th>
                    <th className="px-6 py-4">Platform Service Fee (8%)</th>
                    <th className="px-6 py-4">Net Partner Payout</th>
                    <th className="px-6 py-4 text-right">Payout Settlement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {partnerPayoutsList.map((partner, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 text-sm">
                        {partner.partnerName}
                      </td>

                      <td className="px-6 py-4 text-slate-700 font-semibold">
                        {partner.totalBookings} Bookings
                      </td>

                      <td className="px-6 py-4 font-mono font-extrabold text-slate-900">
                        ${partner.grossEarningsUSD.toFixed(2)}
                      </td>

                      <td className="px-6 py-4 font-mono font-bold text-emerald-700">
                        ${partner.platformFeeUSD.toFixed(2)}
                      </td>

                      <td className="px-6 py-4 font-mono font-extrabold text-slate-950">
                        ${partner.netPayoutUSD.toFixed(2)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            setSuccessMsg(`Payout of $${partner.netPayoutUSD.toFixed(2)} transferred to ${partner.partnerName}!`);
                            setTimeout(() => setSuccessMsg(''), 4000);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                        >
                          Transfer Payout
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-slate-900">Add New Machinery Listing</h3>

            <form onSubmit={handleCreateEquipment} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Equipment Model & Title</label>
                <input
                  type="text"
                  required
                  value={eqName}
                  onChange={(e) => setEqName(e.target.value)}
                  placeholder="e.g. John Deere 5050D 50HP Tractor"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Tractor">Tractor</option>
                    <option value="Harvester">Harvester</option>
                    <option value="Tiller">Rotavator / Tiller</option>
                    <option value="Drone">Spraying Drone</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Equipment Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="NEW">NEW</option>
                    <option value="EXCELLENT">EXCELLENT</option>
                    <option value="GOOD">GOOD</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Hourly Rate ($)</label>
                  <input
                    type="number"
                    required
                    value={hourlyRateUSD}
                    onChange={(e) => setHourlyRateUSD(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Daily Rate ($)</label>
                  <input
                    type="number"
                    required
                    value={dailyRateUSD}
                    onChange={(e) => setDailyRateUSD(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Partner Owner</label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Location Availability</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Approve & Add Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dispute Resolution Modal */}
      {selectedDisputeBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
              <ShieldAlert size={20} />
              <span>Rental Dispute Resolution Modal</span>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-1">
              <p className="font-bold text-rose-900">Dispute Note: {selectedDisputeBooking.disputeReason}</p>
              <p className="text-rose-700">Renter: {selectedDisputeBooking.renterName} | Owner: {selectedDisputeBooking.partnerName}</p>
            </div>

            <form onSubmit={handleConfirmDisputeResolution} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Select Resolution Outcome</label>
                <select
                  value={resolutionAction}
                  onChange={(e) => setResolutionAction(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value="FULL_REFUND">Full Refund to Renter ($930)</option>
                  <option value="PARTIAL_REFUND_50">50% Partial Refund ($465)</option>
                  <option value="PARTNER_PAYOUT">Dismiss Dispute & Pay Partner</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Resolution Summary Notes</label>
                <textarea
                  rows="3"
                  required
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Enter details of agreed resolution..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDisputeBooking(null)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Execute Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
