import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Phone, 
  Building, 
  User, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Filter, 
  Send,
  Truck, 
  ChevronRight, 
  CheckCircle2, 
  X,
  ShieldCheck,
  Copy,
  PhoneCall,
  Check
} from 'lucide-react';

export default function SellerPanel({ 
  user, 
  requirements, 
  orders, 
  onUpdateOrderStatus, 
  onSubmitQuote, 
  currentSubView, 
  setCurrentSubView 
}) {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeLeadForQuote, setActiveLeadForQuote] = useState(null);
  
  // Contact modal state
  const [selectedContactLead, setSelectedContactLead] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Quote form state
  const [quotePrice, setQuotePrice] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');
  const [sellerMessage, setSellerMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filter requirements (Marketplace Leads)
  const filteredRequirements = selectedCategoryFilter === 'All' 
    ? requirements 
    : requirements.filter(req => req.category.toLowerCase() === selectedCategoryFilter.toLowerCase());

  // Filter orders fulfilled by this seller
  const sellerOrders = orders.filter(ord => ord.sellerName === user?.company);

  // Copy phone number helper
  const handleCopyPhone = (phoneNum) => {
    navigator.clipboard.writeText(phoneNum);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Trigger Quote modal
  const handleOpenQuoteModal = (lead) => {
    setActiveLeadForQuote(lead);
    setQuotePrice(lead.targetPrice.toString());
    setDeliveryDays('10');
    setSellerMessage(`We can supply premium quality ${lead.articleName} matching your exact specifications. Contact us to finalize details.`);
    setIsQuoteModalOpen(true);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quotePrice || !deliveryDays) return;

    onSubmitQuote(activeLeadForQuote.id, {
      quotePrice: parseFloat(quotePrice),
      deliveryDays: parseInt(deliveryDays),
      sellerMessage,
      sellerName: user?.name || 'Green Fields Exports',
      sellerCompany: user?.company || 'Green Fields Exports'
    });

    setSuccessMsg('Quote submitted successfully! The buyer has been notified.');
    
    setTimeout(() => {
      setIsQuoteModalOpen(false);
      setSuccessMsg('');
      setActiveLeadForQuote(null);
    }, 2000);
  };

  // Helper: return tracking step button style
  const getStatusButtonClass = (orderStatus, targetStatus) => {
    const base = "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ";
    if (orderStatus === targetStatus) {
      return base + "bg-earth-600 text-white border-earth-650 shadow-xs";
    }
    return base + "bg-white text-slate-600 border-slate-200 hover:bg-slate-50";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Seller Header Banner */}
      <div className="bg-gradient-to-r from-earth-700 to-earth-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-earth-900/10 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-earth-200 uppercase tracking-widest bg-earth-800/60 px-3 py-1 rounded-full">
              Seller Panel
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display mt-2">
              Merchant & Supply Center
            </h1>
            <p className="text-xs sm:text-sm text-earth-100 mt-1 max-w-xl">
              Fulfill bulk orders, submit crop pricing quotes, and trace live shipments for <span className="font-semibold text-white">{user?.company || 'Green Fields Exports'}</span>.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentSubView('seller-leads')}
              className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all ${
                currentSubView === 'seller-leads' 
                  ? 'bg-white text-earth-700 font-bold' 
                  : 'bg-earth-800/60 hover:bg-earth-800/80 text-white border border-earth-600/40'
              }`}
            >
              Browse Leads Feed ({requirements.length})
            </button>
            <button
              onClick={() => setCurrentSubView('seller-fulfillment')}
              className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all ${
                currentSubView === 'seller-fulfillment' 
                  ? 'bg-white text-earth-700 font-bold' 
                  : 'bg-earth-800/60 hover:bg-earth-800/80 text-white border border-earth-600/40'
              }`}
            >
              Fulfillment Manager ({sellerOrders.length})
            </button>
          </div>
        </div>
      </div>

      {/* SUBVIEW ROUTER */}
      {currentSubView === 'seller-dashboard' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary metrics widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Leads Available</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">{requirements.length}</h3>
                <span className="text-xs text-earth-600 font-semibold block mt-1">Ready for bidding</span>
              </div>
              <div className="p-3 bg-earth-50 text-earth-600 rounded-xl">
                <Briefcase size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">My Active Fulfillments</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">
                  {sellerOrders.filter(o => o.status !== 'delivered').length}
                </h3>
                <span className="text-xs text-blue-600 font-semibold block mt-1">Ongoing dispatches</span>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Truck size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Orders</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">
                  {sellerOrders.filter(o => o.status === 'delivered').length}
                </h3>
                <span className="text-xs text-green-600 font-semibold block mt-1">Delivered successfully</span>
              </div>
              <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                <CheckCircle2 size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue Handled</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">
                  ${sellerOrders.reduce((sum, o) => sum + (o.price * o.quantity), 0).toLocaleString()}
                </h3>
                <span className="text-xs text-slate-500 block mt-1">Based on closed order price</span>
              </div>
              <div className="p-3 bg-slate-50 text-slate-600 rounded-xl">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Leads List */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900">Hot Sourcing Leads</h3>
                  <p className="text-xs text-slate-500">Live commodity sourcing leads posted by verified buyers</p>
                </div>
                <button
                  onClick={() => setCurrentSubView('seller-leads')}
                  className="text-xs font-semibold text-earth-600 hover:text-earth-700 flex items-center gap-0.5"
                >
                  Explore Leads Feed <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-4 divide-y divide-slate-100 flex-1">
                {requirements.slice(0, 3).map((lead) => (
                  <div key={lead.id} className="pt-4 first:pt-0 flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{lead.articleName}</h4>
                      <div className="flex gap-2 items-center mt-1">
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[9px] font-bold uppercase">
                          {lead.category}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">{lead.quantity} {lead.unit}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-medium flex items-center gap-1">
                        <Building size={12} />
                        {lead.buyerCompany}
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-800">
                        Target: ${lead.targetPrice}/{lead.unit === 'Tons' ? 'Ton' : 'Kg'}
                      </span>
                      <button
                        onClick={() => handleOpenQuoteModal(lead)}
                        className="mt-2 px-3 py-1 bg-earth-600 hover:bg-earth-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
                      >
                        {lead.status === 'quoted' ? 'Update Quote' : 'Quick Quote'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active dispatches list */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900">Active Shipments Fulfilling</h3>
                  <p className="text-xs text-slate-500">Trace your dispatches and update status</p>
                </div>
                <button
                  onClick={() => setCurrentSubView('seller-fulfillment')}
                  className="text-xs font-semibold text-earth-600 hover:text-earth-700 flex items-center gap-0.5"
                >
                  Manage Shipments <ChevronRight size={14} />
                </button>
              </div>

              {sellerOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-center flex-1 border-2 border-dashed border-slate-100 rounded-xl">
                  <Truck size={36} className="mb-2 text-slate-300" />
                  <p className="text-xs font-semibold">No active shipments in your queue</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Bid on crop requirements to close sales.</p>
                </div>
              ) : (
                <div className="space-y-4 flex-1">
                  {sellerOrders.slice(0, 2).map((ord) => (
                    <div key={ord.id} className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">ORDER ID: {ord.id}</span>
                          <h4 className="font-bold text-slate-800 text-sm mt-0.5">{ord.articleName}</h4>
                          <span className="text-xs text-slate-500 block">Buyer: <span className="font-semibold">{ord.buyerCompany}</span></span>
                        </div>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase">
                          {ord.status}
                        </span>
                      </div>
                      
                      {/* Short fulfillment tracking controller */}
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-200/60 pt-3">
                        <button
                          onClick={() => onUpdateOrderStatus(ord.id, 'dispatched')}
                          className={getStatusButtonClass(ord.status, 'dispatched')}
                        >
                          Dispatched
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(ord.id, 'transit')}
                          className={getStatusButtonClass(ord.status, 'transit')}
                        >
                          In Transit
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                          className={getStatusButtonClass(ord.status, 'delivered')}
                        >
                          Delivered
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentSubView === 'seller-leads' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Feed Filter */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter Crop Category:</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {['All', 'Grains', 'Vegetables', 'Fruits', 'Equipment', 'Fertilizers'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategoryFilter === cat 
                      ? 'bg-earth-600 text-white shadow-xs' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Leads Grid */}
          {filteredRequirements.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl py-20 text-center text-slate-400">
              <Briefcase size={48} className="mx-auto mb-3 text-slate-200" />
              <p className="text-sm font-semibold">No crop sourcing leads available</p>
              <p className="text-xs text-slate-400 mt-1">Try switching the category filter above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRequirements.map((lead) => (
                <div 
                  key={lead.id} 
                  className={`bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group ${
                    lead.status === 'quoted' ? 'border-earth-300 ring-2 ring-earth-50/50' : ''
                  }`}
                >
                  {/* Quoted indicator flag */}
                  {lead.status === 'quoted' && (
                    <div className="absolute top-0 right-0 bg-earth-600 text-white text-[9px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 size={10} />
                      Quote Sent
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="px-2 py-0.5 bg-slate-150 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                          {lead.category}
                        </span>
                        <h3 className="text-lg font-bold font-display text-slate-900 mt-1.5">
                          {lead.articleName}
                        </h3>
                      </div>
                      <div className="text-right mt-1.5">
                        <span className="text-slate-400 text-xs font-semibold uppercase block">Quantity Needed</span>
                        <span className="text-slate-900 font-extrabold text-lg">{lead.quantity} {lead.unit}</span>
                      </div>
                    </div>

                    {/* Target and timeline details */}
                    <div className="grid grid-cols-2 gap-4 py-3 bg-slate-50 rounded-xl px-4 border border-slate-150/50 mb-5">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase block">Target Price Offer</span>
                        <span className="text-slate-900 font-bold text-sm">
                          ${lead.targetPrice}/{lead.unit === 'Tons' ? 'Ton' : 'Kg'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase block">Required Delivery</span>
                        <span className="text-slate-900 font-bold text-sm">{lead.deliveryTimeline}</span>
                      </div>
                    </div>

                    {/* Verified Buyer Contact Details */}
                    <div className="border-t border-slate-100 pt-4 mt-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                        <ShieldCheck size={13} className="text-forest-600" />
                        Verified Buyer Contact Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <User size={13} className="text-slate-400" />
                          <span className="font-semibold text-slate-800">{lead.buyerName || 'Lead Buyer'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building size={13} className="text-slate-400" />
                          <span className="font-semibold text-slate-800 truncate" title={lead.buyerCompany}>
                            {lead.buyerCompany}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-slate-400" />
                          <span>{lead.buyerPhone || '+91 98765 00000'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-slate-400" />
                          <span className="truncate" title={lead.buyerLocation}>{lead.buyerLocation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => handleOpenQuoteModal(lead)}
                      className="flex-1 py-2.5 bg-earth-600 hover:bg-earth-700 text-white font-bold rounded-xl text-xs shadow-md shadow-earth-100/50 flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Send size={13} />
                      {lead.status === 'quoted' ? 'Submit Revised Quote' : lead.status === 'fulfilled' ? 'Supply Extra Quote' : 'Quick Quote'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedContactLead(lead)}
                      className="px-3 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center cursor-pointer transition-all"
                      title="Contact Buyer Directly"
                    >
                      <Phone size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {currentSubView === 'seller-fulfillment' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden animate-fadeIn">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold font-display text-slate-900">Active Supply Fulfillment Center</h2>
            <p className="text-xs text-slate-500">Update shipping logistics stage which updates the buyer's tracking view immediately</p>
          </div>

          {sellerOrders.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <Truck size={48} className="mx-auto mb-3 text-slate-200" />
              <p className="text-sm font-semibold">No bulk orders assigned for supply yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Submit competitive quotes on buyer requirements. Once the buyer confirms logistics, the orders show up here.
              </p>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {sellerOrders.map((ord) => (
                <div 
                  key={ord.id}
                  className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">ORDER ID: {ord.id}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                        ord.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {ord.status}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 font-display">{ord.articleName}</h3>
                    
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600">
                      <div>Quantity: <span className="font-semibold text-slate-800">{ord.quantity} {ord.unit}</span></div>
                      <div>Negotiated: <span className="font-semibold text-slate-800">${ord.price}/{ord.unit === 'Tons' ? 'Ton' : 'Kg'}</span></div>
                      <div>Buyer Co: <span className="font-semibold text-slate-800">{ord.buyerCompany}</span></div>
                      <div>Total Value: <span className="font-bold text-slate-900">${(ord.price * ord.quantity).toLocaleString()}</span></div>
                    </div>
                  </div>

                  {/* Shipment Status controllers */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 min-w-[280px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-100 pb-1.5">
                      Logistics Status Control
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'placed')}
                        className={getStatusButtonClass(ord.status, 'placed')}
                      >
                        1. Awaiting Dispatch
                      </button>
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'dispatched')}
                        className={getStatusButtonClass(ord.status, 'dispatched')}
                      >
                        2. Dispatched
                      </button>
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'transit')}
                        className={getStatusButtonClass(ord.status, 'transit')}
                      >
                        3. In Transit
                      </button>
                      <button
                        onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                        className={getStatusButtonClass(ord.status, 'delivered')}
                      >
                        4. Delivered
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-forest-600" />
                      <span>Updating status changes the Buyer's screen live.</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* QUICK QUOTE MODAL */}
      {isQuoteModalOpen && activeLeadForQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <Briefcase className="text-earth-600" size={18} />
                <h3 className="text-base font-bold text-slate-900 font-display">Submit Commercial Quote</h3>
              </div>
              <button 
                onClick={() => setIsQuoteModalOpen(false)}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
              {successMsg && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  {successMsg}
                </div>
              )}

              {/* Crop Sourcing Lead Summary */}
              <div className="p-3 bg-earth-50/50 border border-earth-150 rounded-xl text-xs space-y-1">
                <div>Lead: <span className="font-bold text-slate-800">{activeLeadForQuote.articleName} ({activeLeadForQuote.quantity} {activeLeadForQuote.unit})</span></div>
                <div>Buyer: <span className="font-semibold text-slate-700">{activeLeadForQuote.buyerCompany}</span></div>
                <div>Target price was: <span className="font-semibold text-slate-700">${activeLeadForQuote.targetPrice}/{activeLeadForQuote.unit === 'Tons' ? 'Ton' : 'Kg'}</span></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Price Quote (USD)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-2 text-slate-400 text-sm font-bold">$</div>
                  <input
                    type="number"
                    required
                    min="1"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value)}
                    placeholder="e.g. 1150"
                    className="w-full pl-7 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-earth-600 focus:bg-white"
                  />
                  <div className="absolute right-3 top-2 text-slate-400 text-xs font-medium">
                    Per {activeLeadForQuote.unit === 'Tons' ? 'Ton' : 'Kg'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Est. Delivery Days
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={deliveryDays}
                  onChange={(e) => setDeliveryDays(e.target.value)}
                  placeholder="e.g. 10"
                  className="w-full px-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-earth-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cover Message / Guarantee
                </label>
                <textarea
                  value={sellerMessage}
                  onChange={(e) => setSellerMessage(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-earth-600 focus:bg-white"
                  placeholder="Provide supply specifications, packaging details, and certs."
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-earth-600 hover:bg-earth-700 text-white rounded-xl text-xs font-bold shadow-md shadow-earth-100 cursor-pointer"
                >
                  Send Quote Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTACT BUYER MODAL */}
      {selectedContactLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-forest-600" size={18} />
                <h3 className="text-base font-bold text-slate-900 font-display">Verified Buyer Contact</h3>
              </div>
              <button 
                onClick={() => setSelectedContactLead(null)}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center pb-2 border-b border-slate-100">
                <div className="w-12 h-12 bg-forest-50 text-forest-700 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                  {selectedContactLead.buyerName ? selectedContactLead.buyerName.charAt(0) : 'B'}
                </div>
                <h4 className="font-bold text-slate-900 text-base">{selectedContactLead.buyerName}</h4>
                <p className="text-xs font-semibold text-forest-700">{selectedContactLead.buyerCompany}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{selectedContactLead.buyerLocation}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Requirement Detail</span>
                <p className="text-xs font-semibold text-slate-800">{selectedContactLead.articleName} ({selectedContactLead.quantity} {selectedContactLead.unit})</p>
                <p className="text-[11px] text-slate-500">Target Price: ${selectedContactLead.targetPrice}/{selectedContactLead.unit === 'Tons' ? 'Ton' : 'Kg'}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Direct Phone Number</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 bg-slate-100 rounded-xl font-mono text-xs font-bold text-slate-800 border border-slate-200">
                    {selectedContactLead.buyerPhone || '+91 98765 00000'}
                  </div>
                  <button
                    onClick={() => handleCopyPhone(selectedContactLead.buyerPhone || '+91 98765 00000')}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
                    title="Copy Phone Number"
                  >
                    {copiedPhone ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                </div>
                {copiedPhone && (
                  <span className="text-[10px] text-green-600 font-bold mt-1 block">Phone number copied to clipboard!</span>
                )}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedContactLead(null)}
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={`tel:${selectedContactLead.buyerPhone}`}
                  className="flex-1 py-2.5 bg-forest-600 hover:bg-forest-700 text-white rounded-xl text-xs font-bold shadow-md shadow-forest-100 flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <PhoneCall size={14} />
                  Call Buyer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

