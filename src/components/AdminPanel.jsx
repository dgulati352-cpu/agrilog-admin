import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  Search, 
  FileText, 
  ExternalLink, 
  Lock, 
  Building, 
  Phone, 
  MapPin, 
  Activity, 
  CheckCircle2, 
  Mail,
  User,
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { db, firebaseConfig } from '../firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Initialize secondary Firebase App to prevent Admin log out when creating Sellers
const secondaryApp = getApps().find(app => app.name === "secondary") || initializeApp(firebaseConfig, "secondary");
const secondaryAuth = getAuth(secondaryApp);

export default function AdminPanel({ 
  user,
  requirements, 
  orders, 
  bids, 
  onImpersonate,
  currentSubView,
  setCurrentSubView
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'sellers', 'buyers', 'bids'
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create Seller form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch Buyers and Sellers
  useEffect(() => {
    const q = collection(db, 'users');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bList = [];
      const sList = [];
      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        if (data.role === 'BUYER') {
          bList.push(data);
        } else if (data.role === 'SELLER') {
          sList.push(data);
        }
      });
      setBuyers(bList);
      setSellers(sList);
    }, (err) => {
      console.error("Error fetching users:", err);
    });

    return () => unsubscribe();
  }, []);

  const handleCreateSellerSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    if (!email || !password || !fullName || !company || !phone || !location) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      // 1. Create user in Firebase Auth using the secondary app instance
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const newAuthUser = userCredential.user;

      // 2. Create the seller document in Firestore
      const sellerProfile = {
        uid: newAuthUser.uid,
        email: email.toLowerCase(),
        name: fullName,
        company,
        phone,
        location,
        role: 'SELLER',
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', newAuthUser.uid), sellerProfile);

      // 3. Immediately sign out of the secondary auth session
      await signOut(secondaryAuth);

      setSuccessMsg(`Seller profile for "${company}" created successfully! They can now log in using the email and password provided.`);
      
      // Reset form
      setEmail('');
      setPassword('');
      setFullName('');
      setCompany('');
      setPhone('');
      setLocation('');
      setShowAddForm(false);
    } catch (err) {
      console.error("Error creating seller:", err);
      if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('This email address is already in use by another user.');
      } else {
        setErrorMsg(err.message || 'An error occurred while creating the seller account.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter handlers
  const filteredSellers = sellers.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBuyers = buyers.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBids = bids.filter(b => 
    b.articleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.sellerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Platform Stats
  const stats = {
    totalRevenue: orders.reduce((sum, o) => sum + (o.price * o.quantity), 0),
    activeDeals: requirements.filter(r => r.status === 'active').length,
    quotedDeals: requirements.filter(r => r.status === 'quoted').length,
    fulfilledDeals: requirements.filter(r => r.status === 'fulfilled').length,
    totalBids: bids.length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Admin Panel Header */}
      <div className="bg-gradient-to-r from-slate-900 via-forest-950 to-slate-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(85,141,49,0.1),transparent_40%)] pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-500/10 border border-forest-500/30 rounded-full text-forest-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldAlert size={14} className="animate-pulse" />
              <span>Platform Administration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              AGRILOG Global Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Complete administrative access. Monitor live trades, manage buyer & seller portals, and provision merchant credentials.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all ${
                activeTab === 'overview' 
                  ? 'bg-forest-600 text-white font-bold' 
                  : 'bg-slate-800/60 hover:bg-slate-800/80 text-white border border-slate-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('sellers')}
              className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all ${
                activeTab === 'sellers' 
                  ? 'bg-forest-600 text-white font-bold' 
                  : 'bg-slate-800/60 hover:bg-slate-800/80 text-white border border-slate-700'
              }`}
            >
              Manage Sellers ({sellers.length})
            </button>
            <button
              onClick={() => setActiveTab('buyers')}
              className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all ${
                activeTab === 'buyers' 
                  ? 'bg-forest-600 text-white font-bold' 
                  : 'bg-slate-800/60 hover:bg-slate-800/80 text-white border border-slate-700'
              }`}
            >
              Monitor Buyers ({buyers.length})
            </button>
            <button
              onClick={() => setActiveTab('bids')}
              className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-all ${
                activeTab === 'bids' 
                  ? 'bg-forest-600 text-white font-bold' 
                  : 'bg-slate-800/60 hover:bg-slate-800/80 text-white border border-slate-700'
              }`}
            >
              Bid Logs ({bids.length})
            </button>
          </div>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary metrics widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200/85 rounded-2xl p-6 shadow-xs flex items-center justify-between hover:border-forest-300 transition-all">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Platform Volume</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">
                  ${stats.totalRevenue.toLocaleString()}
                </h3>
                <span className="text-xs text-forest-600 font-semibold block mt-1">Across all closed contracts</span>
              </div>
              <div className="p-3.5 bg-forest-50 text-forest-600 rounded-2xl border border-forest-100">
                <TrendingUp size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/85 rounded-2xl p-6 shadow-xs flex items-center justify-between hover:border-forest-300 transition-all">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Crop Leads</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">
                  {requirements.length}
                </h3>
                <span className="text-xs text-slate-500 font-medium block mt-1">
                  {stats.activeDeals} Active • {stats.quotedDeals} Bidded
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 text-slate-600 rounded-2xl border border-slate-100">
                <ShoppingBag size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/85 rounded-2xl p-6 shadow-xs flex items-center justify-between hover:border-forest-300 transition-all">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Bids Placed</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">
                  {stats.totalBids}
                </h3>
                <span className="text-xs text-amber-600 font-semibold block mt-1">Commercial quote records</span>
              </div>
              <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
                <FileText size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200/85 rounded-2xl p-6 shadow-xs flex items-center justify-between hover:border-forest-300 transition-all">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Platform Users</span>
                <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">
                  {buyers.length + sellers.length}
                </h3>
                <span className="text-xs text-blue-600 font-semibold block mt-1">
                  {buyers.length} Buyers • {sellers.length} Sellers
                </span>
              </div>
              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
                <Users size={24} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Sellers List */}
            <div className="bg-white border border-slate-200/85 rounded-2xl p-6 shadow-xs flex flex-col hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
                    <Activity size={18} className="text-forest-600" />
                    Registered Merchants
                  </h3>
                  <p className="text-xs text-slate-500">Sellers authorized by the administrator</p>
                </div>
                <button
                  onClick={() => setActiveTab('sellers')}
                  className="text-xs font-semibold text-forest-600 hover:underline flex items-center gap-0.5"
                >
                  Manage Sellers &rarr;
                </button>
              </div>

              <div className="space-y-4 divide-y divide-slate-100 flex-1">
                {sellers.slice(0, 4).map((seller) => (
                  <div key={seller.id} className="pt-4 first:pt-0 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{seller.company}</h4>
                      <div className="flex gap-2 items-center mt-1 text-xs text-slate-500 font-medium">
                        <span>{seller.name}</span>
                        <span>•</span>
                        <span>{seller.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onImpersonate(seller)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-forest-50 hover:text-forest-700 hover:border-forest-200 text-slate-600 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <span>Access Hub</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                ))}
                {sellers.length === 0 && (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No sellers registered yet. Click "Manage Sellers" to add one.
                  </div>
                )}
              </div>
            </div>

            {/* Quick Buyers List */}
            <div className="bg-white border border-slate-200/85 rounded-2xl p-6 shadow-xs flex flex-col hover:shadow-md transition-all">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
                    <Activity size={18} className="text-forest-600" />
                    Marketplace Buyers
                  </h3>
                  <p className="text-xs text-slate-500">Verified buyers procurement profiles</p>
                </div>
                <button
                  onClick={() => setActiveTab('buyers')}
                  className="text-xs font-semibold text-forest-600 hover:underline flex items-center gap-0.5"
                >
                  Monitor Buyers &rarr;
                </button>
              </div>

              <div className="space-y-4 divide-y divide-slate-100 flex-1">
                {buyers.slice(0, 4).map((buyer) => (
                  <div key={buyer.id} className="pt-4 first:pt-0 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{buyer.company}</h4>
                      <div className="flex gap-2 items-center mt-1 text-xs text-slate-500 font-medium">
                        <span>{buyer.name}</span>
                        <span>•</span>
                        <span>{buyer.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onImpersonate(buyer)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-forest-50 hover:text-forest-700 hover:border-forest-200 text-slate-600 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <span>Access Hub</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                ))}
                {buyers.length === 0 && (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No buyers registered on the platform yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SELLERS TAB */}
      {activeTab === 'sellers' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Control Bar */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search sellers by name/company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white"
              />
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full sm:w-auto px-5 py-2.5 bg-forest-600 hover:bg-forest-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-forest-150 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus size={16} />
              {showAddForm ? 'Cancel Creation' : 'Add New Seller Account'}
            </button>
          </div>

          {/* Create Seller Form Drawer */}
          {showAddForm && (
            <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-fadeIn">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-32 h-32 bg-forest-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="mb-6 flex items-center gap-3">
                <div className="p-2 bg-forest-600 text-white rounded-lg">
                  <Lock size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">Create Authorized Seller Credentials</h3>
                  <p className="text-xs text-slate-400">Specify details and access credentials. Sellers can log in immediately upon creation.</p>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle size={14} />
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleCreateSellerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Auth Credentials */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Seller Email (Username)
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-3 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seller@company.com"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:outline-hidden focus:border-forest-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Initial Password
                    </label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-3 text-slate-500" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:outline-hidden focus:border-forest-600 text-white"
                      />
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Contact Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-3 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Vikram Singh"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:outline-hidden focus:border-forest-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building size={16} className="absolute left-3 top-3 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Satnam Agro Foods"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:outline-hidden focus:border-forest-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-3 text-slate-500" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 00000"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:outline-hidden focus:border-forest-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Location / State
                    </label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-3 text-slate-500" />
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Amritsar, Punjab"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-xl focus:outline-hidden focus:border-forest-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-3 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-forest-600 hover:bg-forest-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-forest-900/30 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Activity size={14} className="animate-spin" />
                        <span>Provisioning Account...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Provision Credentials</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Success Notification */}
          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Sellers Grid */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            {filteredSellers.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <Users size={48} className="mx-auto mb-3 text-slate-200" />
                <p className="text-sm font-semibold">No sellers match your search</p>
                <p className="text-xs text-slate-400 mt-1">Try refining your search keyword.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/75 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Contact Person</th>
                      <th className="px-6 py-4">Email Address</th>
                      <th className="px-6 py-4">Phone Number</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Date Added</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredSellers.map((seller) => (
                      <tr key={seller.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-extrabold text-slate-900">{seller.company}</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-700">
                          {seller.name}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {seller.email}
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                          {seller.phone}
                        </td>
                        <td className="px-6 py-4 text-slate-500 font-medium">
                          {seller.location}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400">
                          {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => onImpersonate(seller)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-forest-50 hover:text-forest-700 border border-slate-200 hover:border-forest-200 text-slate-700 rounded-lg text-xs font-bold transition-all"
                          >
                            <span>Access Hub</span>
                            <ExternalLink size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BUYERS TAB */}
      {activeTab === 'buyers' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Control Bar */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search buyers by name/company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Buyers Grid */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            {filteredBuyers.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <Users size={48} className="mx-auto mb-3 text-slate-200" />
                <p className="text-sm font-semibold">No buyers match your search</p>
                <p className="text-xs text-slate-400 mt-1">Try refining your search keyword.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/75 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Contact Person</th>
                      <th className="px-6 py-4">Email Address</th>
                      <th className="px-6 py-4">Phone Number</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Created Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredBuyers.map((buyer) => (
                      <tr key={buyer.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-extrabold text-slate-900">{buyer.company}</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-700">
                          {buyer.name}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {buyer.email}
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                          {buyer.phone}
                        </td>
                        <td className="px-6 py-4 text-slate-500 font-medium">
                          {buyer.location}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400">
                          {buyer.createdAt ? new Date(buyer.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => onImpersonate(buyer)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-forest-50 hover:text-forest-700 border border-slate-200 hover:border-forest-200 text-slate-700 rounded-lg text-xs font-bold transition-all"
                          >
                            <span>Access Hub</span>
                            <ExternalLink size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BIDS TAB */}
      {activeTab === 'bids' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Control Bar */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search bids by crop or seller company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Bids List */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            {filteredBids.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <FileText size={48} className="mx-auto mb-3 text-slate-200" />
                <p className="text-sm font-semibold">No bids matching your search found</p>
                <p className="text-xs text-slate-400 mt-1">Sellers submit quotes to live crop requirements.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/75 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4">Bid ID</th>
                      <th className="px-6 py-4">Crop Name</th>
                      <th className="px-6 py-4">Seller Company</th>
                      <th className="px-6 py-4">Bidded Price</th>
                      <th className="px-6 py-4">Target Price</th>
                      <th className="px-6 py-4">Difference</th>
                      <th className="px-6 py-4">Deliv. Days</th>
                      <th className="px-6 py-4">Message Summary</th>
                      <th className="px-6 py-4">Bid Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredBids.map((bid) => {
                      const diff = bid.bidPrice - bid.targetPrice;
                      const isOver = diff > 0;
                      return (
                        <tr key={bid.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-slate-400 text-xs">
                            {bid.id}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <span className="font-semibold text-slate-900">{bid.articleName}</span>
                              <span className="ml-2 px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-bold uppercase tracking-wider">
                                {bid.category}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              Quantity: {bid.quantity} {bid.unit}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-800">
                            {bid.sellerCompany}
                          </td>
                          <td className="px-6 py-4 font-extrabold text-slate-950">
                            ${bid.bidPrice}/{bid.unit === 'Tons' ? 'Ton' : 'Kg'}
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-medium">
                            ${bid.targetPrice}/{bid.unit === 'Tons' ? 'Ton' : 'Kg'}
                          </td>
                          <td className="px-6 py-4 text-xs">
                            {diff === 0 ? (
                              <span className="text-slate-500 font-semibold">Matched</span>
                            ) : (
                              <span className={`font-bold ${isOver ? 'text-rose-600' : 'text-emerald-600'}`}>
                                {isOver ? '+' : ''}${diff} {isOver ? 'over' : 'under'}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-slate-650 font-bold">
                            {bid.deliveryDays} Days
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500 max-w-xs truncate" title={bid.sellerMessage}>
                            {bid.sellerMessage || 'No message provided'}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-400">
                            {bid.createdAt ? new Date(bid.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
