import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  DollarSign, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  Building, 
  User, 
  Star, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function MarketplaceOrdersModule({ 
  harvestListings, 
  orders, 
  requirements, 
  onUpdateListingStatus, 
  onUpdateOrderStatus 
}) {
  const [activeTab, setActiveTab] = useState('listings'); // 'listings', 'deals', 'logistics'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Deal Stage Update Modal
  const [selectedOrderForStage, setSelectedOrderForStage] = useState(null);
  const [newDealStage, setNewDealStage] = useState('placed');

  const [successMsg, setSuccessMsg] = useState('');

  const handleStageSubmit = (e) => {
    e.preventDefault();
    onUpdateOrderStatus(selectedOrderForStage.id, newDealStage);
    setSuccessMsg(`Order #${selectedOrderForStage.id} stage updated to "${newDealStage.toUpperCase()}"!`);
    setSelectedOrderForStage(null);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const dealStagesMap = {
    placed: { label: 'In Negotiation', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    dispatched: { label: 'Deal Agreed', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    transit: { label: 'In Transit (Escrow Locked)', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    delivered: { label: 'Completed (Settled)', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' }
  };

  const filteredListings = harvestListings.filter(l => 
    l.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.articleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.buyerCompany && o.buyerCompany.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (o.sellerName && o.sellerName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">Marketplace & Transaction Coordination</h2>
            <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-semibold">
              Module 04
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Moderate farmer harvest listings, match buyers, coordinate negotiations, and track logistics delivery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'listings'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Crop Listings ({harvestListings.length})
          </button>
          <button
            onClick={() => setActiveTab('deals')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'deals'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Buyer Matchmaking & Deals ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('logistics')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'logistics'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Logistics & Delivery
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

      {/* CROP LISTINGS TAB */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search harvest listings by crop/farmer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((list) => (
              <div key={list.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      list.status === 'LIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {list.status}
                    </span>

                    {list.featured && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[10px] font-bold flex items-center gap-1">
                        <Star size={10} className="fill-amber-500 text-amber-500" />
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-display text-slate-900">{list.cropName}</h3>
                  
                  <div className="mt-3 space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Farmer:</span>
                      <span className="font-semibold text-slate-800">{list.farmerName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Quantity Available:</span>
                      <span className="font-extrabold text-slate-900">{list.quantityTons} Tons</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Quality Grade:</span>
                      <span className="font-semibold text-purple-700">{list.grade}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Expected Price:</span>
                      <span className="font-mono font-bold text-slate-900">${list.expectedPriceUSD}/Ton</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Location:</span>
                      <span className="text-slate-700">{list.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => onUpdateListingStatus(list.id, 'LIVE')}
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs"
                  >
                    Approve Listing
                  </button>
                  <button
                    onClick={() => onUpdateListingStatus(list.id, 'FLAGGED')}
                    className="py-1.5 px-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-lg text-xs font-semibold transition-all"
                  >
                    Flag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BUYER MATCHMAKING & DEALS TAB */}
      {activeTab === 'deals' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Order Contract ID</th>
                    <th className="px-6 py-4">Crop Article</th>
                    <th className="px-6 py-4">Buyer Company</th>
                    <th className="px-6 py-4">Seller / Farmer</th>
                    <th className="px-6 py-4">Quantity & Price</th>
                    <th className="px-6 py-4">Negotiation Stage</th>
                    <th className="px-6 py-4 text-right">Coordination</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredOrders.map((ord) => {
                    const stageInfo = dealStagesMap[ord.status] || { label: ord.status, color: 'bg-slate-100 text-slate-700' };

                    return (
                      <tr key={ord.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-slate-400">
                          {ord.id}
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-extrabold text-slate-900 block text-sm">{ord.articleName}</span>
                          <span className="text-[10px] text-slate-400">{ord.category}</span>
                        </td>

                        <td className="px-6 py-4 font-semibold text-slate-800">
                          {ord.buyerCompany}
                        </td>

                        <td className="px-6 py-4 text-slate-700 font-medium">
                          {ord.sellerName}
                        </td>

                        <td className="px-6 py-4 font-mono">
                          <span className="font-bold text-slate-900">{ord.quantity} {ord.unit}</span>
                          <span className="block text-[11px] text-slate-500">${ord.price}/{ord.unit === 'Tons' ? 'Ton' : 'Kg'}</span>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${stageInfo.color}`}>
                            {stageInfo.label}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrderForStage(ord);
                              setNewDealStage(ord.status);
                            }}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-forest-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            Update Deal Stage
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* LOGISTICS & DELIVERY TAB */}
      {activeTab === 'logistics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">LOGISTICS TRACKER • {ord.id}</span>
                    <h4 className="text-base font-bold text-slate-900 mt-0.5">{ord.articleName}</h4>
                  </div>

                  <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-[10px] font-bold uppercase">
                    {ord.status === 'delivered' ? 'DELIVERED' : 'IN TRANSIT'}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-rose-500" />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Dispatch Farm</span>
                        <span className="font-semibold text-slate-800">{ord.sellerName} ({ord.buyerLocation.split(', ')[1] || 'Punjab'})</span>
                      </div>
                    </div>

                    <ArrowRight size={16} className="text-slate-400" />

                    <div className="flex items-center gap-2 text-right">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Delivery Destination</span>
                        <span className="font-semibold text-slate-800">{ord.buyerCompany}</span>
                      </div>
                      <MapPin size={16} className="text-emerald-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-slate-600">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Assigned Transport Carrier</span>
                      <span className="font-semibold text-slate-800">AGRILOG Cold Chain Fleet #402</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Driver Contact & Vehicle</span>
                      <span className="font-semibold text-slate-800">PB-10-CZ-9918 (+91 98112 00998)</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deal Stage Update Modal */}
      {selectedOrderForStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-slate-900">Update Contract Negotiation Stage</h3>
            <p className="text-xs text-slate-500">Order #{selectedOrderForStage.id} • {selectedOrderForStage.articleName}</p>

            <form onSubmit={handleStageSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1.5">Deal Status Stage</label>
                <select
                  value={newDealStage}
                  onChange={(e) => setNewDealStage(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                >
                  <option value="placed">1. In Negotiation</option>
                  <option value="dispatched">2. Deal Agreed & Locked</option>
                  <option value="transit">3. Escrow Locked & In Transit</option>
                  <option value="delivered">4. Completed & Payout Settled</option>
                </select>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForStage(null)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-forest-600 hover:bg-forest-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save Stage Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
