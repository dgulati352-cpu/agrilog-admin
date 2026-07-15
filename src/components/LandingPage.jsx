import React, { useState } from 'react';
import { Sprout, ShieldCheck, Truck, Users, ArrowRight, Wheat, Lock, Mail, UserPlus, Building, Phone, MapPin } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function LandingPage({ onLoginSuccess, initialAuthMode = 'hero' }) {
  const [mode, setMode] = useState(initialAuthMode); // 'hero', 'login', 'signup', 'forgot-password'
  const [role, setRole] = useState('BUYER'); // 'BUYER' or 'SELLER'
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        if (email.toLowerCase() === 'admin@agrilog.com' && password === 'admin123') {
          // Auto-seed admin user profile if the auth exists but the document doesn't
          const profileData = {
            uid: user.uid,
            email: email.toLowerCase(),
            name: 'System Administrator',
            company: 'AGRILOG Global Admin',
            phone: '+91 99999 99999',
            location: 'New Delhi, India',
            role: 'ADMIN',
            createdAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'users', user.uid), profileData);
          onLoginSuccess(profileData, 'ADMIN');
          return;
        }
        await auth.signOut();
        setError('No profile found. Please register an account first.');
        return;
      }
      
      const profileData = userDoc.data();
      
      if (profileData.role !== role) {
        setError(`Account exists, but it is registered as a ${profileData.role.toLowerCase()}. Please toggle 'Access Portal As' accordingly.`);
        return;
      }

      onLoginSuccess(profileData, profileData.role);
    } catch (err) {
      console.error(err);
      if (email.toLowerCase() === 'admin@agrilog.com' && password === 'admin123') {
        // Auto-register admin if login fails
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const profileData = {
            uid: user.uid,
            email: email.toLowerCase(),
            name: 'System Administrator',
            company: 'AGRILOG Global Admin',
            phone: '+91 99999 99999',
            location: 'New Delhi, India',
            role: 'ADMIN',
            createdAt: new Date().toISOString()
          };
          await setDoc(doc(db, 'users', user.uid), profileData);
          onLoginSuccess(profileData, 'ADMIN');
          return;
        } catch (regErr) {
          console.error("Auto-create admin failed:", regErr);
        }
      }
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(err.message || 'An error occurred during sign in.');
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !fullName || !company || !phone || !location) {
      setError('Please fill in all fields.');
      return;
    }

    if (role !== 'BUYER') {
      setError('Only Buyers can register accounts. Sellers must be registered by an administrator.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const profileData = {
        uid: user.uid,
        email: email.toLowerCase(),
        name: fullName,
        company,
        phone,
        location,
        role,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', user.uid), profileData);
      onLoginSuccess(profileData, role);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email address already exists.');
      } else {
        setError(err.message || 'An error occurred during registration.');
      }
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else {
        setError(err.message || 'Failed to send password reset email.');
      }
    }
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
                  className="px-8 py-4 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-xl shadow-lg shadow-forest-900/40 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Register as Buyer
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => { setMode('login'); setRole('SELLER'); }}
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Seller Sign In
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

            {/* Right Column: Premium Live Trade Index */}
            <div className="lg:col-span-5 bg-slate-900/45 border border-slate-800/85 p-6 sm:p-8 rounded-2xl backdrop-blur-md shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-32 h-32 bg-forest-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    Live Trade Index
                  </h3>
                  <p className="text-[11px] text-slate-400">Real-time agricultural commodity prices & volume</p>
                </div>
                <div className="px-2.5 py-1 bg-slate-800 rounded-lg border border-slate-700 text-right">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Platform Status</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Active & Secured</span>
                </div>
              </div>

              {/* Ticker Items */}
              <div className="space-y-3">
                {[
                  { name: 'Basmati Rice (1121)', price: '$1,250/Ton', change: '+2.4%', up: true, vol: '340 Tons' },
                  { name: 'Jyoti Potatoes', price: '$380/Ton', change: '-0.8%', up: false, vol: '180 Tons' },
                  { name: 'Alphonso Mangoes', price: '$2,800/Ton', change: '+5.1%', up: true, vol: '45 Tons' },
                  { name: 'Winter Wheat (Hard Red)', price: '$290/Ton', change: '+0.5%', up: true, vol: '1,200 Tons' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-slate-950/40 hover:bg-slate-950/60 border border-slate-800/50 hover:border-slate-800 rounded-xl transition-all">
                    <div>
                      <span className="block text-xs font-semibold text-white">{item.name}</span>
                      <span className="text-[10px] text-slate-500">Vol: {item.vol}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-bold font-mono text-slate-200">{item.price}</span>
                      <span className={`text-[10px] font-semibold ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="bg-slate-950/30 p-2.5 rounded-xl border border-slate-800/40 text-center">
                  <span className="block text-[9px] text-slate-500 font-medium">Verified Buyers</span>
                  <span className="text-sm font-bold text-white">1,420+</span>
                </div>
                <div className="bg-slate-950/30 p-2.5 rounded-xl border border-slate-800/40 text-center">
                  <span className="block text-[9px] text-slate-500 font-medium">Active Sellers</span>
                  <span className="text-sm font-bold text-white">850+</span>
                </div>
                <div className="bg-slate-950/30 p-2.5 rounded-xl border border-slate-800/40 text-center">
                  <span className="block text-[9px] text-slate-500 font-medium">Completed Trades</span>
                  <span className="text-sm font-bold text-white">9,800+</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setMode('login')}
                  className="w-full py-3 bg-forest-600 hover:bg-forest-500 active:bg-forest-700 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-forest-900/10 cursor-pointer"
                >
                  Access Trading Dashboard
                  <ArrowRight size={14} />
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
            {mode !== 'forgot-password' && (
              <div className="flex border-b border-slate-100">
                <button
                  onClick={() => { setMode('login'); setError(''); setSuccessMessage(''); }}
                  className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
                    mode === 'login' 
                      ? 'border-forest-600 text-forest-700 bg-forest-50/20' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setMode('signup'); setRole('BUYER'); setError(''); setSuccessMessage(''); }}
                  className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
                    mode === 'signup' 
                      ? 'border-forest-600 text-forest-700 bg-forest-50/20' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                  }`}
                >
                  Create Account
                </button>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-display text-slate-900">
                  {mode === 'forgot-password'
                    ? 'Reset Password'
                    : mode === 'login' 
                      ? 'Welcome Back' 
                      : 'Get Started with AGRILOG'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {mode === 'forgot-password'
                    ? 'Enter your registered email address to receive a reset link.'
                    : mode === 'login' 
                      ? 'Access your agriculture trade account' 
                      : 'Register to start trading bulk agri commodities'}
                </p>
              </div>

              {successMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-medium">
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
                  {error}
                </div>
              )}

              <form 
                onSubmit={
                  mode === 'forgot-password'
                    ? handleForgotPasswordSubmit
                    : mode === 'login'
                      ? handleLoginSubmit
                      : handleSignupSubmit
                } 
                className="space-y-4"
              >
                {/* ROLE SELECTOR (Register As / Login As Toggle) - Enforce only Buyer for Register/Signup */}
                {mode === 'login' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Access Portal As
                    </label>
                    <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setRole('BUYER')}
                        className={`py-2 px-1 text-[10px] sm:text-xs font-bold rounded-lg transition-all ${
                          role === 'BUYER' 
                            ? 'bg-white text-forest-700 shadow-xs' 
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Buyer
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('SELLER')}
                        className={`py-2 px-1 text-[10px] sm:text-xs font-bold rounded-lg transition-all ${
                          role === 'SELLER' 
                            ? 'bg-white text-earth-700 shadow-xs' 
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Seller
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('ADMIN')}
                        className={`py-2 px-1 text-[10px] sm:text-xs font-bold rounded-lg transition-all ${
                          role === 'ADMIN' 
                            ? 'bg-white text-slate-900 shadow-xs' 
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                )}

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
                          placeholder="e.g. Rajesh Sharma"
                          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building size={16} className="absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Punjab Agro Corp"
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
                          placeholder="e.g. Chandigarh, Punjab"
                          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-forest-600 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email Address */}
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

                {/* Password (hidden in forgot-password mode) */}
                {mode !== 'forgot-password' && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Password
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => { setMode('forgot-password'); setError(''); setSuccessMessage(''); }}
                          className="text-[11px] font-semibold text-forest-600 hover:text-forest-700 hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
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
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className={`w-full py-3 text-white font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5 cursor-pointer mt-4 ${
                    role === 'ADMIN'
                      ? 'bg-slate-900 hover:bg-slate-850 shadow-slate-100'
                      : role === 'BUYER' 
                        ? 'bg-forest-600 hover:bg-forest-700 shadow-forest-100' 
                        : 'bg-earth-600 hover:bg-earth-700 shadow-earth-100'
                  }`}
                >
                  {mode === 'forgot-password'
                    ? 'Send Reset Link'
                    : mode === 'login'
                      ? 'Sign In to Marketplace'
                      : 'Create Profile'}
                </button>
              </form>

              {/* Quick Admin Demo Login Button (Only visible in login mode) */}
              {mode === 'login' && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={async () => {
                      setError('');
                      setSuccessMessage('');
                      setEmail('admin@agrilog.com');
                      setPassword('admin123');
                      setRole('ADMIN');
                      
                      try {
                        const userCredential = await signInWithEmailAndPassword(auth, 'admin@agrilog.com', 'admin123');
                        const user = userCredential.user;
                        
                        const userDoc = await getDoc(doc(db, 'users', user.uid));
                        let profileData;
                        if (!userDoc.exists()) {
                          profileData = {
                            uid: user.uid,
                            email: 'admin@agrilog.com',
                            name: 'System Administrator',
                            company: 'AGRILOG Global Admin',
                            phone: '+91 99999 99999',
                            location: 'New Delhi, India',
                            role: 'ADMIN',
                            createdAt: new Date().toISOString()
                          };
                          await setDoc(doc(db, 'users', user.uid), profileData);
                        } else {
                          profileData = userDoc.data();
                        }
                        onLoginSuccess(profileData, 'ADMIN');
                      } catch (err) {
                        console.error(err);
                        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                          try {
                            const regCredential = await createUserWithEmailAndPassword(auth, 'admin@agrilog.com', 'admin123');
                            const regUser = regCredential.user;
                            const newProfile = {
                              uid: regUser.uid,
                              email: 'admin@agrilog.com',
                              name: 'System Administrator',
                              company: 'AGRILOG Global Admin',
                              phone: '+91 99999 99999',
                              location: 'New Delhi, India',
                              role: 'ADMIN',
                              createdAt: new Date().toISOString()
                            };
                            await setDoc(doc(db, 'users', regUser.uid), newProfile);
                            onLoginSuccess(newProfile, 'ADMIN');
                          } catch (regErr) {
                            setError('Failed to auto-create admin: ' + regErr.message);
                          }
                        } else {
                          setError('Failed to login: ' + err.message);
                        }
                      }
                    }}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <Wheat size={14} className="text-forest-400" />
                    <span>Quick Admin Demo Login</span>
                  </button>
                </div>
              )}

              <div className="text-center pt-4">
                {mode === 'forgot-password' ? (
                  <button
                    onClick={() => {
                      setMode('login');
                      setError('');
                      setSuccessMessage('');
                    }}
                    className="text-xs text-forest-600 hover:text-forest-700 font-semibold cursor-pointer"
                  >
                    &larr; Back to Sign In
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMode('hero');
                      setError('');
                      setSuccessMessage('');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    &larr; Back to AGRILOG Home
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
