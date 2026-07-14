import React, { useState } from 'react';
import { Sprout, ShieldCheck, Truck, Users, ArrowRight, Wheat, Lock, Mail, UserPlus, Building, Phone, MapPin } from 'lucide-react';

export default function LandingPage({ onLoginSuccess, initialAuthMode = 'hero' }) {
  const [mode, setMode] = useState(initialAuthMode); // 'hero', 'login', 'signup'
  const [role, setRole] = useState('BUYER'); // 'BUYER' or 'SELLER'
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  // Quick log-in helper
  const handleQuickLogin = (selectedRole) => {
    if (selectedRole === 'BUYER') {
      onLoginSuccess({
        name: 'Punjab Agro Foods',
        company: 'Punjab Agro Corp',
        phone: '+91 98765 43210',
        location: 'Chandigarh, Punjab',
        email: 'buyer@agrilog.com'
      }, 'BUYER');
    } else {
      onLoginSuccess({
        name: 'Sukhwinder Singh',
        company: 'GreenHarvest Organic Farms',
        phone: '+91 99887 76655',
        location: 'Ludhiana, Punjab',
        email: 'seller@agrilog.com'
      }, 'SELLER');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Simulate authentication
    const simulatedName = email.split('@')[0];
    const simulatedCompany = role === 'BUYER' ? `${simulatedName} Trading Co.` : `${simulatedName} Agri Farms`;
    
    onLoginSuccess({
      name: simulatedName.charAt(0).toUpperCase() + simulatedName.slice(1),
      company: simulatedCompany,
      phone: phone || '+91 98765 54321',
      location: location || 'Punjab, India',
      email: email
    }, role);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !fullName || !company || !phone || !location) {
      setError('Please fill in all fields.');
      return;
    }

    onLoginSuccess({
      name: fullName,
      company: company,
      phone: phone,
      location: location,
      email: email
    }, role);
  };

  return (
    <div className="bg-slate-50 min-h-[90vh]">
      {mode === 'hero' ? (
        /* HERO SECTION */
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-forest-950 to-slate-950 text-white py-20 sm:py-28 px-4">
          {/* Ambient light overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(85,141,49,0.15),transparent_45%)] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-500/10 border border-forest-500/30 rounded-full text-forest-400 text-xs font-semibold uppercase tracking-wider">
                <Wheat size={12} />
                <span>Next-Gen Agri B2B Sourcing</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight">
                Streamline Your Bulk <br />
                <span className="bg-gradient-to-r from-forest-400 via-forest-300 to-earth-300 bg-clip-text text-transparent">
                  Agricultural Supply Chain
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                AGRILOG connects verified industrial buyers and wholesale distributors directly with certified farms and suppliers. Post requirements, compare quotes, and track bulk shipments with full transparency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => { setMode('signup'); setRole('BUYER'); }}
                  className="px-8 py-4 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-xl shadow-lg shadow-forest-900/40 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  Register as Buyer
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => { setMode('signup'); setRole('SELLER'); }}
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  Join as Seller
                  <Sprout size={18} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-800/80 max-w-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-forest-500/10 rounded-xl text-forest-400 border border-forest-500/20">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">100% Verified</h4>
                    <p className="text-xs text-slate-400">KYC Audited Profiles</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-forest-500/10 rounded-xl text-forest-400 border border-forest-500/20">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Real leads</h4>
                    <p className="text-xs text-slate-400">Direct connections</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-forest-500/10 rounded-xl text-forest-400 border border-forest-500/20">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Trackable</h4>
                    <p className="text-xs text-slate-400">Real-time status</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Quick Test Selector */}
            <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 p-8 rounded-2xl backdrop-blur-md shadow-2xl relative">
              <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 bg-amber-500 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Testing Demo
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">Simulate Live Marketplace</h3>
              <p className="text-xs text-slate-400 mb-6">
                Bypass registration and log in instantly with our verified mock accounts to experience both roles.
              </p>
              
              <div className="space-y-4">
                {/* Buyer Quick Card */}
                <div 
                  onClick={() => handleQuickLogin('BUYER')}
                  className="p-4 bg-slate-950/60 hover:bg-forest-950/40 border border-slate-800 hover:border-forest-500/40 rounded-xl cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="px-2 py-0.5 bg-forest-500/15 border border-forest-500/35 rounded-md text-forest-400 text-[10px] font-semibold uppercase tracking-wider">
                      Buyer Account
                    </div>
                    <span className="text-xs text-slate-500 group-hover:text-forest-400 flex items-center gap-1 font-medium transition-colors">
                      Quick Log In <ArrowRight size={12} />
                    </span>
                  </div>
                  <h4 className="font-semibold text-white text-sm">Punjab Agro Foods</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Post crop requirements, view received quotes, and track shipment status.
                  </p>
                </div>

                {/* Seller Quick Card */}
                <div 
                  onClick={() => handleQuickLogin('SELLER')}
                  className="p-4 bg-slate-950/60 hover:bg-earth-950/40 border border-slate-800 hover:border-earth-500/40 rounded-xl cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="px-2 py-0.5 bg-earth-500/15 border border-earth-500/35 rounded-md text-earth-400 text-[10px] font-semibold uppercase tracking-wider">
                      Seller Account
                    </div>
                    <span className="text-xs text-slate-500 group-hover:text-earth-400 flex items-center gap-1 font-medium transition-colors">
                      Quick Log In <ArrowRight size={12} />
                    </span>
                  </div>
                  <h4 className="font-semibold text-white text-sm">GreenHarvest Organic Farms</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    View active buyer crop requirements, send price quotes, and manage dispatch tracking.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
                <button
                  onClick={() => setMode('login')}
                  className="text-sm text-forest-400 hover:text-forest-300 font-semibold"
                >
                  Or log in manually using credentials &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* AUTH SCREEN */
        <div className="max-w-md mx-auto py-12 px-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
            {/* Tab selector */}
            <div className="flex border-b border-slate-100">
              <button
                onClick={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
                  mode === 'login' 
                    ? 'border-forest-600 text-forest-700 bg-forest-50/20' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode('signup'); setError(''); }}
                className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
                  mode === 'signup' 
                    ? 'border-forest-600 text-forest-700 bg-forest-50/20' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-display text-slate-900">
                  {mode === 'login' ? 'Welcome Back' : 'Get Started with AGRILOG'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {mode === 'login' ? 'Access your agriculture trade account' : 'Register to start trading bulk agri commodities'}
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={mode === 'login' ? handleLoginSubmit : handleSignupSubmit} className="space-y-4">
                {/* ROLE SELECTOR (Register As / Login As Toggle) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {mode === 'login' ? 'Access Portal As' : 'Register As'}
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setRole('BUYER')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                        role === 'BUYER' 
                          ? 'bg-white text-forest-700 shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Buyer (Procure Crops)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('SELLER')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                        role === 'SELLER' 
                          ? 'bg-white text-earth-700 shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Seller (Supply Crops)
                    </button>
                  </div>
                </div>

                {/* Form fields for SIGNUP */}
                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name / Contact Person
                      </label>
                      <div className="relative">
                        <UserPlus size={16} className="absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Sukhwinder Singh"
                          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Company or Farm Name
                      </label>
                      <div className="relative">
                        <Building size={16} className="absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Punjab Organic Farms"
                          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Location / State
                      </label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Ludhiana, Punjab"
                          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Common fields (Email, Password) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. trading@cropcorp.com"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className={`w-full py-3 text-white font-semibold rounded-xl shadow-md transition-all hover:-translate-y-0.5 cursor-pointer mt-4 ${
                    role === 'BUYER' 
                      ? 'bg-forest-600 hover:bg-forest-700 shadow-forest-100' 
                      : 'bg-earth-600 hover:bg-earth-700 shadow-earth-100'
                  }`}
                >
                  {mode === 'login' ? 'Sign In to Marketplace' : 'Create Profile'}
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  onClick={() => setMode('hero')}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  &larr; Back to AGRILOG Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
