import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import BuyerPanel from './components/BuyerPanel';
import SellerPanel from './components/SellerPanel';
import AdminPanel from './components/AdminPanel';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, onSnapshot, getDocs } from 'firebase/firestore';
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
  const [userRole, setUserRole] = useState(null); // 'BUYER', 'SELLER', 'ADMIN', or null
  const [currentUser, setCurrentUser] = useState(null); // { name, company, phone, location, email }
  const [currentView, setCurrentView] = useState('landing'); // views: 'landing', 'auth-login', 'auth-signup', 'buyer-*', 'seller-*', 'admin-*', 'access-denied'
  const [attemptedRestrictedView, setAttemptedRestrictedView] = useState(null); // to show which view was denied

  // Admin Impersonation Context
  const [impersonatedUser, setImpersonatedUser] = useState(null);

  // Core Data States
  const [requirements, setRequirements] = useState(INITIAL_REQUIREMENTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [bids, setBids] = useState([]);

  // Listen to Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const profileData = userDoc.data();
            setCurrentUser(profileData);
            setUserRole(profileData.role);
            
            // Restore or default view
            const savedView = localStorage.getItem('agrilog_current_view');
            if (!savedView || savedView === 'landing' || savedView.startsWith('auth-')) {
              if (profileData.role === 'ADMIN') {
                setCurrentView('admin-dashboard');
              } else {
                setCurrentView(profileData.role === 'BUYER' ? 'buyer-dashboard' : 'seller-dashboard');
              }
            } else {
              setCurrentView(savedView);
            }
          } else {
            // Profile setup pending (e.g. first time Google Sign-In)
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              name: user.displayName || ''
            });
            setUserRole(null);
            setCurrentView('landing');
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          handleLogout();
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
        setCurrentView('landing');
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync view updates to localStorage for non-auth views
  useEffect(() => {
    if (currentView && currentView !== 'landing' && !currentView.startsWith('auth-')) {
      localStorage.setItem('agrilog_current_view', currentView);
    }
  }, [currentView]);

  // Real-time Firestore synchronization for requirements, orders, and bids
  useEffect(() => {
    if (!currentUser?.uid || !userRole) {
      return;
    }

    // Set up snapshot listener for Requirements
    const qReq = collection(db, 'requirements');
    const unsubscribeReq = onSnapshot(qReq, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      
      // Sort by createdAt desc
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

      if (userRole === 'BUYER') {
        // Buyer only sees their own requirements
        setRequirements(list.filter(r => r.buyerUid === currentUser.uid));
      } else {
        // Seller and Admin see all active/quoted requirements
        setRequirements(list);
      }
    });

    // Set up snapshot listener for Orders
    const qOrd = collection(db, 'orders');
    const unsubscribeOrd = onSnapshot(qOrd, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      // Sort by lastUpdated desc
      list.sort((a, b) => new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0));

      if (userRole === 'BUYER') {
        // Buyer sees orders they placed
        setOrders(list.filter(o => o.buyerUid === currentUser.uid));
      } else if (userRole === 'SELLER') {
        // Seller sees orders they fulfill
        setOrders(list.filter(o => o.sellerUid === currentUser.uid));
      } else if (userRole === 'ADMIN') {
        // Admin sees all orders
        setOrders(list);
      }
    });

    // Set up snapshot listener for Bids (Quotes)
    const qBids = collection(db, 'bids');
    const unsubscribeBids = onSnapshot(qBids, (snapshot) => {
      const list = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setBids(list);
    });

    return () => {
      unsubscribeReq();
      unsubscribeOrd();
      unsubscribeBids();
    };
  }, [currentUser, userRole]);

  // Seed initial requirements and orders if database is empty
  useEffect(() => {
    const seedDatabase = async () => {
      const reqSnapshot = await getDocs(collection(db, 'requirements'));
      if (reqSnapshot.empty) {
        for (const req of INITIAL_REQUIREMENTS) {
          const reqId = `REQ-${Math.floor(100 + Math.random() * 900)}`;
          await setDoc(doc(db, 'requirements', reqId), {
            ...req,
            buyerUid: 'seed-buyer-uid',
            createdAt: new Date().toISOString()
          });
        }
      }

      const ordSnapshot = await getDocs(collection(db, 'orders'));
      if (ordSnapshot.empty) {
        for (const ord of INITIAL_ORDERS) {
          const ordId = `ORD-${Math.floor(900 + Math.random() * 100)}`;
          await setDoc(doc(db, 'orders', ordId), {
            ...ord,
            buyerUid: 'seed-buyer-uid',
            sellerUid: 'seed-seller-uid',
            lastUpdated: new Date().toISOString()
          });
        }
      }
    };
    
    if (currentUser?.uid) {
      seedDatabase().catch(console.error);
    }
  }, [currentUser]);

  // Handle Login / Registration Success
  const handleLoginSuccess = (userData, role) => {
    setCurrentUser(userData);
    setUserRole(role);
    
    let nextView = 'landing';
    if (role === 'BUYER') {
      nextView = 'buyer-dashboard';
    } else if (role === 'SELLER') {
      nextView = 'seller-dashboard';
    } else if (role === 'ADMIN') {
      nextView = 'admin-dashboard';
    }
    setCurrentView(nextView);
  };

  // Sign out / Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserRole(null);
      setImpersonatedUser(null);
      setCurrentView('landing');
      localStorage.removeItem('agrilog_current_view');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Buyer Action: Post a Crop Sourcing Requirement
  const handlePostRequirement = async (reqData) => {
    const activeUser = impersonatedUser || currentUser;
    if (!activeUser?.uid) return;

    const reqId = `REQ-${Math.floor(100 + Math.random() * 900)}`;
    const newRequirement = {
      articleName: reqData.articleName,
      category: reqData.category,
      quantity: Number(reqData.quantity),
      unit: reqData.unit,
      deliveryTimeline: reqData.deliveryTimeline,
      targetPrice: Number(reqData.targetPrice),
      currency: reqData.currency || 'USD',
      buyerUid: activeUser.uid,
      buyerName: activeUser.name,
      buyerCompany: activeUser.company,
      buyerPhone: activeUser.phone,
      buyerLocation: activeUser.location,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'requirements', reqId), newRequirement);
    } catch (err) {
      console.error('Error posting requirement:', err);
    }
  };

  // Seller Action: Submit commercial quote
  const handleSubmitQuote = async (requirementId, quoteData) => {
    const activeUser = impersonatedUser || currentUser;
    if (!activeUser?.uid) return;

    // 1. Locate the requirement to fetch Buyer information
    const req = requirements.find(r => r.id === requirementId);
    if (!req) return;

    try {
      // 2. Update the status of the requirement to 'quoted'
      await updateDoc(doc(db, 'requirements', requirementId), { status: 'quoted' });

      // 3. Auto-generate a pending order
      const orderId = `ORD-${Math.floor(900 + Math.random() * 100)}`;
      const newOrder = {
        requirementId: requirementId,
        articleName: req.articleName,
        category: req.category,
        quantity: Number(req.quantity),
        unit: req.unit,
        price: Number(quoteData.quotePrice),
        buyerUid: req.buyerUid || 'seed-buyer-uid',
        buyerCompany: req.buyerCompany,
        buyerName: req.buyerName,
        buyerLocation: req.buyerLocation,
        sellerUid: activeUser.uid,
        sellerName: quoteData.sellerCompany,
        status: 'placed',
        lastUpdated: new Date().toISOString()
      };

      await setDoc(doc(db, 'orders', orderId), newOrder);

      // 4. Record bid details in the 'bids' collection
      const bidId = `BID-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBid = {
        id: bidId,
        requirementId: requirementId,
        articleName: req.articleName,
        category: req.category,
        quantity: Number(req.quantity),
        unit: req.unit,
        targetPrice: Number(req.targetPrice),
        bidPrice: Number(quoteData.quotePrice),
        deliveryDays: Number(quoteData.deliveryDays),
        sellerUid: activeUser.uid,
        sellerName: quoteData.sellerName,
        sellerCompany: quoteData.sellerCompany,
        sellerMessage: quoteData.sellerMessage,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'bids', bidId), newBid);

    } catch (err) {
      console.error('Error submitting quote:', err);
    }
  };

  // Seller Action: Update shipment tracking stage (placed -> dispatched -> transit -> delivered)
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        lastUpdated: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  // STAGE ROUTE GUARDING & RENDERING ENGINE
  // Validates if the user attempts to view a screen that is unauthorized based on RBAC rules.
  const renderMainContent = () => {
    const isBuyerPage = currentView.startsWith('buyer-');
    const isSellerPage = currentView.startsWith('seller-');
    const isAdminPage = currentView.startsWith('admin-');

    // Route Guarding: Guest trying to visit panels
    if ((isBuyerPage || isSellerPage || isAdminPage) && !userRole) {
      return (
        <LandingPage 
          onLoginSuccess={handleLoginSuccess} 
          initialAuthMode="login" 
        />
      );
    }

    // Route Guarding: Non-Admin trying to visit Admin pages
    if (isAdminPage && userRole !== 'ADMIN') {
      return (
        <AccessDenied 
          userRole={userRole} 
          onRedirect={() => setCurrentView(userRole === 'BUYER' ? 'buyer-dashboard' : 'seller-dashboard')} 
        />
      );
    }

    // Route Guarding: Buyer trying to visit Seller pages (Admin bypass allowed)
    if (isSellerPage && userRole !== 'SELLER' && userRole !== 'ADMIN') {
      return (
        <AccessDenied 
          userRole={userRole} 
          onRedirect={() => setCurrentView('buyer-dashboard')} 
        />
      );
    }

    // Route Guarding: Seller trying to visit Buyer pages (Admin bypass allowed)
    if (isBuyerPage && userRole !== 'BUYER' && userRole !== 'ADMIN') {
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
            user={impersonatedUser || currentUser}
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
            user={impersonatedUser || currentUser}
            requirements={requirements}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSubmitQuote={handleSubmitQuote}
            currentSubView={currentView}
            setCurrentSubView={setCurrentView}
          />
        );

      // ADMIN VIEWS
      case 'admin-dashboard':
      case 'admin-sellers':
      case 'admin-buyers':
      case 'admin-bids':
        return (
          <AdminPanel
            user={currentUser}
            requirements={requirements}
            orders={orders}
            bids={bids}
            onImpersonate={(impersonatedProfile) => {
              setImpersonatedUser(impersonatedProfile);
              setCurrentView(impersonatedProfile.role === 'BUYER' ? 'buyer-dashboard' : 'seller-dashboard');
            }}
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
        onLogout={handleLogout}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      
      {impersonatedUser && (
        <div className="bg-amber-500 text-white font-semibold py-2.5 px-4 text-center text-xs sm:text-sm flex justify-center items-center gap-2 shadow-inner z-50">
          <span>⚠️ Impersonation Mode: Acting as {impersonatedUser.role.toLowerCase()} - <strong>{impersonatedUser.company}</strong> ({impersonatedUser.name})</span>
          <button 
            onClick={() => {
              setImpersonatedUser(null);
              setCurrentView('admin-dashboard');
            }}
            className="ml-3 bg-white text-amber-700 hover:bg-slate-100 font-bold px-2 py-0.5 rounded text-xs transition-all cursor-pointer"
          >
            Return to Admin Panel
          </button>
        </div>
      )}
      
      <main className="flex-grow">
        {renderMainContent()}
      </main>

      <Footer />
    </div>
  );
}
