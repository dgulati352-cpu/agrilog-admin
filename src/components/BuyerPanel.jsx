import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  FileText, 
  Truck, 
  Heart, 
  Wallet, 
  MessageSquare, 
  TrendingUp, 
  User, 
  Settings, 
  Search, 
  Bell, 
  ChevronDown, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Star, 
  Building, 
  MapPin, 
  X,
  Filter
} from 'lucide-react';

export default function BuyerPanel({ 
  user, 
  requirements = [], 
  orders = [], 
  onPostRequirement, 
  onUpdateOrderStatus, 
  currentSubView, 
  setCurrentSubView 
}) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isPostReqModalOpen, setIsPostReqModalOpen] = useState(false);

  // Form states for posting new requirement
  const [articleName, setArticleName] = useState('');
  const [category, setCategory] = useState('Grains');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Tons');
  const [targetPrice, setTargetPrice] = useState('');
  const [deliveryTimeline, setDeliveryTimeline] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handlePostReqSubmit = (e) => {
    e.preventDefault();
    if (!articleName || !quantity || !targetPrice) return;

    onPostRequirement({
      articleName,
      category,
      quantity: parseFloat(quantity),
      unit,
      targetPrice: parseFloat(targetPrice),
      deliveryTimeline: deliveryTimeline || '15 Days',
      specifications
    });

    setSuccessMsg('Requirement posted to marketplace feed successfully!');

    setTimeout(() => {
      setIsPostReqModalOpen(false);
      setSuccessMsg('');
      setArticleName('');
      setQuantity('');
      setTargetPrice('');
      setSpecifications('');
    }, 2000);
  };

  const buyerOrders = orders.filter(ord => ord.buyerCompany === user?.company || true);

  const sidebarItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, view: 'buyer-dashboard' },
    { label: 'Marketplace', icon: <ShoppingBag size={18} />, view: 'buyer-post-requirement' },
    { label: 'My Orders', icon: <FileText size={18} />, view: 'buyer-my-requirements' },
    { label: 'Shipments', icon: <Truck size={18} />, view: 'buyer-order-tracking' },
    { label: 'Favorites', icon: <Heart size={18} />, view: 'buyer-dashboard' },
    { label: 'Finance', icon: <Wallet size={18} />, view: 'buyer-dashboard' },
    { label: 'Messages', icon: <MessageSquare size={18} />, view: 'buyer-dashboard' },
    { label: 'Analytics', icon: <TrendingUp size={18} />, view: 'buyer-dashboard' },
    { label: 'Profile', icon: <User size={18} />, view: 'buyer-dashboard' },
    { label: 'Settings', icon: <Settings size={18} />, view: 'buyer-dashboard' }
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
                <ShoppingBag size={20} className="stroke-[2.5]" />
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

        {/* Bottom Profile Box */}
        <div className="pt-4 border-t border-forest-900/80">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-forest-900/40 border border-forest-800/60">
            <div className="w-8 h-8 bg-forest-700 rounded-full flex items-center justify-center text-white font-bold text-xs border border-gold-400/30">
              {user?.name ? user.name.charAt(0) : 'B'}
            </div>
            <div className="flex-1 truncate">
              <h4 className="text-xs font-bold text-white truncate">{user?.company || 'Global Farms Ltd.'}</h4>
              <p className="text-[9px] text-gold-300 font-medium">Buyer • Verified</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP NAVBAR */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold font-display text-slate-900">Buyer Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products, suppliers..." 
                className="pl-9 pr-4 py-1.5 text-xs bg-slate-100/80 border border-slate-200 rounded-full w-60 focus:outline-hidden focus:bg-white focus:border-forest-600 transition-all"
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
                <div className="w-7 h-7 bg-forest-800 text-gold-300 rounded-full flex items-center justify-center font-bold text-xs">
                  {user?.name ? user.name.charAt(0) : 'G'}
                </div>
                <span className="text-xs font-bold text-slate-800 hidden lg:inline">{user?.company || 'Global Farms Ltd.'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY CANVASES */}
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* METRICS ROW (4 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Total Spent</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold font-display text-slate-900">$128,750</h3>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+15.8%</span>
              </div>
              <span className="text-[10px] text-slate-400 block">from last month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Active Orders</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold font-display text-slate-900">18</h3>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+5</span>
              </div>
              <span className="text-[10px] text-slate-400 block">from last month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Delivered Orders</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold font-display text-slate-900">32</h3>
                <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">+7</span>
              </div>
              <span className="text-[10px] text-slate-400 block">from last month</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Saved Suppliers</span>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold font-display text-slate-900">24</h3>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">+3 new</span>
              </div>
              <span className="text-[10px] text-slate-400 block">this month</span>
            </div>
          </div>

          {/* MIDDLE SECTION: Recommended For You + Market Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Recommended For You Carousel */}
            <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 text-base font-display">Recommended For You</h3>
                <button 
                  onClick={() => setIsPostReqModalOpen(true)}
                  className="text-xs text-forest-700 hover:underline font-semibold cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { title: 'Organic Basmati Rice', country: 'India', price: '$1,250 / MT', moq: 'MOQ 500 MT', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80' },
                  { title: 'Arabica Coffee Beans', country: 'Ethiopia', price: '$4,250 / MT', moq: 'MOQ 200 MT', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80' },
                  { title: 'Premium Spices', country: 'Sri Lanka', price: '$2,350 / MT', moq: 'MOQ 100 MT', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80' },
                  { title: 'Ceylon Tea', country: 'Sri Lanka', price: '$2,150 / MT', moq: 'MOQ 500 MT', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&q=80' }
                ].map((rec, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 relative flex flex-col justify-between hover:shadow-xs transition-all group">
                    <button className="absolute top-4 right-4 p-1.5 bg-white/80 backdrop-blur-xs rounded-full text-slate-400 hover:text-red-500 transition-colors z-10">
                      <Heart size={14} />
                    </button>

                    <img src={rec.img} alt={rec.title} className="w-full h-24 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 truncate" title={rec.title}>{rec.title}</h4>
                      <span className="text-[10px] text-slate-400 block mb-1">{rec.country}</span>
                      <div className="flex justify-between items-center border-t border-slate-200/60 pt-1.5">
                        <span className="text-[11px] font-bold text-forest-700">{rec.price}</span>
                        <span className="text-[9px] text-slate-500 font-semibold">{rec.moq}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights Chart */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-900 text-base font-display">Market Insights</h3>
                <button className="text-xs text-forest-700 hover:underline font-semibold cursor-pointer">
                  View Report
                </button>
              </div>
              <p className="text-xs text-slate-400 mb-4">Basmati Rice Price Trend (USD / MT)</p>

              {/* Price Trend Chart SVG */}
              <div className="h-36 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80" preserveAspectRatio="none">
                  <path d="M 0,60 Q 40,30 80,50 T 160,20 T 200,35" fill="none" stroke="#32561c" strokeWidth="2.5" />
                  <path d="M 0,60 Q 40,30 80,50 T 160,20 T 200,35 L 200,80 L 0,80 Z" fill="url(#buyer-grad)" opacity="0.15" />
                  <defs>
                    <linearGradient id="buyer-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#32561c" />
                      <stop offset="100%" stopColor="#32561c" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-semibold">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: Recent Orders + Top Suppliers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Recent Orders Table */}
            <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-900 text-base font-display">Recent Orders</h3>
                <button 
                  onClick={() => setCurrentSubView('buyer-order-tracking')}
                  className="text-xs text-forest-700 hover:underline font-semibold cursor-pointer"
                >
                  View All Orders
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'ORD-2024-00128', name: 'Organic Basmati Rice', supplier: 'Green Fields Exports', price: '$5,620', status: 'Confirmed', date: 'May 20, 2024' },
                  { id: 'ORD-2024-00127', name: 'Arabica Coffee Beans', supplier: 'Highland Coffee Co.', price: '$8,450', status: 'Shipped', date: 'May 18, 2024' },
                  { id: 'ORD-2024-00126', name: 'Premium Spices', supplier: 'Spice World', price: '$2,350', status: 'Processing', date: 'May 15, 2024' },
                  { id: 'ORD-2024-00125', name: 'Ceylon Tea', supplier: 'Ceylon Fresh Tea', price: '$2,150', status: 'Delivered', date: 'May 10, 2024' }
                ].map((ord) => (
                  <div key={ord.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-slate-50 border border-slate-200/60 rounded-xl gap-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{ord.id}</span>
                      <h4 className="font-bold text-slate-900">{ord.name}</h4>
                      <p className="text-[10px] text-slate-500">{ord.supplier}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-slate-900">{ord.price}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ord.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        ord.status === 'Processing' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {ord.status}
                      </span>
                      <span className="text-[10px] text-slate-400 hidden sm:inline">{ord.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Suppliers List */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900 text-base font-display">Top Suppliers</h3>
                  <button className="text-xs text-forest-700 hover:underline font-semibold cursor-pointer">
                    View All
                  </button>
                </div>

                <div className="space-y-3.5">
                  {[
                    { name: 'Green Fields Exports', country: 'India', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
                    { name: 'Highland Coffee Co.', country: 'Ethiopia', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
                    { name: 'Spice World', country: 'Sri Lanka', rating: '4.7', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' }
                  ].map((sup, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 rounded-xl hover:bg-slate-50">
                      <div className="flex items-center gap-2.5">
                        <img src={sup.avatar} alt={sup.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{sup.name}</h4>
                          <span className="text-[10px] text-slate-400 font-medium">{sup.country}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                        <span>⭐</span>
                        <span>{sup.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsPostReqModalOpen(true)}
                className="w-full mt-4 py-2.5 bg-forest-700 hover:bg-forest-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus size={14} />
                Post New Requirement
              </button>
            </div>

          </div>

        </main>
      </div>

      {/* POST REQUIREMENT MODAL */}
      {isPostReqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900 font-display">Post Sourcing Requirement</h3>
              <button onClick={() => setIsPostReqModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handlePostReqSubmit} className="p-5 space-y-4">
              {successMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl">
                  {successMsg}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Commodity Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Organic Basmati Rice"
                  value={articleName} 
                  onChange={(e) => setArticleName(e.target.value)} 
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl" 
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>Grains</option>
                    <option>Coffee & Tea</option>
                    <option>Spices</option>
                    <option>Cotton</option>
                    <option>Fruits</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Target Price ($/Unit)</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="1250"
                    value={targetPrice} 
                    onChange={(e) => setTargetPrice(e.target.value)} 
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Quantity Needed</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="500"
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Unit</label>
                  <select 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>Tons</option>
                    <option>Kg</option>
                    <option>Bales</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsPostReqModalOpen(false)} className="flex-1 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-forest-700 text-white text-xs font-bold rounded-xl shadow-xs">Publish Requirement</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
