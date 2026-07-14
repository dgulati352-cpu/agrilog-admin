import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import BuyerPanel from './components/BuyerPanel';
import SellerPanel from './components/SellerPanel';
import AccessDenied from './components/AccessDenied';
import Footer from './components/Footer';

// Default Mock Sourcing Requirements
const INITIAL_REQUIREMENTS = [
  {
    id: 'REQ-101',
    articleName: 'Premium Basmati Rice (1121 Variety)',
    category: 'Grains',
    quantity: 50,
    unit: 'Tons',
    deliveryTimeline: 'By Aug 20, 2026',
    targetPrice: 1250,
    currency: 'USD',
    buyerName: 'Rajesh Sharma',
    buyerCompany: 'Punjab Agro Corp',
    buyerPhone: '+91 98765 43210',
    buyerLocation: 'Chandigarh, Punjab',
    status: 'active'
  },
  {
    id: 'REQ-102',
    articleName: 'Organic Jyoti Potatoes',
    category: 'Vegetables',
    quantity: 15,
    unit: 'Tons',
    deliveryTimeline: 'Within 10 Days',
    targetPrice: 380,
    currency: 'USD',
    buyerName: 'Priya Patel',
    buyerCompany: 'Gujarat Veg Co-op',
    buyerPhone: '+91 91234 56789',
    buyerLocation: 'Ahmedabad, Gujarat',
    status: 'quoted'
  },
  {
    id: 'REQ-103',
    articleName: 'Export Quality Alphonso Mangoes',
    category: 'Fruits',
    quantity: 5,
    unit: 'Tons',
    deliveryTimeline: 'By July 30, 2026',
    targetPrice: 2800,
    currency: 'USD',
    buyerName: 'Amit Kapoor',
    buyerCompany: 'FreshFruits Exports',
    buyerPhone: '+91 99887 76655',
    buyerLocation: 'Ratnagiri, Maharashtra',
    status: 'active'
  },
  {
    id: 'REQ-104',
    articleName: 'Hard Red Winter Wheat',
    category: 'Grains',
    quantity: 100,
    unit: 'Tons',
    deliveryTimeline: 'By Sep 05, 2026',
    targetPrice: 290,
    currency: 'USD',
    buyerName: 'John Doe',
    buyerCompany: 'Midwest Grains Co.',
    buyerPhone: '+1 555-0199',
    buyerLocation: 'Kansas City, Missouri',
    status: 'fulfilled'
  }
];

// Default Mock Orders (connected Buyer-Seller transactions)
const INITIAL_ORDERS = [
  {
    id: 'ORD-901',
    requirementId: 'REQ-102',
    articleName: 'Organic Jyoti Potatoes',
    category: 'Vegetables',
    quantity: 15,
    unit: 'Tons',
    price: 375,
    buyerCompany: 'Punjab Agro Corp', // So it shows up in default Punjab Agro dashboard
    buyerName: 'Rajesh Sharma',
    buyerLocation: 'Chandigarh, Punjab',
    sellerName: 'GreenHarvest Organic Farms', // So it shows up in default GreenHarvest dashboard
    status: 'transit', // 'placed' | 'dispatched' | 'transit' | 'delivered'
    lastUpdated: 'July 14, 2026 10:30 AM'
  },
  {
    id: 'ORD-902',
    requirementId: 'REQ-104',
    articleName: 'Hard Red Winter Wheat',
    category: 'Grains',
    quantity: 100,
    unit: 'Tons',
    price: 290,
    buyerCompany: 'Midwest Grains Co.',
    buyerName: 'John Doe',
    buyerLocation: 'Kansas City, Missouri',
    sellerName: 'GreenHarvest Organic Farms',
    status: 'delivered',
    lastUpdated: 'July 12, 2026 04:15 PM'
  },
  {
    id: 'ORD-903',
    requirementId: 'REQ-101',
    articleName: 'Premium Basmati Rice (1121 Variety)',
    category: 'Grains',
    quantity: 50,
    unit: 'Tons',
    price: 1240,
    buyerCompany: 'Punjab Agro Corp',
    buyerName: 'Rajesh Sharma',
    buyerLocation: 'Chandigarh, Punjab',
    sellerName: 'Satnam Agro Foods',
    status: 'placed',
    lastUpdated: 'July 14, 2026 11:45 AM'
  }
];

export default function App() {
  // Authentication & Role State
  const [userRole, setUserRole] = useState(null); // 'BUYER', 'SELLER', or null
  const [currentUser, setCurrentUser] = useState(null); // { name, company, phone, location, email }
  const [currentView, setCurrentView] = useState('landing'); // views: 'landing', 'auth-login', 'auth-signup', 'buyer-*', 'seller-*', 'access-denied'
  const [attemptedRestrictedView, setAttemptedRestrictedView] = useState(null); // to show which view was denied

  // Core Data States
  const [requirements, setRequirements] = useState(INITIAL_REQUIREMENTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Default Mock Profiles
  const DEFAULT_BUYER = {
    name: 'Rajesh Sharma',
    company: 'Punjab Agro Corp',
    phone: '+91 98765 43210',
    location: 'Chandigarh, Punjab',
    email: 'buyer@agrilog.com'
  };

  const DEFAULT_SELLER = {
    name: 'Sukhwinder Singh',
    company: 'GreenHarvest Organic Farms',
    phone: '+91 99887 76655',
    location: 'Ludhiana, Punjab',
    email: 'seller@agrilog.com'
  };

  // Handle Login / Registration Success
  const handleLoginSuccess = (userData, role) => {
    setCurrentUser(userData);
    setUserRole(role);
    if (role === 'BUYER') {
      setCurrentView('buyer-dashboard');
    } else if (role === 'SELLER') {
      setCurrentView('seller-dashboard');
    }
  };

  // Sign out / Logout
  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
    setCurrentView('landing');
  };

  // Quick Role Simulator Switcher
  const handleSimulateRoleChange = (newRole) => {
    if (newRole === 'GUEST') {
      handleLogout();
    } else if (newRole === 'BUYER') {
      setCurrentUser(DEFAULT_BUYER);
      setUserRole('BUYER');
      setCurrentView('buyer-dashboard');
    } else if (newRole === 'SELLER') {
      setCurrentUser(DEFAULT_SELLER);
      setUserRole('SELLER');
      setCurrentView('seller-dashboard');
    }
  };

  // Buyer Action: Post a Crop Sourcing Requirement
  const handlePostRequirement = (reqData) => {
    const newRequirement = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      articleName: reqData.articleName,
      category: reqData.category,
      quantity: reqData.quantity,
      unit: reqData.unit,
      deliveryTimeline: reqData.deliveryTimeline,
      targetPrice: reqData.targetPrice,
      currency: reqData.currency || 'USD',
      buyerName: currentUser?.name || 'Demo Buyer',
      buyerCompany: currentUser?.company || 'Punjab Agro Corp',
      buyerPhone: currentUser?.phone || '+91 98765 43210',
      buyerLocation: currentUser?.location || 'Chandigarh, Punjab',
      status: 'active'
    };

    setRequirements([newRequirement, ...requirements]);
  };

  // Seller Action: Submit commercial quote
  // Generates a mock quote, marks requirement as 'quoted' and generates a new mock Order 
  // so the buyer can instantly see it in their Order Tracking dashboard!
  const handleSubmitQuote = (requirementId, quoteData) => {
    // 1. Update the status of the requirement to 'quoted'
    setRequirements(requirements.map(req => {
      if (req.id === requirementId) {
        return { ...req, status: 'quoted' };
      }
      return req;
    }));

    // 2. Locate the requirement to fetch Buyer information
    const req = requirements.find(r => r.id === requirementId);
    if (!req) return;

    // 3. Auto-generate a pending order so the cycle is fully testable!
    const newOrder = {
      id: `ORD-${Math.floor(900 + Math.random() * 100)}`,
      requirementId: requirementId,
      articleName: req.articleName,
      category: req.category,
      quantity: req.quantity,
      unit: req.unit,
      price: quoteData.quotePrice,
      buyerCompany: req.buyerCompany,
      buyerName: req.buyerName,
      buyerLocation: req.buyerLocation,
      sellerName: quoteData.sellerCompany,
      status: 'placed',
      lastUpdated: new Date().toLocaleString()
    };

    setOrders([newOrder, ...orders]);
  };

  // Seller Action: Update shipment tracking stage (placed -> dispatched -> transit -> delivered)
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: newStatus,
          lastUpdated: new Date().toLocaleString()
        };
      }
      return ord;
    }));
  };

  // STAGE ROUTE GUARDING & RENDERING ENGINE
  // Validates if the user attempts to view a screen that is unauthorized based on RBAC rules.
  const renderMainContent = () => {
    const isBuyerPage = currentView.startsWith('buyer-');
    const isSellerPage = currentView.startsWith('seller-');

    // Route Guarding: Guest trying to visit panels
    if ((isBuyerPage || isSellerPage) && !userRole) {
      return (
        <LandingPage 
          onLoginSuccess={handleLoginSuccess} 
          initialAuthMode="login" 
        />
      );
    }

    // Route Guarding: Buyer trying to visit Seller pages
    if (isSellerPage && userRole !== 'SELLER') {
      return (
        <AccessDenied 
          userRole={userRole} 
          onRedirect={() => setCurrentView('buyer-dashboard')} 
        />
      );
    }

    // Route Guarding: Seller trying to visit Buyer pages
    if (isBuyerPage && userRole !== 'BUYER') {
      return (
        <AccessDenied 
          userRole={userRole} 
          onRedirect={() => setCurrentView('seller-dashboard')} 
        />
      );
    }

    // Normal View Routing
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage 
            onLoginSuccess={handleLoginSuccess} 
            initialAuthMode="hero" 
          />
        );
      case 'auth-login':
        return (
          <LandingPage 
            onLoginSuccess={handleLoginSuccess} 
            initialAuthMode="login" 
          />
        );
      case 'auth-signup':
        return (
          <LandingPage 
            onLoginSuccess={handleLoginSuccess} 
            initialAuthMode="signup" 
          />
        );
      
      // BUYER VIEWS
      case 'buyer-dashboard':
      case 'buyer-post-requirement':
      case 'buyer-my-requirements':
      case 'buyer-order-tracking':
        return (
          <BuyerPanel
            user={currentUser}
            requirements={requirements}
            orders={orders}
            onPostRequirement={handlePostRequirement}
            currentSubView={currentView}
            setCurrentSubView={setCurrentView}
          />
        );

      // SELLER VIEWS
      case 'seller-dashboard':
      case 'seller-leads':
      case 'seller-fulfillment':
        return (
          <SellerPanel
            user={currentUser}
            requirements={requirements}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSubmitQuote={handleSubmitQuote}
            currentSubView={currentView}
            setCurrentSubView={setCurrentView}
          />
        );

      default:
        return (
          <LandingPage 
            onLoginSuccess={handleLoginSuccess} 
            initialAuthMode="hero" 
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar 
        user={currentUser} 
        userRole={userRole} 
        onSimulateRoleChange={handleSimulateRoleChange} 
        onLogout={handleLogout}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      <main className="flex-grow">
        {renderMainContent()}
      </main>

      <Footer />
    </div>
  );
}
