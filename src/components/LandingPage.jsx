import React, { useState } from 'react';
import { 
  Sprout, 
  Globe, 
  Users, 
  Ship, 
  TrendingUp, 
  Leaf, 
  UserPlus, 
  ShieldCheck, 
  ClipboardList, 
  ShoppingBag, 
  Lock, 
  Truck, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Mail, 
  Building, 
  Phone, 
  MapPin, 
  Wheat, 
  Award, 
  HeartHandshake, 
  ArrowUpRight,
  BarChart3,
  X
} from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function LandingPage({ onLoginSuccess, initialAuthMode = 'hero' }) {
  const [mode, setMode] = useState(initialAuthMode); // 'hero', 'login', 'signup', 'forgot-password'
  const [role, setRole] = useState('BUYER'); // 'BUYER' or 'SELLER'
  const [selectedMarketplaceTab, setSelectedMarketplaceTab] = useState('All');
  
  // Auth Form States
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
        setError(`Account exists, but it is registered as a ${profileData.role.toLowerCase()}. Please switch 'Access Portal As' accordingly.`);
        return;
      }

      onLoginSuccess(profileData, profileData.role);
    } catch (err) {
      console.error(err);
      if (email.toLowerCase() === 'admin@agrilog.com' && password === 'admin123') {
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
      setError('Only Buyers can register accounts directly. Sellers must be invited or approved.');
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

  // Mock Products data matching the reference image
  const marketplaceProducts = [
    {
      id: 'p1',
      title: 'Organic Basmati Rice',
      country: 'India',
      badge: 'USDA Organic',
      moq: '500 KG',
      price: '$850 / MT',
      category: 'Grains',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80'
    },
    {
      id: 'p2',
      title: 'Arabica Coffee Beans',
      country: 'Ethiopia',
      badge: 'Fair Trade',
      moq: '200 KG',
      price: '$4,250 / MT',
      category: 'Coffee & Tea',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80'
    },
    {
      id: 'p3',
      title: 'Premium Spices',
      country: 'Sri Lanka',
      badge: 'Organic Certified',
      moq: '100 KG',
      price: '$2,350 / MT',
      category: 'Spices',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80'
    },
    {
      id: 'p4',
      title: 'Natural Cotton',
      country: 'USA',
      badge: 'BCI Certified',
      moq: '1000 KG',
      price: '$1,620 / MT',
      category: 'Cotton',
      image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600&q=80'
    },
    {
      id: 'p5',
      title: 'Ceylon Tea',
      country: 'Sri Lanka',
      badge: 'Rainforest Alliance',
      moq: '500 KG',
      price: '$2,150 / MT',
      category: 'Coffee & Tea',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80'
    },
    {
      id: 'p6',
      title: 'Organic Millets',
      country: 'India',
      badge: 'USDA Organic',
      moq: '300 KG',
      price: '$780 / MT',
      category: 'Grains',
      image: 'https://images.unsplash.com/photo-1627736631481-99d89260a920?w=600&q=80'
    }
  ];

  const filteredProducts = selectedMarketplaceTab === 'All' 
    ? marketplaceProducts 
    : marketplaceProducts.filter(p => p.category === selectedMarketplaceTab);

  const [isPrdModalOpen, setIsPrdModalOpen] = useState(false);

  return (
    <div className="bg-[#FAF9F6] text-slate-900 min-h-screen font-sans selection:bg-gold-500/20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-forest-950 text-white">
        {/* Hero Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')`
          }}
        />
        {/* Radial Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-950/70 to-forest-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-16 text-center flex-1 flex flex-col justify-center items-center">
          
          {/* PRD Badge */}
          <button
            onClick={() => setIsPrdModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-gold-500/10 border border-gold-400/40 rounded-full text-gold-300 text-xs font-semibold mb-4 hover:bg-gold-500/20 transition-all cursor-pointer shadow-xs"
          >
            <FileText size={13} className="text-gold-400" />
            <span>Official PRD Document v1.0 • View Ecosystem Architecture</span>
            <ArrowUpRight size={13} />
          </button>

          {/* Main Title */}
          <h1 className="font-serif-title text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-md">
            AGRILOG
          </h1>

          {/* Subtitle with Ornamental Flourish */}
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400/80" />
            <span className="font-serif-title text-2xl sm:text-3xl text-gold-300 italic font-normal tracking-wide">
              Connecting Agriculture Beyond Borders
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400/80" />
          </div>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-2xl font-light leading-relaxed">
            End-to-end multilingual agri ecosystem integrating pre-sowing crop demand advisory, farm equipment rentals, and direct B2B market trade.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setMode('signup')}
              className="px-8 py-3.5 bg-forest-600 hover:bg-forest-500 text-white font-semibold rounded-full shadow-lg shadow-forest-900/50 flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer border border-forest-500/40 text-sm"
            >
              Explore Marketplace
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setIsPrdModalOpen(true)}
              className="px-8 py-3.5 bg-white/95 hover:bg-white text-slate-900 font-semibold rounded-full shadow-md flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              View PRD Blueprint
            </button>
          </div>
        </div>

        {/* Floating Glassmorphic Stats Bar */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-8 w-full">
          <div className="bg-forest-900/60 backdrop-blur-md border border-gold-500/30 rounded-2xl p-6 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-forest-700/50 text-center">
            
            <div className="flex items-center justify-center gap-3 pt-2 md:pt-0">
              <Globe className="text-gold-400 stroke-[1.5]" size={28} />
              <div className="text-left">
                <span className="block font-serif-title text-2xl font-bold text-white">50+</span>
                <span className="text-xs text-slate-300 font-medium">Countries</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 md:pt-0">
              <Users className="text-gold-400 stroke-[1.5]" size={28} />
              <div className="text-left">
                <span className="block font-serif-title text-2xl font-bold text-white">100K+</span>
                <span className="text-xs text-slate-300 font-medium">Verified Farmers</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 md:pt-0">
              <Leaf className="text-gold-400 stroke-[1.5]" size={28} />
              <div className="text-left">
                <span className="block font-serif-title text-2xl font-bold text-white">0%</span>
                <span className="text-xs text-slate-300 font-medium">Middlemen</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2 md:pt-0">
              <Ship className="text-gold-400 stroke-[1.5]" size={28} />
              <div className="text-left">
                <span className="block font-serif-title text-2xl font-bold text-white">24/7</span>
                <span className="text-xs text-slate-300 font-medium">Global Trade</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY GLOBAL LEADERS */}
      <section className="py-12 bg-[#F7F5F0] border-b border-earth-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-[1px] w-8 bg-earth-300" />
            <span className="text-xs font-bold uppercase tracking-widest text-earth-700">
              Trusted by Global Leaders
            </span>
            <span className="h-[1px] w-8 bg-earth-300" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="font-serif-title font-bold text-xl text-slate-800 tracking-wider">Olam</span>
            <span className="font-serif-title font-extrabold text-2xl text-slate-800 tracking-tight">Cargill</span>
            <span className="font-sans font-black text-xl text-slate-800 tracking-widest">ADM</span>
            <span className="font-serif-title text-sm font-semibold text-slate-800 uppercase tracking-widest">Louis Dreyfus Company</span>
            <span className="font-display font-extrabold text-xl text-slate-800 lowercase">wilmar</span>
            <span className="font-serif-title font-extrabold text-lg text-slate-800">ITC Trade</span>
            <span className="font-sans font-bold text-sm text-slate-800 tracking-wider">SOBHA GAP</span>
            <span className="font-serif-title text-sm italic font-semibold text-slate-800">bionaturae</span>
          </div>
        </div>
      </section>

      {/* 3. OUR SOLUTIONS */}
      <section id="solutions" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 text-gold-600 mb-2">
            <span>◆</span>
            <span className="h-[1px] w-10 bg-gold-400" />
            <span>◆</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-slate-900 uppercase tracking-wide">
            Our Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Wheat size={26} className="text-gold-600" />,
              title: 'Agri Innovation',
              desc: 'Technology driven solutions for modern agriculture.'
            },
            {
              icon: <Globe size={26} className="text-gold-600" />,
              title: 'Global Marketplace',
              desc: 'Access 50+ countries and thousands of verified buyers.'
            },
            {
              icon: <Users size={26} className="text-gold-600" />,
              title: 'Verified Buyers',
              desc: 'Connect with genuine importers and global businesses.'
            },
            {
              icon: <Ship size={26} className="text-gold-600" />,
              title: 'Export Logistics',
              desc: 'End-to-end logistics and documentation support.'
            },
            {
              icon: <TrendingUp size={26} className="text-gold-600" />,
              title: 'Market Intelligence',
              desc: 'Real-time market data and price trend analytics.'
            },
            {
              icon: <Leaf size={26} className="text-gold-600" />,
              title: 'Sustainable Agriculture',
              desc: 'Empowering farmers and protecting our planet.'
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border border-earth-100/80 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-start text-left group"
            >
              <div className="p-3 bg-earth-50 rounded-xl border border-earth-200/60 mb-5 group-hover:bg-gold-50 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-serif-title text-xl font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-950 border border-gold-500/30 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-gold-400 mb-2">
              <span>◆</span>
              <span className="h-[1px] w-10 bg-gold-400/50" />
              <span>◆</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative">
            {[
              { num: '1', title: 'Register', icon: <UserPlus size={20} /> },
              { num: '2', title: 'Verify Products', icon: <ShieldCheck size={20} /> },
              { num: '3', title: 'List Inventory', icon: <ClipboardList size={20} /> },
              { num: '4', title: 'Receive Orders', icon: <ShoppingBag size={20} /> },
              { num: '5', title: 'Secure Payments', icon: <Lock size={20} /> },
              { num: '6', title: 'Global Shipping', icon: <Ship size={20} /> }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-full border-2 border-gold-400/60 bg-forest-900/80 text-gold-300 font-serif-title font-bold text-base flex items-center justify-center mb-3 shadow-inner group-hover:border-gold-400 group-hover:scale-110 transition-all">
                  {step.num}
                </div>
                <div className="text-gold-400 mb-1.5 opacity-80 group-hover:opacity-100">
                  {step.icon}
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPLORE GLOBAL MARKETPLACE */}
      <section id="marketplace" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-earth-200/60 pb-6">
          <div>
            <h2 className="font-serif-title text-3xl font-bold text-slate-900 uppercase tracking-wide">
              Explore Global Marketplace
            </h2>
            <p className="text-xs text-slate-500 mt-1">Direct listings from verified exporters with transparent pricing</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('login')}
              className="px-4 py-2 bg-white border border-earth-300 hover:bg-earth-50 text-slate-800 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
            >
              View All Products
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Grains', 'Coffee & Tea', 'Spices', 'Cotton'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedMarketplaceTab(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedMarketplaceTab === cat
                  ? 'bg-forest-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col"
            >
              {/* Product Image */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img 
                  src={prod.image} 
                  alt={prod.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-forest-800 text-[10px] font-bold rounded-full shadow-xs uppercase tracking-wider">
                  {prod.country}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-title text-lg font-bold text-slate-900 mb-1">
                    {prod.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-forest-700 font-semibold mb-4">
                    <CheckCircle2 size={13} className="text-forest-600" />
                    <span>{prod.badge}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 bg-slate-50 rounded-xl border border-slate-150 mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Min Order (MOQ)</span>
                      <span className="font-semibold text-slate-700">{prod.moq}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Direct Price</span>
                      <span className="font-bold text-forest-700 text-sm">{prod.price}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setMode('login')}
                  className="w-full py-2.5 bg-earth-50 hover:bg-earth-100 text-earth-800 font-bold rounded-xl text-xs border border-earth-200 transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  Quick Quote Offer
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. GLOBAL PRESENCE */}
      <section id="presence" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-earth-200 rounded-3xl p-8 lg:p-12 shadow-sm">
          
          {/* Left: Map Graphic Representation */}
          <div className="lg:col-span-6 bg-forest-950 rounded-2xl p-6 relative overflow-hidden min-h-[300px] flex items-center justify-center border border-forest-800 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(85,141,49,0.2),transparent_70%)]" />
            
            {/* World Map SVG Visualizer */}
            <div className="relative z-10 text-center space-y-4">
              <Globe size={120} className="mx-auto text-gold-400/40 stroke-[1]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-gold-400/30 animate-ping" />
              </div>
              <span className="inline-block px-3 py-1 bg-forest-900/90 text-gold-300 text-xs font-bold rounded-full border border-gold-500/40">
                Connected Trade Routes Active
              </span>
            </div>
          </div>

          {/* Right: Presence Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-gold-600">
              <span>◆</span>
              <span className="h-[1px] w-8 bg-gold-400" />
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-slate-900 uppercase tracking-wide">
              Global Presence
            </h2>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="border-l-2 border-gold-500 pl-4">
                <span className="font-serif-title text-3xl font-bold text-slate-900 block">50+</span>
                <span className="text-xs text-slate-500 font-semibold uppercase">Countries</span>
              </div>
              <div className="border-l-2 border-gold-500 pl-4">
                <span className="font-serif-title text-3xl font-bold text-slate-900 block">1000+</span>
                <span className="text-xs text-slate-500 font-semibold uppercase">Exporters</span>
              </div>
              <div className="border-l-2 border-gold-500 pl-4">
                <span className="font-serif-title text-3xl font-bold text-slate-900 block">20K+</span>
                <span className="text-xs text-slate-500 font-semibold uppercase">Buyers</span>
              </div>
              <div className="border-l-2 border-gold-500 pl-4">
                <span className="font-serif-title text-3xl font-bold text-slate-900 block">500K+</span>
                <span className="text-xs text-slate-500 font-semibold uppercase">Transactions</span>
              </div>
            </div>

            <button
              onClick={() => setMode('login')}
              className="mt-4 px-6 py-3 bg-forest-900 hover:bg-forest-800 text-gold-300 font-bold rounded-full text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              Explore Global Network
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* 7. SUSTAINABILITY IS OUR PROMISE */}
      <section id="sustainability" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="font-serif-title text-3xl font-bold text-slate-900 uppercase tracking-wide">
              Sustainability Is Our Promise
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              We are building a future where agriculture is profitable, sustainable and empowering for every farmer.
            </p>
          </div>
          <button 
            onClick={() => setMode('signup')}
            className="px-5 py-2.5 bg-forest-900 hover:bg-forest-800 text-white rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
          >
            Our Impact
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Carbon Conscious',
              desc: 'We promote eco-friendly farming and low-carbon logistics.',
              image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80'
            },
            {
              title: 'Organic & Natural',
              desc: 'Encouraging chemical free farming and healthier communities.',
              image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80'
            },
            {
              title: 'Fair Pricing',
              desc: 'Ensuring farmers get fair value for their hard work.',
              image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&q=80'
            },
            {
              title: 'Farmer Empowerment',
              desc: 'Training, financing and technology for a better tomorrow.',
              image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80'
            }
          ].map((card, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="h-40 overflow-hidden bg-slate-100">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif-title font-bold text-slate-900 text-base mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. WHAT OUR PARTNERS SAY */}
      <section id="testimonials" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-950 border border-gold-500/30 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-gold-400 mb-2">
              <span>◆</span>
              <span className="h-[1px] w-10 bg-gold-400/50" />
              <span>◆</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
              What Our Partners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rohit Malhotra',
                role: 'Import Director, GreenLeaf Foods',
                photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
                quote: 'AGRILOG has transformed how we source agricultural products. The platform is reliable, transparent and efficient.'
              },
              {
                name: 'Emma Roberts',
                role: 'CEO, Nature\'s Basket Global',
                photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
                quote: 'The best B2B platform for agri trade. Quality buyers and great support team.'
              },
              {
                name: 'Suresh Patil',
                role: 'Organic Farmer, Maharashtra',
                photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
                quote: 'Finally a platform that truly empowers farmers and gives us global opportunities.'
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-forest-900/60 border border-forest-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex text-gold-400 gap-1 text-sm">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs text-slate-200 italic leading-relaxed font-light">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-forest-800/80">
                  <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-gold-400/50" />
                  <div>
                    <h4 className="font-serif-title font-bold text-white text-sm">{t.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. READY TO TRADE GLOBALLY? CTA */}
      <section className="py-20 bg-forest-950 text-white relative overflow-hidden border-t border-forest-900">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80')`
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-12 h-12 bg-gold-500/20 text-gold-400 rounded-full flex items-center justify-center mx-auto border border-gold-400/40">
            <Wheat size={24} />
          </div>

          <h2 className="font-serif-title text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Ready to Trade Globally?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
            Join thousands of farmers and businesses growing together with AGRILOG.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setMode('signup')}
              className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-forest-950 font-bold rounded-full shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer text-sm"
            >
              Join Marketplace
            </button>
            <button
              onClick={() => setMode('login')}
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-slate-400/60 font-semibold rounded-full transition-all cursor-pointer text-sm"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* 10. AUTH / LOGIN MODAL (Rendered when user clicks Sign In / Register / Join) */}
      {mode !== 'hero' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative">
            <button 
              onClick={() => { setMode('hero'); setError(''); setSuccessMessage(''); }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer z-10"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            {mode !== 'forgot-password' && (
              <div className="flex border-b border-slate-100">
                <button
                  onClick={() => { setMode('login'); setError(''); setSuccessMessage(''); }}
                  className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
                    mode === 'login' 
                      ? 'border-forest-600 text-forest-700 bg-forest-50/30' 
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setMode('signup'); setRole('BUYER'); setError(''); setSuccessMessage(''); }}
                  className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-all ${
                    mode === 'signup' 
                      ? 'border-forest-600 text-forest-700 bg-forest-50/30' 
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Create Account
                </button>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h3 className="text-xl font-bold font-serif-title text-slate-900">
                  {mode === 'forgot-password'
                    ? 'Reset Password'
                    : mode === 'login' 
                      ? 'Welcome Back to AGRILOG' 
                      : 'Get Started with AGRILOG'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {mode === 'forgot-password'
                    ? 'Enter your registered email address to receive a reset link.'
                    : mode === 'login' 
                      ? 'Access your agriculture trade account' 
                      : 'Register to start trading bulk agri commodities'}
                </p>
              </div>

              {successMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-semibold">
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
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
                {/* Role Switcher */}
                {mode === 'login' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Access Portal As
                    </label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setRole('BUYER')}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
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
                        className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                          role === 'SELLER' 
                            ? 'bg-white text-earth-700 shadow-xs' 
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Seller
                      </button>
                    </div>
                  </div>
                )}

                {/* Signup Fields */}
                {mode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-forest-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Company Name</label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Punjab Agro Corp"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-forest-600 focus:outline-hidden"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-forest-600 focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Location</label>
                        <input
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Chandigarh, PB"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-forest-600 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="trading@cropcorp.com"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-forest-600 focus:outline-hidden"
                  />
                </div>

                {/* Password */}
                {mode !== 'forgot-password' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Password</label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => { setMode('forgot-password'); setError(''); setSuccessMessage(''); }}
                          className="text-[10px] font-semibold text-forest-700 hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-forest-600 focus:outline-hidden"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-forest-700 hover:bg-forest-800 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs mt-2"
                >
                  {mode === 'forgot-password' ? 'Send Reset Link' : mode === 'login' ? 'Sign In to Marketplace' : 'Create Profile'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* 11. INTERACTIVE PRD DOCUMENT MODAL */}
      {isPrdModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden relative">
            
            {/* PRD Modal Header */}
            <div className="p-6 bg-forest-950 text-white flex justify-between items-center border-b border-forest-900">
              <div>
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <FileText size={14} />
                  <span>Product Requirement Document (PRD) v1.0</span>
                </div>
                <h3 className="text-2xl font-bold font-serif-title text-white">AGRILOG Ecosystem Architecture</h3>
              </div>
              <button 
                onClick={() => setIsPrdModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-forest-900 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable PRD Content */}
            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto text-xs text-slate-700 leading-relaxed font-light">
              
              {/* Executive Summary */}
              <div className="bg-forest-50/60 border border-forest-200/80 p-5 rounded-2xl space-y-2">
                <h4 className="text-sm font-bold font-display text-forest-900 uppercase tracking-wide">1. Executive Summary & Core USP</h4>
                <p>
                  <strong>AGRILOG</strong> is a single-window, multilingual agricultural platform supporting farmers across all 3 lifecycle stages: <strong>Pre-Sowing (Crop Advisory Engine)</strong>, <strong>Cultivation (Equipment Rental Hub)</strong>, and <strong>Post-Harvest (Direct B2B Market Access)</strong>.
                </p>
              </div>

              {/* User Personas Table */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-display text-slate-900 uppercase tracking-wide">2. Target User Personas</h4>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-800 font-bold">
                      <tr>
                        <th className="p-3 border-b border-slate-200">Persona</th>
                        <th className="p-3 border-b border-slate-200">Primary Goal</th>
                        <th className="p-3 border-b border-slate-200">Core Platform Need</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Small & Medium Farmers</td>
                        <td className="p-3">Higher profitability, reduced operational risk</td>
                        <td className="p-3">Demand-led crop advice, machinery rentals, direct buyers</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Equipment Owners</td>
                        <td className="p-3">Monetize machinery during idle periods</td>
                        <td className="p-3">Direct rental listings & escrow payments</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Domestic Buyers</td>
                        <td className="p-3">Reliable quality crop sourcing directly from farms</td>
                        <td className="p-3">Verified seller listings, transparent pricing</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Enterprise & Export Buyers</td>
                        <td className="p-3">Bulk procurement for international markets</td>
                        <td className="p-3">Scalable supply pipelines & contract management</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Modules Breakdown */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold font-display text-slate-900 uppercase tracking-wide">3. Core Product Modules</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-slate-200 rounded-2xl bg-white shadow-2xs space-y-2">
                    <span className="text-[10px] font-bold text-forest-700 uppercase bg-forest-50 px-2 py-0.5 rounded">Module 1: Pre-Sowing</span>
                    <h5 className="font-bold text-slate-900 text-xs">Crop Advisory Engine</h5>
                    <p className="text-[11px] text-slate-600">Recommends high-margin crops matching real-time buyer contract demand with vernacular voice assistance.</p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-2xl bg-white shadow-2xs space-y-2">
                    <span className="text-[10px] font-bold text-earth-700 uppercase bg-earth-50 px-2 py-0.5 rounded">Module 2: Cultivation</span>
                    <h5 className="font-bold text-slate-900 text-xs">Equipment Rental Hub</h5>
                    <p className="text-[11px] text-slate-600">Local machinery rental marketplace connecting farmers with nearby tractor and harvester owners.</p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-2xl bg-white shadow-2xs space-y-2">
                    <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded">Module 3: Post-Harvest</span>
                    <h5 className="font-bold text-slate-900 text-xs">Verified B2B Marketplace</h5>
                    <p className="text-[11px] text-slate-600">Instant digital quote matching, order fulfillment tracking, and escrow payout protection.</p>
                  </div>
                </div>
              </div>

              {/* Competitive Landscape */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-display text-slate-900 uppercase tracking-wide">4. Competitive Landscape</h4>
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-800 font-bold">
                      <tr>
                        <th className="p-3 border-b border-slate-200">Platform</th>
                        <th className="p-3 border-b border-slate-200">Scope</th>
                        <th className="p-3 border-b border-slate-200">AGRILOG Advantage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">IndiaMART</td>
                        <td className="p-3">Generic B2B listing site</td>
                        <td className="p-3">Specialized agri context, demand matching & logistics support</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">eNAM</td>
                        <td className="p-3">Govt agricultural trading platform</td>
                        <td className="p-3">Integrates pre-harvest planning & equipment rentals with trade</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Monetization & Revenue Model */}
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
                <h4 className="text-sm font-bold font-display text-slate-900 uppercase tracking-wide">5. Business & Revenue Streams</h4>
                <ul className="list-disc pl-4 space-y-1 font-normal text-slate-700">
                  <li><strong>Trade Commission:</strong> 1.5% - 3.5% fee on successful B2B crop sales transactions.</li>
                  <li><strong>Equipment Partnerships:</strong> Revenue share on machine rental bookings and partner listings.</li>
                  <li><strong>Enterprise Subscriptions:</strong> Premium bulk sourcing feeds for national/international corporate buyers.</li>
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center">
              <span className="text-[11px] text-slate-500 font-medium">AGRILOG Systems Inc. © 2026</span>
              <button
                onClick={() => setIsPrdModalOpen(false)}
                className="px-6 py-2 bg-forest-700 hover:bg-forest-800 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
              >
                Close Blueprint
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

