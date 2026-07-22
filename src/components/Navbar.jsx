import React, { useState } from 'react';
import { Sprout, LogOut, Shield, ChevronDown, User, Menu, X, Check, Globe } from 'lucide-react';

export default function Navbar({ 
  user, 
  userRole, 
  onLogout,
  currentView,
  setCurrentView
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({ code: 'en', label: 'English', flag: '🇺🇸' });

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
  ];

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsLangDropdownOpen(false);
  };

  const handleScrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    setIsLangDropdownOpen(false);
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo and Main Nav */}
          <div className="flex items-center gap-8">
            <div 
              onClick={() => {
                navigateTo('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <span className="p-1.5 bg-forest-600 group-hover:bg-forest-700 rounded-xl text-white transition-all shadow-sm shadow-forest-100">
                <Sprout size={20} className="stroke-[2.5]" />
              </span>
              <span className="font-bold text-xl font-display text-slate-900 tracking-tight">
                AGRI<span className="text-forest-600">LOG</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-forest-50 text-forest-700 rounded-full border border-forest-150/70">
                B2B Trade
              </span>
            </div>

            {/* Desktop Navigation Links */}
            {userRole ? (
              <div className="hidden md:flex items-center gap-1">
                {userRole === 'ADMIN' ? (
                  <>
                    <button 
                      onClick={() => navigateTo('admin-dashboard')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                        currentView.startsWith('admin-') 
                          ? 'bg-slate-100 text-slate-950' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Admin Dashboard
                    </button>
                  </>
                ) : userRole === 'BUYER' ? (
                  <>
                    <button 
                      onClick={() => navigateTo('buyer-dashboard')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        currentView === 'buyer-dashboard' 
                          ? 'bg-forest-50 text-forest-700 font-semibold' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => navigateTo('buyer-post-requirement')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        currentView === 'buyer-post-requirement' 
                          ? 'bg-forest-50 text-forest-700 font-semibold' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Post Requirement
                    </button>
                    <button 
                      onClick={() => navigateTo('buyer-my-requirements')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        currentView === 'buyer-my-requirements' 
                          ? 'bg-forest-50 text-forest-700 font-semibold' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      My Requirements
                    </button>
                    <button 
                      onClick={() => navigateTo('buyer-order-tracking')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        currentView === 'buyer-order-tracking' 
                          ? 'bg-forest-50 text-forest-700 font-semibold' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Order Tracking
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => navigateTo('seller-dashboard')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        currentView === 'seller-dashboard' 
                          ? 'bg-forest-50 text-forest-700 font-semibold' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Seller Dashboard
                    </button>
                    <button 
                      onClick={() => navigateTo('seller-leads')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        currentView === 'seller-leads' 
                          ? 'bg-forest-50 text-forest-700 font-semibold' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Marketplace Leads
                    </button>
                    <button 
                      onClick={() => navigateTo('seller-fulfillment')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        currentView === 'seller-fulfillment' 
                          ? 'bg-forest-50 text-forest-700 font-semibold' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Fulfillment
                    </button>
                  </>
                )}
              </div>
            ) : (
              /* Interactive Guest Header Navigation Links */
              <div className="hidden md:flex items-center gap-6 border-l border-slate-200/60 pl-6">
                <button
                  onClick={() => handleScrollToSection('marketplace')}
                  className="text-xs font-semibold text-slate-700 hover:text-forest-700 transition-colors cursor-pointer"
                >
                  Marketplace
                </button>
                <button
                  onClick={() => handleScrollToSection('solutions')}
                  className="text-xs font-semibold text-slate-700 hover:text-forest-700 transition-colors cursor-pointer"
                >
                  Solutions
                </button>
                <button
                  onClick={() => handleScrollToSection('presence')}
                  className="text-xs font-semibold text-slate-700 hover:text-forest-700 transition-colors cursor-pointer"
                >
                  Export
                </button>
                <button
                  onClick={() => handleScrollToSection('marketplace')}
                  className="text-xs font-semibold text-slate-700 hover:text-forest-700 transition-colors cursor-pointer"
                >
                  Import
                </button>
                <button
                  onClick={() => handleScrollToSection('how-it-works')}
                  className="text-xs font-semibold text-slate-700 hover:text-forest-700 transition-colors cursor-pointer"
                >
                  Resources
                </button>
                <button
                  onClick={() => handleScrollToSection('sustainability')}
                  className="text-xs font-semibold text-slate-700 hover:text-forest-700 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {userRole ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="flex flex-col text-right">
                  <span className="text-sm font-semibold text-slate-800">{user?.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{user?.company} • {userRole}</span>
                </div>
                <div className="p-2 bg-slate-100 text-slate-600 rounded-xl border border-slate-200">
                  <User size={16} />
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 relative">
                {/* Language Selector Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full border border-slate-200 transition-all cursor-pointer select-none"
                  >
                    <span>{selectedLanguage.flag}</span>
                    <span>{selectedLanguage.label}</span>
                    <ChevronDown size={12} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isLangDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-2xl shadow-xl py-1 z-50 animate-fadeIn">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left hover:bg-forest-50 transition-colors cursor-pointer ${
                            selectedLanguage.code === lang.code ? 'font-bold text-forest-700 bg-forest-50/60' : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </div>
                          {selectedLanguage.code === lang.code && <Check size={14} className="text-forest-600" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Join Marketplace CTA Button */}
                <button
                  onClick={() => navigateTo('auth-login')}
                  className="px-4 py-2 bg-gradient-to-r from-earth-700 to-earth-800 hover:from-earth-800 hover:to-earth-900 text-gold-300 border border-gold-500/40 text-xs font-bold rounded-full shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Join Marketplace
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner">
          {userRole ? (
            <>
              {/* Role-Specific Links */}
              {userRole === 'ADMIN' ? (
                <>
                  <button 
                    onClick={() => navigateTo('admin-dashboard')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Admin Dashboard
                  </button>
                </>
              ) : userRole === 'BUYER' ? (
                <>
                  <button 
                    onClick={() => navigateTo('buyer-dashboard')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => navigateTo('buyer-post-requirement')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Post Requirement
                  </button>
                  <button 
                    onClick={() => navigateTo('buyer-my-requirements')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    My Requirements
                  </button>
                  <button 
                    onClick={() => navigateTo('buyer-order-tracking')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Order Tracking
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigateTo('seller-dashboard')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Seller Dashboard
                  </button>
                  <button 
                    onClick={() => navigateTo('seller-leads')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Marketplace Leads
                  </button>
                  <button 
                    onClick={() => navigateTo('seller-fulfillment')}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Fulfillment
                  </button>
                </>
              )}
              
              {/* User details */}
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-slate-100 text-slate-600 rounded-lg">
                    <User size={14} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{user?.name}</div>
                    <div className="text-[10px] text-slate-500">{user?.company} • {userRole}</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium rounded-lg transition-all"
                >
                  <LogOut size={12} />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => navigateTo('auth-login')}
              className="w-full text-center py-2.5 bg-forest-600 hover:bg-forest-700 text-white font-semibold rounded-xl text-sm"
            >
              Sign In / Register
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
