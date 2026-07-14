import React, { useState } from 'react';
import { 
  PlusCircle, 
  FileText, 
  Truck, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Package,
  Calendar,
  DollarSign,
  Tag,
  ChevronRight,
  Phone,
  Building,
  MapPin
} from 'lucide-react';

export default function BuyerPanel({ 
  user, 
  requirements, 
  orders, 
  onPostRequirement, 
  currentSubView, 
  setCurrentSubView 
}) {
  // Filter data for this logged-in buyer
  const buyerRequirements = requirements.filter(req => req.buyerCompany === user.company);
  const buyerOrders = orders.filter(ord => ord.buyerCompany === user.company);

  // Form states
  const [articleName, setArticleName] = useState('');
  const [category, setCategory] = useState('Grains');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Tons');
  const [deliveryTimeline, setDeliveryTimeline] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [successMsg, setSuccessMsg] = useState('');

  // Local state for selecting order detail in tracking
  const [selectedOrderId, setSelectedOrderId] = useState(buyerOrders[0]?.id || null);
  const activeTrackingOrder = buyerOrders.find(ord => ord.id === selectedOrderId) || buyerOrders[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!articleName || !quantity || !deliveryTimeline || !targetPrice) return;

    onPostRequirement({
      articleName,
      category,
      quantity: parseFloat(quantity),
      unit,
      deliveryTimeline,
      targetPrice: parseFloat(targetPrice),
      currency
    });

    // Reset form
    setArticleName('');
    setQuantity('');
    setDeliveryTimeline('');
    setTargetPrice('');
    setSuccessMsg('Requirement posted successfully to the Seller Marketplace Leads feed!');
    
    setTimeout(() => {
      setSuccessMsg('');
      setCurrentSubView('buyer-my-requirements');
    }, 2000);
  };

  // Stepper helper
  const renderStepper = (status) => {
    const steps = [
      { id: 'placed', label: 'Order Placed', desc: 'Awaiting dispatch' },
      { id: 'dispatched', label: 'Dispatched', desc: 'Left warehouse' },
      { id: 'transit', label: 'In Transit', desc: 'On its way' },
      { id: 'delivered', label: 'Delivered', desc: 'Received & verified' }
    ];

    const getStatusIndex = (currentStatus) => {
      switch(currentStatus) {
        case 'placed': return 0;
        case 'dispatched': return 1;
        case 'transit': return 2;
        case 'delivered': return 3;
        default: return 0;
      }
    };

    const activeIndex = getStatusIndex(status);

    return (
      <div className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-slate-200 -translate-y-1/2 hidden md:block z-0">
            <div 
              className="h-full bg-forest-500 transition-all duration-500" 
              style={{ width: `${(activeIndex / 3) * 100}%` }}
            />
          </div>

          {steps.map((step, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            const isPending = idx > activeIndex;

            let stepColor = "bg-slate-100 border-slate-200 text-slate-400";
            if (isCompleted) stepColor = "bg-forest-600 border-forest-600 text-white shadow-md shadow-forest-100";
            if (isCurrent) stepColor = "bg-white border-forest-600 text-forest-700 ring-4 ring-forest-50 font-bold";

            return (
              <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-2 flex-1 w-full md:w-auto relative z-10">
                {/* Circle Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm transition-all duration-300 ${stepColor}`}>
                  {isCompleted ? <CheckCircle size={18} /> : <span>0{idx+1}</span>}
                </div>

                {/* Text */}
                <div className="text-left md:text-center">
                  <h4 className={`text-sm font-semibold ${isCurrent ? 'text-forest-700' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                    {step.label}
                  </h4>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Buyer Header Banner */}
      <div className="bg-gradient-to-r from-forest-700 to-forest-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-forest-900/10 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-forest-200 uppercase tracking-widest bg-forest-800/60 px-3 py-1 rounded-full">
              Buyer Panel
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display mt-2">
              Procurement Hub
            </h1>
            <p className="text-xs sm:text-sm text-forest-100 mt-1 max-w-xl">
              Logistics, requirements, and orders managed for <span className="font-semibold">{user.company}</span>.
            </p>
          </div>
          <button
            onClick={() => setCurrentSubView('buyer-post-requirement')}
            className="flex items-center gap-2 px-5 py-3 bg-white text-forest-700 hover:bg-forest-50 font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5 text-sm"
          >
            <PlusCircle size={18} />
            Post New Requirement
          </button>
        </div>
      </div>

      {/* SUBVIEW ROUTER */}
      {currentSubView === 'buyer-dashboard' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary metrics widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Requirements</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">{buyerRequirements.length}</h3>
                <span className="text-xs text-forest-600 font-medium flex items-center gap-1 mt-1">
                  Active in Marketplace
                </span>
              </div>
              <div className="p-3 bg-forest-50 text-forest-600 rounded-xl">
                <FileText size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Shipments</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">
                  {buyerOrders.filter(o => o.status !== 'delivered').length}
                </h3>
                <span className="text-xs text-amber-600 font-medium flex items-center gap-1 mt-1">
                  In Transit / Dispatched
                </span>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Truck size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fulfillment Rate</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">
                  {buyerRequirements.length > 0 
                    ? `${Math.round((buyerRequirements.filter(r => r.status === 'fulfilled').length / buyerRequirements.length) * 100)}%` 
                    : '100%'}
                </h3>
                <span className="text-xs text-slate-500 font-medium mt-1 block">
                  Procured vs requested
                </span>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <CheckCircle size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Est. Budget Managed</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">
                  ${buyerRequirements.reduce((sum, r) => sum + (r.targetPrice * r.quantity), 0).toLocaleString()}
                </h3>
                <span className="text-xs text-slate-500 font-medium mt-1 block">
                  Based on target prices
                </span>
              </div>
              <div className="p-3 bg-earth-50 text-earth-600 rounded-xl">
                <TrendingUp size={24} />
              </div>
            </div>
          </div>

          {/* Grid Layout: Active Requirements + Active Deliveries */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Active requirements short list */}
            <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900">Recent Requirements</h3>
                  <p className="text-xs text-slate-500">Commodity sourcing listings posted by you</p>
                </div>
                <button
                  onClick={() => setCurrentSubView('buyer-my-requirements')}
                  className="text-xs font-semibold text-forest-600 hover:text-forest-700 flex items-center gap-0.5"
                >
                  View All <ChevronRight size={14} />
                </button>
              </div>

              {buyerRequirements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-center flex-1 border-2 border-dashed border-slate-100 rounded-xl">
                  <FileText size={36} className="mb-2 text-slate-300" />
                  <p className="text-sm font-semibold">No requirements posted yet</p>
                  <button
                    onClick={() => setCurrentSubView('buyer-post-requirement')}
                    className="text-xs text-forest-600 hover:underline font-semibold mt-1"
                  >
                    Post your first requirement
                  </button>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-slate-100 flex-1">
                  {buyerRequirements.slice(0, 3).map((req) => (
                    <div key={req.id} className="pt-4 first:pt-0 flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-sm text-slate-900">{req.articleName}</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold uppercase">
                            {req.category}
                          </span>
                          <span className="text-slate-500 text-xs font-medium">
                            {req.quantity} {req.unit}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          req.status === 'active' 
                            ? 'bg-green-50 text-green-700 border border-green-150' 
                            : req.status === 'quoted' 
                              ? 'bg-amber-50 text-amber-700 border border-amber-150' 
                              : 'bg-slate-150 text-slate-600'
                        }`}>
                          {req.status === 'active' ? 'Active' : req.status === 'quoted' ? 'Quotes Rec' : 'Fulfilled'}
                        </span>
                        <div className="text-xs text-slate-400 mt-1 font-semibold">
                          Target: ${req.targetPrice}/{req.unit === 'Tons' ? 'Ton' : 'Kg'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Track Status Card */}
            <div className="lg:col-span-6 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900">Active Shipments</h3>
                  <p className="text-xs text-slate-500">Live order delivery status tracking</p>
                </div>
                <button
                  onClick={() => setCurrentSubView('buyer-order-tracking')}
                  className="text-xs font-semibold text-forest-600 hover:text-forest-700 flex items-center gap-0.5"
                >
                  Full Tracking Details <ChevronRight size={14} />
                </button>
              </div>

              {buyerOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-center flex-1 border-2 border-dashed border-slate-100 rounded-xl">
                  <Truck size={36} className="mb-2 text-slate-300" />
                  <p className="text-sm font-semibold">No active shipments</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                    Once a seller accepts a quote and fulfilling begins, orders will show up here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 flex-1">
                  {/* Current Active Tracking Mini-Card */}
                  <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          ORDER ID: {buyerOrders[0].id}
                        </span>
                        <h4 className="font-bold text-slate-800 text-sm mt-1">
                          {buyerOrders[0].articleName} ({buyerOrders[0].quantity} {buyerOrders[0].unit})
                        </h4>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Supplier: <span className="font-semibold text-slate-700">{buyerOrders[0].sellerName}</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        buyerOrders[0].status === 'delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : buyerOrders[0].status === 'transit' 
                            ? 'bg-blue-100 text-blue-800 animate-pulse' 
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {buyerOrders[0].status.toUpperCase()}
                      </span>
                    </div>

                    {/* Progress Bar (simple) */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Fulfillment Stage:</span>
                        <span className="font-bold text-forest-700">
                          {buyerOrders[0].status === 'placed' && 'Placed'}
                          {buyerOrders[0].status === 'dispatched' && 'Dispatched'}
                          {buyerOrders[0].status === 'transit' && 'In Transit'}
                          {buyerOrders[0].status === 'delivered' && 'Delivered'}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-forest-600" 
                          style={{
                            width: 
                              buyerOrders[0].status === 'placed' ? '25%' :
                              buyerOrders[0].status === 'dispatched' ? '50%' :
                              buyerOrders[0].status === 'transit' ? '75%' : '100%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentSubView === 'buyer-post-requirement' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden max-w-2xl mx-auto animate-fadeIn">
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2.5 bg-forest-100 text-forest-700 rounded-xl">
              <PlusCircle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900">Post a Crop / Crop Commodity Requirement</h2>
              <p className="text-xs text-slate-500">Listed instantly onto the Seller Marketplace Leads feed</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {successMsg && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle size={16} />
                {successMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Article / Crop Name
                </label>
                <div className="relative">
                  <Tag size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={articleName}
                    onChange={(e) => setArticleName(e.target.value)}
                    placeholder="e.g. Premium Basmati Rice"
                    className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                >
                  <option value="Grains">Grains (Rice, Wheat, Corn)</option>
                  <option value="Vegetables">Vegetables (Potatoes, Onions, Tomatoes)</option>
                  <option value="Fruits">Fruits (Mangoes, Apples, Bananas)</option>
                  <option value="Equipment">Farming Equipment / Tools</option>
                  <option value="Fertilizers">Fertilizers & Seed Packs</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Quantity Needed
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    required
                    min="1"
                    step="any"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 50"
                    className="flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-28 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                  >
                    <option value="Tons">Tons</option>
                    <option value="Kgs">Kgs</option>
                    <option value="Quintals">Quintals</option>
                    <option value="Crates">Crates</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Price
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-slate-400 text-sm font-semibold">
                    $
                  </div>
                  <input
                    type="number"
                    required
                    min="1"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="Per unit price"
                    className="w-full pl-7 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Delivery Timeline
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={deliveryTimeline}
                  onChange={(e) => setDeliveryTimeline(e.target.value)}
                  placeholder="e.g. Within 15 Days (by August 30)"
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Quick Procuring Details Preview */}
            <div className="p-4 bg-forest-50 border border-forest-150 rounded-xl text-forest-800 text-xs">
              <span className="font-bold">Posting Preview:</span> Listing will include crop details, metric unit, and buyer company info (<span className="font-semibold">{user.company}</span>, Located in: <span className="font-semibold">{user.location}</span>). It will show up live for sellers to send quick price quotes.
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl shadow-md shadow-forest-100 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              Broadcast Requirement
            </button>
          </form>
        </div>
      )}

      {currentSubView === 'buyer-my-requirements' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden animate-fadeIn">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900">My Sourcing History</h2>
              <p className="text-xs text-slate-500">List of all active and completed crop purchase requirements</p>
            </div>
            <button
              onClick={() => setCurrentSubView('buyer-post-requirement')}
              className="px-4 py-2 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
            >
              <PlusCircle size={14} />
              Post New
            </button>
          </div>

          {buyerRequirements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-center">
              <FileText size={48} className="mb-3 text-slate-300" />
              <p className="text-sm font-semibold">You have not posted any crop requirements yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[280px]">
                Create a posting to receive live pricing quotes from certified farmers and suppliers.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Article / Crop</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Target Price</th>
                    <th className="px-6 py-4">Timeline</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {buyerRequirements.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-950">{req.articleName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold uppercase">
                          {req.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {req.quantity} {req.unit}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        ${req.targetPrice}/{req.unit === 'Tons' ? 'Ton' : 'Kg'}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {req.deliveryTimeline}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          req.status === 'active'
                            ? 'bg-green-50 text-green-700 border border-green-100'
                            : req.status === 'quoted'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-slate-100 text-slate-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            req.status === 'active' ? 'bg-green-600' : req.status === 'quoted' ? 'bg-amber-500' : 'bg-slate-400'
                          }`} />
                          {req.status === 'active' ? 'Active' : req.status === 'quoted' ? 'Offers Rec.' : 'Fulfilled'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {currentSubView === 'buyer-order-tracking' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
          {/* Order Side List */}
          <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col max-h-[600px] overflow-y-auto">
            <h3 className="text-lg font-bold font-display text-slate-900 mb-4">Active Orders</h3>
            
            {buyerOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-center border-2 border-dashed border-slate-100 rounded-xl flex-1">
                <Package size={36} className="mb-2 text-slate-300" />
                <p className="text-xs font-semibold">No orders currently active</p>
              </div>
            ) : (
              <div className="space-y-3 flex-1">
                {buyerOrders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrderId(ord.id)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      (activeTrackingOrder && activeTrackingOrder.id === ord.id)
                        ? 'border-forest-600 bg-forest-50/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        ID: {ord.id}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                        ord.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {ord.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mt-1">{ord.articleName}</h4>
                    <div className="flex justify-between items-center text-xs text-slate-500 mt-2 font-medium">
                      <span>{ord.quantity} {ord.unit}</span>
                      <span className="text-slate-900 font-semibold">${(ord.price * ord.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stepper details */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col">
            {activeTrackingOrder ? (
              <div className="flex-1 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-forest-600 bg-forest-50 border border-forest-150 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Active Order Tracking
                      </span>
                      <h2 className="text-xl font-extrabold font-display text-slate-900 mt-1">
                        {activeTrackingOrder.articleName}
                      </h2>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xs text-slate-500">Order ID: <span className="font-semibold text-slate-800">{activeTrackingOrder.id}</span></div>
                      <div className="text-xs text-slate-500">Last update: <span className="font-semibold text-slate-800">{activeTrackingOrder.lastUpdated || 'Today'}</span></div>
                    </div>
                  </div>
                </div>

                {/* Core Stepper Component */}
                {renderStepper(activeTrackingOrder.status)}

                {/* Logistics details list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Supplier Information</h4>
                    <div className="space-y-2.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Building size={14} className="text-slate-400" />
                        <span className="font-semibold text-slate-800">{activeTrackingOrder.sellerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400" />
                        <span>+91 94432 09876</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-slate-400" />
                        <span>Grain Silo #4, Ludhiana Industrial Zone, Punjab</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-150">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Consignment Details</h4>
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Quantity Procured:</span>
                        <span className="font-semibold text-slate-800">{activeTrackingOrder.quantity} {activeTrackingOrder.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Negotiated Price:</span>
                        <span className="font-semibold text-slate-800">${activeTrackingOrder.price}/{activeTrackingOrder.unit === 'Tons' ? 'Ton' : 'Kg'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-semibold text-slate-900">${(activeTrackingOrder.price * activeTrackingOrder.quantity).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200">
                        <span>Freight Service:</span>
                        <span className="font-semibold text-forest-700">AGRILOG Bulk Freight</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-center flex-1">
                <Truck size={48} className="mb-3 text-slate-200" />
                <p className="text-sm font-semibold">Select an order on the left to track delivery status</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
