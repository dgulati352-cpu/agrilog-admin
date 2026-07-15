import React, { useState } from 'react';
import { Sprout, LogOut, Shield, ChevronDown, User, Menu, X } from 'lucide-react';

export default function Navbar({ 
  user, 
  userRole, 
  onLogout,
  currentView,
  setCurrentView
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo and Main Nav */}
          <div className="flex items-center gap-8">
            <div 
              onClick={() => navigateTo('landing')} 
              className="flex items-center gap-2 cursor-pointer font-bold text-xl font-display text-slate-900 select-none"
            >
              <span className="p-1.5 bg-forest-600 rounded-lg text-white">
                <Sprout size={20} className="stroke-[2.5]" />
              </span>
              <span>AGRI<span className="text-forest-600">LOG</span></span>
            </div>

            {/* Desktop Role-Based Links */}
            {userRole && (
              <div className="hidden md:flex items-center gap-1">
                {userRole === 'ADMIN' ? (
                  <>
                    <button 
                      onClick={() => navigateTo('admin-dashboard')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
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
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentView === 'buyer-dashboard' 
                          ? 'bg-forest-50 text-forest-700' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => navigateTo('buyer-post-requirement')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentView === 'buyer-post-requirement' 
                          ? 'bg-forest-50 text-forest-700' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Post Requirement
                    </button>
                    <button 
                      onClick={() => navigateTo('buyer-my-requirements')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentView === 'buyer-my-requirements' 
                          ? 'bg-forest-50 text-forest-700' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      My Requirements
                    </button>
                    <button 
                      onClick={() => navigateTo('buyer-order-tracking')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentView === 'buyer-order-tracking' 
                          ? 'bg-forest-50 text-forest-700' 
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
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentView === 'seller-dashboard' 
                          ? 'bg-forest-50 text-forest-700' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Seller Dashboard
                    </button>
                    <button 
                      onClick={() => navigateTo('seller-leads')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentView === 'seller-leads' 
                          ? 'bg-forest-50 text-forest-700' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Marketplace Leads
                    </button>
                    <button 
                      onClick={() => navigateTo('seller-fulfillment')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentView === 'seller-fulfillment' 
                          ? 'bg-forest-50 text-forest-700' 
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      Fulfillment
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Actions (Role Simulator & User Info) */}
          <div className="hidden md:flex items-center gap-4">
            

            {/* User Profile Info / Sign In */}
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
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo('auth-login')}
                className="px-4 py-2 text-sm font-semibold text-forest-700 hover:text-forest-800 hover:bg-forest-50/50 rounded-xl transition-all"
              >
                Sign In / Register
              </button>
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
