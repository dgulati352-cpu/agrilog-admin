import React, { useState, useEffect } from 'react';
import { db, firebaseConfig } from '../firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

import AdminHeader from './admin/AdminHeader';
import AdminSidebar from './admin/AdminSidebar';
import UserKycModule from './admin/UserKycModule';
import CropDemandAdvisoryModule from './admin/CropDemandAdvisoryModule';
import EquipmentRentalModule from './admin/EquipmentRentalModule';
import MarketplaceOrdersModule from './admin/MarketplaceOrdersModule';
import RevenueCommissionModule from './admin/RevenueCommissionModule';
import MultilingualCmsModule from './admin/MultilingualCmsModule';
import AnalyticsDashboardModule from './admin/AnalyticsDashboardModule';
import AuditSecurityModule from './admin/AuditSecurityModule';

import {
  INITIAL_USERS_KYC,
  INITIAL_DEMAND_INDEX,
  INITIAL_CROP_ADVISORIES,
  INITIAL_EQUIPMENT_CATALOG,
  INITIAL_RENTAL_BOOKINGS,
  INITIAL_HARVEST_LISTINGS,
  INITIAL_TRANSACTION_LEDGER,
  INITIAL_ENTERPRISE_SUBSCRIPTIONS,
  INITIAL_LOCALIZATION_DICTIONARY,
  INITIAL_BROADCAST_HISTORY,
  INITIAL_AUDIT_LOGS
} from './admin/mockAdminData';

// Secondary Firebase App instance to prevent Admin session logout when creating Sellers
const secondaryApp = getApps().find(app => app.name === "secondary") || initializeApp(firebaseConfig, "secondary");
const secondaryAuth = getAuth(secondaryApp);

export default function AdminPanel({ 
  user,
  requirements = [], 
  orders = [], 
  bids = [], 
  onImpersonate,
  currentSubView,
  setCurrentSubView
}) {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics', 'kyc', 'demand-advisory', 'equipment-rentals', 'marketplace-orders', 'finance-commissions', 'localization-cms', 'audit-security'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Active Admin Role & PII Privacy State
  const [activeAdminRole, setActiveAdminRole] = useState('SUPER_ADMIN'); // 'SUPER_ADMIN', 'OPERATIONS', 'AGRONOMY', 'FINANCE'
  const [maskPii, setMaskPii] = useState(true);

  // Core Data State
  const [usersKyc, setUsersKyc] = useState(INITIAL_USERS_KYC);
  const [demandList, setDemandList] = useState(INITIAL_DEMAND_INDEX);
  const [advisoriesList, setAdvisoriesList] = useState(INITIAL_CROP_ADVISORIES);
  const [equipmentList, setEquipmentList] = useState(INITIAL_EQUIPMENT_CATALOG);
  const [bookingsList, setBookingsList] = useState(INITIAL_RENTAL_BOOKINGS);
  const [harvestListings, setHarvestListings] = useState(INITIAL_HARVEST_LISTINGS);
  const [transactionLedger, setTransactionLedger] = useState(INITIAL_TRANSACTION_LEDGER);
  const [subscriptionsList, setSubscriptionsList] = useState(INITIAL_ENTERPRISE_SUBSCRIPTIONS);
  const [dictionaryList, setDictionaryList] = useState(INITIAL_LOCALIZATION_DICTIONARY);
  const [broadcastHistory, setBroadcastHistory] = useState(INITIAL_BROADCAST_HISTORY);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  const [commissionSettings, setCommissionSettings] = useState({
    marketplaceCommissionPct: 3.5,
    rentalServiceFeePct: 8.0,
    enterpriseSaasMonthlyUSD: 999
  });

  // Sync users from Firestore live collection
  useEffect(() => {
    const q = collection(db, 'users');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveUsersMap = new Map();
      
      // Load initial mock users first
      INITIAL_USERS_KYC.forEach(u => liveUsersMap.set(u.id, u));

      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        const existing = liveUsersMap.get(doc.id) || {};
        liveUsersMap.set(doc.id, {
          ...existing,
          ...data,
          id: doc.id,
          name: data.name || existing.name || 'User',
          role: data.role || existing.role || 'DOMESTIC_BUYER',
          location: data.location || existing.location || 'India',
          verificationStatus: data.verificationStatus || existing.verificationStatus || 'PENDING',
          verifiedBadge: data.verifiedBadge || existing.verifiedBadge || null,
          kycDocuments: data.kycDocuments || existing.kycDocuments || {
            idProof: 'Government ID',
            idProofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80'
          }
        });
      });

      setUsersKyc(Array.from(liveUsersMap.values()));
    }, (err) => {
      console.error("Firestore user sync note:", err);
    });

    return () => unsubscribe();
  }, []);

  // Helper log generator for immutable audit trail
  const logAuditAction = (actionType, targetEntity, details) => {
    const newLog = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      adminId: user?.uid || 'ADMIN-01',
      adminName: user?.name || 'Platform Admin',
      role: activeAdminRole,
      action: actionType,
      target: targetEntity,
      ipAddress: '127.0.0.1 (Session)',
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Handlers for User KYC
  const handleUpdateUserStatus = (userId, updates) => {
    setUsersKyc(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, ...updates };
      }
      return u;
    }));

    // Update Firestore if available
    try {
      setDoc(doc(db, 'users', userId), updates, { merge: true }).catch(() => {});
    } catch (e) {}

    logAuditAction(
      updates.verificationStatus === 'VERIFIED' ? 'KYC_APPROVE' :
      updates.verificationStatus === 'REJECTED' ? 'KYC_REJECT' : 'USER_STATUS_UPDATE',
      `User ${userId}`,
      `Updated status to ${updates.verificationStatus || 'BADGE_UPDATE'}`
    );
  };

  // Handlers for Crop Demand Engine
  const handleAddDemandIndex = (item) => {
    setDemandList(prev => [item, ...prev]);
    logAuditAction('DEMAND_INDEX_CREATE', item.cropName, `Created demand index for ${item.cropName} in ${item.regionState}`);
  };

  const handleUpdateDemandIndex = (item) => {
    setDemandList(prev => prev.map(d => d.id === item.id ? item : d));
    logAuditAction('DEMAND_INDEX_UPDATE', item.cropName, `Updated target tonnage to ${item.buyerTargetTonnage} Tons`);
  };

  // Handlers for Advisories
  const handleAddAdvisory = (item) => {
    setAdvisoriesList(prev => [item, ...prev]);
    logAuditAction('ADVISORY_CREATE', item.cropName, `Published advisory guide for ${item.cropName}`);
  };

  const handleUpdateAdvisory = (item) => {
    setAdvisoriesList(prev => prev.map(a => a.id === item.id ? item : a));
    logAuditAction('ADVISORY_UPDATE', item.cropName, `Updated advisory guide`);
  };

  // Handlers for Equipment
  const handleAddEquipment = (item) => {
    setEquipmentList(prev => [item, ...prev]);
    logAuditAction('EQUIPMENT_LISTING_CREATE', item.name, `Added machinery listing`);
  };

  const handleUpdateEquipmentStatus = (id, newStatus) => {
    setEquipmentList(prev => prev.map(eq => eq.id === id ? { ...eq, status: newStatus } : eq));
    logAuditAction('EQUIPMENT_STATUS_UPDATE', `Equipment #${id}`, `Set status to ${newStatus}`);
  };

  const handleResolveDispute = (bookingId, resolution) => {
    setBookingsList(prev => prev.map(b => b.id === bookingId ? { ...b, disputeStatus: 'RESOLVED', resolution } : b));
    logAuditAction('DISPUTE_RESOLVED', `Booking #${bookingId}`, `Resolved via ${resolution.resolutionAction}`);
  };

  // Handlers for Marketplace
  const handleUpdateListingStatus = (id, newStatus) => {
    setHarvestListings(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    logAuditAction('CROP_LISTING_MODERATE', `Listing #${id}`, `Status changed to ${newStatus}`);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setTransactionLedger(prev => prev.map(t => {
      if (t.orderId === orderId) {
        return {
          ...t,
          escrowStatus: newStatus === 'delivered' ? 'RELEASED' : 'ESCROW_LOCKED'
        };
      }
      return t;
    }));
    logAuditAction('DEAL_STAGE_UPDATE', `Order #${orderId}`, `Stage updated to ${newStatus}`);
  };

  // Handlers for Finance
  const handleUpdateCommissionSettings = (newSettings) => {
    setCommissionSettings(newSettings);
    logAuditAction('COMMISSION_RATE_UPDATE', 'System Config', `Marketplace fee: ${newSettings.marketplaceCommissionPct}%`);
  };

  const handleReleaseEscrow = (txnId) => {
    setTransactionLedger(prev => prev.map(t => t.id === txnId ? { ...t, escrowStatus: 'RELEASED', payoutStatus: 'PAID' } : t));
    logAuditAction('ESCROW_PAYOUT_RELEASE', `Txn #${txnId}`, `Escrow funds released to farmer`);
  };

  // Handlers for CMS
  const handleAddTranslation = (item) => {
    setDictionaryList(prev => [item, ...prev]);
    logAuditAction('CMS_STRING_ADD', item.key, `Added translation string`);
  };

  const handleUpdateTranslation = (item) => {
    setDictionaryList(prev => prev.map(d => d.id === item.id ? item : d));
    logAuditAction('CMS_STRING_UPDATE', item.key, `Updated translations across languages`);
  };

  const handleSendBroadcast = (brd) => {
    setBroadcastHistory(prev => [brd, ...prev]);
    logAuditAction('BROADCAST_SENT', brd.title, `Delivered push alert to ${brd.recipientCount} farmers`);
  };

  const pendingKycCount = usersKyc.filter(u => u.verificationStatus === 'PENDING').length;
  const disputeCount = bookingsList.filter(b => b.disputeStatus === 'DISPUTED').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Admin Top Navigation Bar */}
      <AdminHeader
        user={user}
        activeAdminRole={activeAdminRole}
        setActiveAdminRole={setActiveAdminRole}
        maskPii={maskPii}
        setMaskPii={setMaskPii}
      />

      {/* Main Admin Dashboard Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Minimalist Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          pendingKycCount={pendingKycCount}
          disputeCount={disputeCount}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Core Content Canvas */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* Module 1: Analytics Overview */}
          {activeTab === 'analytics' && (
            <AnalyticsDashboardModule
              orders={orders}
              users={usersKyc}
              demandList={demandList}
              equipmentList={equipmentList}
              subscriptionsList={subscriptionsList}
            />
          )}

          {/* Module 2: User Directory & KYC */}
          {activeTab === 'kyc' && (
            <UserKycModule
              users={usersKyc}
              onUpdateUserStatus={handleUpdateUserStatus}
              maskPii={maskPii}
              activeAdminRole={activeAdminRole}
            />
          )}

          {/* Module 3: Crop Demand & Advisory */}
          {activeTab === 'demand-advisory' && (
            <CropDemandAdvisoryModule
              demandList={demandList}
              advisoriesList={advisoriesList}
              onAddDemandIndex={handleAddDemandIndex}
              onUpdateDemandIndex={handleUpdateDemandIndex}
              onAddAdvisory={handleAddAdvisory}
              onUpdateAdvisory={handleUpdateAdvisory}
            />
          )}

          {/* Module 4: Equipment & Rentals */}
          {activeTab === 'equipment-rentals' && (
            <EquipmentRentalModule
              equipmentList={equipmentList}
              bookingsList={bookingsList}
              onUpdateEquipmentStatus={handleUpdateEquipmentStatus}
              onAddEquipment={handleAddEquipment}
              onResolveDispute={handleResolveDispute}
            />
          )}

          {/* Module 5: Marketplace & Orders */}
          {activeTab === 'marketplace-orders' && (
            <MarketplaceOrdersModule
              harvestListings={harvestListings}
              orders={orders}
              requirements={requirements}
              onUpdateListingStatus={handleUpdateListingStatus}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          )}

          {/* Module 6: Revenue & Commissions */}
          {activeTab === 'finance-commissions' && (
            <RevenueCommissionModule
              transactionLedger={transactionLedger}
              subscriptionsList={subscriptionsList}
              commissionSettings={commissionSettings}
              onUpdateCommissionSettings={handleUpdateCommissionSettings}
              onReleaseEscrow={handleReleaseEscrow}
            />
          )}

          {/* Module 7: Multilingual CMS & Broadcast */}
          {activeTab === 'localization-cms' && (
            <MultilingualCmsModule
              dictionaryList={dictionaryList}
              broadcastHistory={broadcastHistory}
              onAddTranslation={handleAddTranslation}
              onUpdateTranslation={handleUpdateTranslation}
              onSendBroadcast={handleSendBroadcast}
            />
          )}

          {/* Module 8: Audit Logs & Security Config */}
          {activeTab === 'audit-security' && (
            <AuditSecurityModule
              auditLogs={auditLogs}
              maskPii={maskPii}
              setMaskPii={setMaskPii}
              activeAdminRole={activeAdminRole}
              setActiveAdminRole={setActiveAdminRole}
            />
          )}

        </main>

      </div>
    </div>
  );
}
