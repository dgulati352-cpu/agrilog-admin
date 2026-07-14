import React from 'react';
import { Sprout, ShieldCheck, HelpCircle, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4 font-display">
              <span className="p-1.5 bg-forest-600 rounded-lg text-white">
                <Sprout size={20} className="stroke-[2.5]" />
              </span>
              <span>AGRI<span className="text-forest-400">LOG</span></span>
            </div>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              The premier B2B agriculture marketplace connecting verified growers, traders, and bulk buyers with speed, trust, and transparency.
            </p>
            <div className="flex items-center gap-2 text-xs text-forest-500 font-medium">
              <ShieldCheck size={14} />
              <span>Verified B2B Transactions Only</span>
            </div>
          </div>

          {/* Buyers Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">For Buyers</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Post Requirements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Browse Marketplace Leads</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bulk Logistics Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quality Guidelines</a></li>
            </ul>
          </div>

          {/* Sellers Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">For Sellers</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Explore Active Leads</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Submit Digital Quotes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fulfillment Tracking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seller Certification</a></li>
            </ul>
          </div>

          {/* Support / Help */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><HelpCircle size={14} /> Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1.5"><FileText size={14} /> Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Price Index</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>&copy; {new Date().getFullYear()} AGRILOG Technologies Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Security</a>
            <a href="#" className="hover:text-slate-400">Compliance</a>
            <a href="#" className="hover:text-slate-400">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
