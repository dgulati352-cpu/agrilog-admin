import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Truck, 
  Wallet, 
  TrendingUp, 
  MessageSquare, 
  User, 
  Settings, 
  HelpCircle, 
  Search, 
  Bell, 
  ChevronDown, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Filter, 
  Send, 
  X, 
  ShieldCheck, 
  Copy, 
  PhoneCall, 
  Check, 
  Building, 
  MapPin, 
  Phone 
} from 'lucide-react';

export default function SellerPanel({ 
  user, 
  requirements = [], 
  orders = [], 
  onUpdateOrderStatus, 
  onSubmitQuote, 
  currentSubView, 
  setCurrentSubView 
}) {
  const [activeTab, setActiveTab] = useState('Dashboard'); // 'Dashboard', 'Products', 'Orders', 'Shipments', 'Finance', 'Analytics', 'Messages', 'Profile', 'Settings'
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [activeLeadForQuote, setActiveLeadForQuote] = useState(null);
  
  // Contact buyer modal state
  const [selectedContactLead, setSelectedContactLead] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Quote form state
  const [quotePrice, setQuotePrice] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');
  const [sellerMessage, setSellerMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filter requirements for marketplace feed
  const filteredRequirements = selectedCategoryFilter === 'All' 
    ? requirements 
    : requirements.filter(req => req.category.toLowerCase() === selectedCategoryFilter.toLowerCase());

  // Filter orders for this seller
  const sellerOrders = orders.filter(ord => ord.sellerName === user?.company || true);

  const handleCopyPhone = (phoneNum) => {
    navigator.clipboard.writeText(phoneNum);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleOpenQuoteModal = (lead) => {
    setActiveLeadForQuote(lead);
    setQuotePrice(lead.targetPrice ? lead.targetPrice.toString() : '1200');
    setDeliveryDays('10');
    setSellerMessage(`We can supply premium quality ${lead.articleName} matching your exact specifications.`);
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

  const sidebarItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, view: 'seller-dashboard' },
    { label: 'Products', icon: <Package size={18} />, view: 'seller-leads' },
    { label: 'Orders', icon: <FileText size={18} />, view: 'seller-fulfillment' },
    { label: 'Shipments', icon: <Truck size={18} />, view: 'seller-fulfillment' },
    { label: 'Finance', icon: <Wallet size={18} />, view: 'seller-dashboard' },
    { label: 'Analytics', icon: <TrendingUp size={18} />, view: 'seller-dashboard' },
    { label: 'Messages', icon: <MessageSquare size={18} />, view: 'seller-dashboard' },
    { label: 'Profile', icon: <User size={18} />, view: 'seller-dashboard' },
    { label: 'Settings', icon: <Settings size={18} />, view: 'seller-dashboard' }
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
                <Package size={20} className="stroke-[2.5]" />
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
                  onClick={() => {
                    setActiveTab(item.label);
                    if (item.view) setCurrentSubView(item.view);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-forest-800/90 text-white font-bold shadow-xs border border-forest-600/40' 
                      : 'text-slate-400 hover:text-white hover:bg-forest-900/60'
                  }`}
                >
                  <span className={isActive ? 'text-gold-400' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Help Box & Profile */}
        <div className="space-y-4 pt-4 border-t border-forest-900/80">
          <div className="bg-forest-900/60 border border-forest-800 p-3.5 rounded-2xl text-center space-y-2">
            <div className="w-8 h-8 bg-forest-800 text-gold-400 rounded-full flex items-center justify-center mx-auto border border-gold-500/30">
              <HelpCircle size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Need Help?</h4>
              <p className="text-[10px] text-slate-400">We're here to help you</p>
            </div>
            <button className="w-full py-1.5 bg-forest-700 hover:bg-forest-600 text-white text-[10px] font-bold rounded-xl transition-all cursor-pointer">
              Contact Support
            </button>
          </div>

          {/* Profile Card */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-forest-900/40 border border-forest-800/60">
            <div className="w-8 h-8 bg-forest-700 rounded-full flex items-center justify-center text-white font-bold text-xs border border-gold-400/30">
              {user?.name ? user.name.charAt(0) : 'S'}
            </div>
            <div className="flex-1 truncate">
              <h4 className="text-xs font-bold text-white truncate">{user?.company || 'Green Fields Exports'}</h4>
              <p className="text-[9px] text-forest-300 font-medium">Seller • Verified</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold font-display text-slate-900">Seller Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-9 pr-4 py-1.5 text-xs bg-slate-100/80 border border-slate-200 rounded-full w-56 focus:outline-hidden focus:bg-white focus:border-forest-600 transition-all"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full relative cursor-pointer">
                <Bell size={18} />
                <span className="w-2 h-2 bg-emerald-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white" />
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 cursor-pointer">
                <span>🌐 English</span>
                <ChevronDown size={12} />
              </div>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-7 h-7 bg-forest-700 text-white rounded-full flex items-center justify-center font-bold text-xs">
                  {user?.name ? user.name.charAt(0) : 'G'}
                </div>
                <span className="text-xs font-bold text-slate-800 hidden lg:inline">{user?.company || 'Green Fields Exports'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY CANVASES */}
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* METRICS ROW (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Revenue</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold font-display text-slate-900">$86,540</h3>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+12.5%</span>
              </div>
              <span className="text-[10px] text-slate-400 block">from last month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Orders</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold font-display text-slate-900">128</h3>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+8.4%</span>
              </div>
              <span className="text-[10px] text-slate-400 block">from last month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Products Listed</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold font-display text-slate-900">24</h3>
                <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">+4 new</span>
              </div>
              <span className="text-[10px] text-slate-400 block">this month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Active Buyers</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold font-display text-slate-900">56</h3>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+10 new</span>
              </div>
              <span className="text-[10px] text-slate-400 block">this month</span>
            </div>
          </div>

          {/* MIDDLE SECTION: Sales Overview Chart + Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sales Overview Line Graph (SVG) */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-display">Sales Overview</h3>
                  <p className="text-xs text-slate-400">Monthly revenue growth trend</p>
                </div>
                <select className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-semibold">
                  <option>This Month</option>
                  <option>Last Quarter</option>
                  <option>Year 2026</option>
                </select>
              </div>

              {/* Line Graph SVG */}
              <div className="h-48 w-full pt-4 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="0" x2="400" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="30" x2="400" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="60" x2="400" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Smooth Curve */}
                  <path 
                    d="M 0,80 Q 50,40 100,70 T 200,30 T 300,50 T 400,20" 
                    fill="none" 
                    stroke="#32561c" 
                    strokeWidth="3" 
                  />

                  {/* Gradient Area under line */}
                  <path 
                    d="M 0,80 Q 50,40 100,70 T 200,30 T 300,50 T 400,20 L 400,120 L 0,120 Z" 
                    fill="url(#forest-grad)" 
                    opacity="0.15" 
                  />

                  <defs>
                    <linearGradient id="forest-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#32561c" />
                      <stop offset="100%" stopColor="#32561c" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Nodes */}
                  <circle cx="0" cy="80" r="4" fill="#32561c" />
                  <circle cx="80" cy="60" r="4" fill="#32561c" />
                  <circle cx="160" cy="40" r="4" fill="#32561c" />
                  <circle cx="240" cy="35" r="4" fill="#32561c" />
                  <circle cx="320" cy="45" r="4" fill="#32561c" />
                  <circle cx="400" cy="20" r="4" fill="#32561c" />
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-semibold">
                  <span>Jun 1</span>
                  <span>Jun 8</span>
                  <span>Jun 15</span>
                  <span>Jun 22</span>
                  <span>Jun 29</span>
                </div>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 text-base font-display">Recent Orders</h3>
                <button 
                  onClick={() => setCurrentSubView('seller-fulfillment')}
                  className="text-xs text-forest-700 hover:underline font-semibold cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3.5 flex-1">
                {[
                  { id: 'ORD-2024-00128', name: 'Organic Basmati Rice', price: '$1,620', status: 'Confirmed', badgeClass: 'bg-emerald-100 text-emerald-800' },
                  { id: 'ORD-2024-00127', name: 'Spices Mix', price: '$2,450', status: 'Processing', badgeClass: 'bg-amber-100 text-amber-800' },
                  { id: 'ORD-2024-00126', name: 'Ceylon Tea', price: '$3,120', status: 'Shipped', badgeClass: 'bg-blue-100 text-blue-800' },
                  { id: 'ORD-2024-00125', name: 'Natural Cotton', price: '$4,760', status: 'Delivered', badgeClass: 'bg-slate-100 text-slate-800' },
                  { id: 'ORD-2024-00124', name: 'Millets', price: '$1,960', status: 'Delivered', badgeClass: 'bg-slate-100 text-slate-800' }
                ].map((ord) => (
                  <div key={ord.id} className="flex justify-between items-center p-2.5 hover:bg-slate-50 rounded-xl transition-all border border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{ord.id}</span>
                      <h4 className="text-xs font-bold text-slate-800">{ord.name}</h4>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-900">{ord.price}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${ord.badgeClass}`}>
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: Top Performing Products + Account Summary Wallet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Top Performing Products */}
            <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 text-base font-display">Top Performing Products</h3>
                <button 
                  onClick={() => setCurrentSubView('seller-leads')}
                  className="text-xs text-forest-700 hover:underline font-semibold cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[
                  { title: 'Organic Basmati Rice', price: '$1,250 / MT', growth: '+15%', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80' },
                  { title: 'Arabica Coffee Beans', price: '$4,250 / MT', growth: '+8%', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80' },
                  { title: 'Premium Spices', price: '$2,350 / MT', growth: '+18%', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80' },
                  { title: 'Organic Millets', price: '$780 / MT', growth: '+12%', img: 'https://images.unsplash.com/photo-1627736631481-99d89260a920?w=300&q=80' },
                  { title: 'Ceylon Tea', price: '$2,150 / MT', growth: '+10%', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&q=80' }
                ].map((p, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5 flex flex-col justify-between hover:shadow-xs transition-all">
                    <img src={p.img} alt={p.title} className="w-full h-20 object-cover rounded-lg mb-2" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 truncate" title={p.title}>{p.title}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[11px] font-semibold text-forest-700">{p.price}</span>
                        <span className="text-[9px] text-emerald-600 font-bold bg-emerald-100 px-1 py-0.5 rounded">{p.growth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Summary Wallet */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-slate-900 text-base font-display">Account Summary</h3>
                  <Wallet className="text-earth-600" size={20} />
                </div>
                <p className="text-xs text-slate-400">Escrow payout balance</p>

                <div className="my-6">
                  <span className="text-xs text-slate-500 font-semibold uppercase block">Available Balance</span>
                  <h2 className="text-3xl font-extrabold font-display text-slate-900">$24,680.50</h2>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-forest-700 hover:bg-forest-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer">
                  Withdraw
                </button>
                <button className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer">
                  Transactions
                </button>
              </div>
            </div>

          </div>

          {/* SUBVIEW ROUTING FOR MARKETPLACE LEADS & FULFILLMENT */}
          {currentSubView === 'seller-leads' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-display">Marketplace Sourcing Leads</h2>
                  <p className="text-xs text-slate-500">Submit competitive pricing quotes directly to verified buyers</p>
                </div>
                
                <div className="flex gap-2">
                  {['All', 'Grains', 'Vegetables', 'Fruits', 'Equipment'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        selectedCategoryFilter === cat ? 'bg-forest-700 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRequirements.map((lead) => (
                  <div key={lead.id} className="p-5 border border-slate-200 rounded-2xl space-y-4 hover:border-forest-400 transition-all bg-slate-50/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-0.5 bg-forest-100 text-forest-800 rounded text-[10px] font-bold uppercase">{lead.category}</span>
                        <h3 className="font-bold text-slate-900 text-base mt-1">{lead.articleName}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase">Needed</span>
                        <span className="font-bold text-slate-900 text-sm">{lead.quantity} {lead.unit}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200">
                      <div>Target Offer: <span className="font-bold text-slate-900">${lead.targetPrice}/{lead.unit === 'Tons' ? 'Ton' : 'Kg'}</span></div>
                      <div>Timeline: <span className="font-semibold text-slate-700">{lead.deliveryTimeline}</span></div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-600 border-t border-slate-200/60 pt-3">
                      <div>Buyer: <span className="font-bold text-slate-800">{lead.buyerCompany}</span></div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenQuoteModal(lead)}
                          className="px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                        >
                          Quick Quote
                        </button>
                        <button
                          onClick={() => setSelectedContactLead(lead)}
                          className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs cursor-pointer"
                        >
                          <Phone size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSubView === 'seller-fulfillment' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900 font-display">Active Supply Fulfillment Center</h2>
                <p className="text-xs text-slate-500">Update shipping logistics stages for ongoing order dispatches</p>
              </div>

              <div className="space-y-4">
                {sellerOrders.map((ord) => (
                  <div key={ord.id} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">ORDER ID: {ord.id}</span>
                      <h3 className="font-bold text-slate-900 text-base">{ord.articleName}</h3>
                      <p className="text-xs text-slate-500">Buyer: <span className="font-bold text-slate-800">{ord.buyerCompany}</span> | Value: <span className="font-bold text-slate-900">${(ord.price * ord.quantity).toLocaleString()}</span></p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {['placed', 'dispatched', 'transit', 'delivered'].map((st) => (
                        <button
                          key={st}
                          onClick={() => onUpdateOrderStatus(ord.id, st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                            ord.status === st ? 'bg-forest-700 text-white' : 'bg-white border border-slate-200 text-slate-600'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* QUICK QUOTE MODAL */}
      {isQuoteModalOpen && activeLeadForQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900 font-display">Submit Quote Offer</h3>
              <button onClick={() => setIsQuoteModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="p-5 space-y-4">
              {successMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl">
                  {successMsg}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Your Price Quote ($/MT)</label>
                <input 
                  type="number" 
                  required 
                  value={quotePrice} 
                  onChange={(e) => setQuotePrice(e.target.value)} 
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Est. Delivery Days</label>
                <input 
                  type="number" 
                  required 
                  value={deliveryDays} 
                  onChange={(e) => setDeliveryDays(e.target.value)} 
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Cover Message</label>
                <textarea 
                  value={sellerMessage} 
                  onChange={(e) => setSellerMessage(e.target.value)} 
                  rows="2" 
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl" 
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsQuoteModalOpen(false)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-forest-700 text-white text-xs font-bold rounded-xl shadow-xs">Send Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTACT BUYER MODAL */}
      {selectedContactLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center space-y-4">
            <h3 className="font-bold text-slate-900 text-base">{selectedContactLead.buyerName || 'Verified Buyer'}</h3>
            <p className="text-xs text-forest-700 font-semibold">{selectedContactLead.buyerCompany}</p>

            <div className="bg-slate-100 p-3 rounded-xl font-mono text-xs font-bold text-slate-800">
              {selectedContactLead.buyerPhone || '+91 98765 00000'}
            </div>

            <div className="flex gap-2 pt-2">
              <button onClick={() => handleCopyPhone(selectedContactLead.buyerPhone || '+91 98765 00000')} className="flex-1 py-2 bg-slate-100 text-xs font-bold rounded-xl">Copy</button>
              <button onClick={() => setSelectedContactLead(null)} className="flex-1 py-2 bg-forest-700 text-white text-xs font-bold rounded-xl">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
