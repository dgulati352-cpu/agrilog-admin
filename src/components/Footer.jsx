import React, { useState } from 'react';
import { Sprout, ArrowRight, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-forest-950 text-slate-400 border-t border-forest-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-forest-900/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl font-display">
              <span className="p-1.5 bg-forest-600 rounded-xl text-white shadow-sm">
                <Sprout size={20} className="stroke-[2.5]" />
              </span>
              <span className="font-serif-title tracking-tight text-white">
                AGRI<span className="text-gold-400">LOG</span>
              </span>
            </div>
            <p className="text-xs text-gold-300/80 font-serif-title italic">
              Connecting Agriculture Beyond Borders
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Premium B2B platform helping exporters, importers, farmers and buyers trade directly across 50+ countries.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-forest-900 hover:bg-forest-800 text-slate-300 hover:text-gold-300 flex items-center justify-center transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-forest-900 hover:bg-forest-800 text-slate-300 hover:text-gold-300 flex items-center justify-center transition-colors">
                <Linkedin size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-forest-900 hover:bg-forest-800 text-slate-300 hover:text-gold-300 flex items-center justify-center transition-colors">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-forest-900 hover:bg-forest-800 text-slate-300 hover:text-gold-300 flex items-center justify-center transition-colors">
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div>
              <h4 className="text-slate-200 font-bold uppercase tracking-wider mb-4 font-sans text-[11px]">Company</h4>
              <ul className="space-y-2.5 font-light">
                <li><a href="#" className="hover:text-gold-300 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Press & Media</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-200 font-bold uppercase tracking-wider mb-4 font-sans text-[11px]">Marketplace</h4>
              <ul className="space-y-2.5 font-light">
                <li><a href="#" className="hover:text-gold-300 transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Countries</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Verified Buyers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-200 font-bold uppercase tracking-wider mb-4 font-sans text-[11px]">Export & Import</h4>
              <ul className="space-y-2.5 font-light">
                <li><a href="#" className="hover:text-gold-300 transition-colors">Export Services</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Logistics</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Compliance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-200 font-bold uppercase tracking-wider mb-4 font-sans text-[11px]">Resources</h4>
              <ul className="space-y-2.5 font-light">
                <li><a href="#" className="hover:text-gold-300 transition-colors">Blog & News</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Agri Guides</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">API & Docs</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider font-sans text-[11px]">Newsletter</h4>
            <p className="text-xs text-slate-400 font-light">
              Stay updated with market news and insights.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2 pt-1">
              <div className="relative flex items-center">
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-3 pr-10 py-2 bg-forest-900/90 border border-forest-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-gold-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-1.5 bg-forest-700 hover:bg-forest-600 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] text-gold-300 font-semibold block">Thank you for subscribing!</span>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AGRILOG. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
