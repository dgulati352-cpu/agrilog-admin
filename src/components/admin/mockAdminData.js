// Mock Database and Initial Data for AGRILOG Admin Panel

export const INITIAL_ADMIN_ROLES = {
  SUPER_ADMIN: {
    id: 'SUPER_ADMIN',
    title: 'Super Admin',
    description: 'Full access: User management, system settings, financial payouts, role assignments, audit logs.',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    permissions: ['all']
  },
  OPERATIONS: {
    id: 'OPERATIONS',
    title: 'Operations Admin',
    description: 'Verifies Farmers, Equipment Partners, and Buyers; support tickets & dispute resolution.',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    permissions: ['kyc_verify', 'machinery_moderate', 'orders_track', 'dispute_resolve']
  },
  AGRONOMY: {
    id: 'AGRONOMY',
    title: 'Agronomy & Content Manager',
    description: 'Updates market demand data, crop recommendations, seasonal advisories, and translations.',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    permissions: ['demand_update', 'advisory_manage', 'cms_translate', 'broadcast_send']
  },
  FINANCE: {
    id: 'FINANCE',
    title: 'Finance & Commission Admin',
    description: 'Oversees commission payouts, machinery partner payouts, settlements, and enterprise billing.',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    permissions: ['commission_set', 'escrow_release', 'partner_payout', 'subscriptions_manage']
  }
};

// Initial Users with KYC status and Document details
export const INITIAL_USERS_KYC = [
  {
    id: 'USR-801',
    name: 'Gurpreet Singh',
    email: 'gurpreet.farm@agrilog.in',
    phone: '+91 98765 12340',
    role: 'FARMER',
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    landHoldingAcres: 24.5,
    primaryCrops: ['Basmati Rice', 'Organic Wheat', 'Mustard'],
    verificationStatus: 'VERIFIED',
    verifiedBadge: 'Verified AGRILOG Farmer',
    kycDocuments: {
      idProof: 'Aadhaar Card (5432-8901-1234)',
      idProofType: 'Aadhaar',
      idProofUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      landHoldingDoc: 'Land Holding Record (Khatauni #441/B)',
      landHoldingUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      bankDetails: 'HDFC Bank - A/C 9876543210 (IFSC: HDFC0001234)'
    },
    joinedDate: '2026-03-12',
    activityDate: '2026-07-22'
  },
  {
    id: 'USR-802',
    name: 'Vikramjit Agro Machinery',
    email: 'contact@vikramjit-rentals.com',
    phone: '+91 91234 88776',
    role: 'EQUIPMENT_PARTNER',
    location: 'Karnal, Haryana',
    state: 'Haryana',
    fleetCount: 14,
    bankDetails: 'State Bank of India - A/C 5544332211 (IFSC: SBIN0004321)',
    verificationStatus: 'VERIFIED',
    verifiedBadge: 'Verified Equipment Partner',
    kycDocuments: {
      businessDoc: 'GST Certificate & Trade License',
      businessDocUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
      equipmentRcDoc: 'RC Books & Insurance Permits',
      equipmentRcUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      bankPassbookUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80'
    },
    joinedDate: '2026-04-05',
    activityDate: '2026-07-21'
  },
  {
    id: 'USR-803',
    name: 'Rajesh Sharma',
    company: 'Punjab Agro Corp Ltd',
    email: 'r.sharma@punjabagro.co.in',
    phone: '+91 98765 43210',
    role: 'DOMESTIC_BUYER',
    location: 'Chandigarh, Punjab',
    state: 'Punjab',
    gstNumber: '03AAAAA0000A1Z5',
    verificationStatus: 'VERIFIED',
    verifiedBadge: 'Verified AGRILOG Buyer',
    kycDocuments: {
      gstDoc: 'GSTIN 03AAAAA0000A1Z5 Certificate',
      gstDocUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
      tradeLicenseUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80'
    },
    purchasingHistory: '180 Tons Basmati Rice, 50 Tons Potato',
    joinedDate: '2026-01-15',
    activityDate: '2026-07-22'
  },
  {
    id: 'USR-804',
    name: 'Johnathon Miller',
    company: 'Global Grain Traders Inc (US)',
    email: 'miller@globalgraintraders.com',
    phone: '+1 312 555 0199',
    role: 'ENTERPRISE_BUYER',
    location: 'Chicago, Illinois, USA',
    state: 'International',
    iecCode: 'IEC-9988776654',
    subscriptionTier: 'ENTERPRISE_SAAS',
    verificationStatus: 'PENDING',
    verifiedBadge: null,
    kycDocuments: {
      iecDoc: 'Import-Export Code Registration IEC-9988776654',
      iecDocUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
      incorporationCertUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'
    },
    purchasingHistory: 'Contracting 500 Tons Wheat Q3',
    joinedDate: '2026-07-10',
    activityDate: '2026-07-20'
  },
  {
    id: 'USR-805',
    name: 'Rameshwar Patil',
    email: 'rameshwar.patil@nashikfarms.org',
    phone: '+91 99223 34455',
    role: 'FARMER',
    location: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    landHoldingAcres: 12.0,
    primaryCrops: ['Onion', 'Alphonso Mango', 'Grapes'],
    verificationStatus: 'PENDING',
    verifiedBadge: null,
    kycDocuments: {
      idProof: 'Aadhaar Card (9988-7766-5544)',
      idProofType: 'Aadhaar',
      idProofUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
      landHoldingDoc: '7/12 Extract Maharashtra Land Record',
      landHoldingUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80'
    },
    joinedDate: '2026-07-18',
    activityDate: '2026-07-22'
  }
];

// Crop Demand Indices
export const INITIAL_DEMAND_INDEX = [
  {
    id: 'DEM-001',
    cropName: 'Organic Wheat (HD-2967)',
    regionState: 'Punjab',
    demandLevel: 'CRITICAL',
    buyerTargetTonnage: 500,
    currentSupplyTonnage: 180,
    season: 'Kharif / Q3 2026',
    priceEstimateUSD: 310,
    updatedBy: 'Agronomy Admin',
    updatedAt: '2026-07-20T10:00:00Z'
  },
  {
    id: 'DEM-002',
    cropName: 'Basmati Rice (1121 Steam)',
    regionState: 'Haryana',
    demandLevel: 'HIGH',
    buyerTargetTonnage: 1200,
    currentSupplyTonnage: 850,
    season: 'Kharif / Q3 2026',
    priceEstimateUSD: 1280,
    updatedBy: 'Agronomy Admin',
    updatedAt: '2026-07-21T14:30:00Z'
  },
  {
    id: 'DEM-003',
    cropName: 'Red Onion (Nashik Variety)',
    regionState: 'Maharashtra',
    demandLevel: 'HIGH',
    buyerTargetTonnage: 750,
    currentSupplyTonnage: 400,
    season: 'Rabi / Q3 2026',
    priceEstimateUSD: 420,
    updatedBy: 'Agronomy Admin',
    updatedAt: '2026-07-19T09:15:00Z'
  },
  {
    id: 'DEM-004',
    cropName: 'Soybean (JS-335)',
    regionState: 'Madhya Pradesh',
    demandLevel: 'MEDIUM',
    buyerTargetTonnage: 900,
    currentSupplyTonnage: 720,
    season: 'Kharif / Q3 2026',
    priceEstimateUSD: 610,
    updatedBy: 'Agronomy Admin',
    updatedAt: '2026-07-15T11:20:00Z'
  },
  {
    id: 'DEM-005',
    cropName: 'Cotton (Bt Hybrid)',
    regionState: 'Gujarat',
    demandLevel: 'LOW',
    buyerTargetTonnage: 400,
    currentSupplyTonnage: 490,
    season: 'Kharif / Q3 2026',
    priceEstimateUSD: 780,
    updatedBy: 'Agronomy Admin',
    updatedAt: '2026-07-10T16:45:00Z'
  }
];

// Crop Advisories
export const INITIAL_CROP_ADVISORIES = [
  {
    id: 'ADV-101',
    cropName: 'Basmati Rice',
    regionCluster: 'North Plains (Punjab, Haryana)',
    stage: 'Sowing & Transplantation',
    sowingWindow: 'June 15 - July 25',
    fertilizerSchedule: 'Apply NPK (12:32:16) @ 50kg/acre during puddling; Zinc Sulfate @ 10kg/acre',
    pestAlert: 'WARNING',
    pestDetails: 'Stem Borer & Leaf Folder threat elevated due to recent humidity.',
    harvestWindow: 'October 15 - November 10'
  },
  {
    id: 'ADV-102',
    cropName: 'Organic Wheat',
    regionCluster: 'Indo-Gangetic Plain',
    stage: 'Land Preparation',
    sowingWindow: 'November 01 - November 20',
    fertilizerSchedule: 'Vermi-compost @ 2 tons/acre + Azotobacter seed bio-fertilizer treatment',
    pestAlert: 'SAFE',
    pestDetails: 'Low threat level. Maintain soil moisture levels.',
    harvestWindow: 'April 05 - April 25'
  }
];

// Equipment Rental Catalog
export const INITIAL_EQUIPMENT_CATALOG = [
  {
    id: 'EQP-301',
    name: 'John Deere 5310 55HP 4WD Tractor',
    category: 'Tractor',
    partnerName: 'Vikramjit Agro Machinery',
    partnerId: 'USR-802',
    hourlyRateUSD: 18,
    dailyRateUSD: 120,
    condition: 'EXCELLENT',
    location: 'Karnal, Haryana',
    state: 'Haryana',
    status: 'APPROVED',
    availableUnits: 4
  },
  {
    id: 'EQP-302',
    name: 'Mahindra Combine Harvester 7300',
    category: 'Harvester',
    partnerName: 'Vikramjit Agro Machinery',
    partnerId: 'USR-802',
    hourlyRateUSD: 45,
    dailyRateUSD: 310,
    condition: 'NEW',
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    status: 'APPROVED',
    availableUnits: 2
  },
  {
    id: 'EQP-303',
    name: 'AgriFly Precision Spraying Drone (16L)',
    category: 'Drone',
    partnerName: 'Kisan Tech Services',
    partnerId: 'USR-890',
    hourlyRateUSD: 35,
    dailyRateUSD: 220,
    condition: 'GOOD',
    location: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    status: 'PENDING_REVIEW',
    availableUnits: 1
  }
];

// Rental Bookings & Disputes
export const INITIAL_RENTAL_BOOKINGS = [
  {
    id: 'BKG-701',
    equipmentName: 'John Deere 5310 55HP 4WD Tractor',
    partnerName: 'Vikramjit Agro Machinery',
    renterName: 'Gurpreet Singh',
    startDate: '2026-07-15',
    endDate: '2026-07-18',
    totalFeeUSD: 360,
    platformCommissionUSD: 28.8,
    partnerPayoutUSD: 331.2,
    status: 'COMPLETED',
    disputeStatus: 'NONE'
  },
  {
    id: 'BKG-702',
    equipmentName: 'Mahindra Combine Harvester 7300',
    partnerName: 'Vikramjit Agro Machinery',
    renterName: 'Sukhwinder Dhillon',
    startDate: '2026-07-20',
    endDate: '2026-07-23',
    totalFeeUSD: 930,
    platformCommissionUSD: 74.4,
    partnerPayoutUSD: 855.6,
    status: 'ACTIVE',
    disputeStatus: 'DISPUTED',
    disputeReason: 'Hydraulic sensor malfunction caused 3 hours delay during harvest.'
  }
];

// Crop Listings (Marketplace)
export const INITIAL_HARVEST_LISTINGS = [
  {
    id: 'LST-501',
    cropName: 'Premium Basmati Rice (1121 Variety)',
    farmerName: 'Gurpreet Singh',
    quantityTons: 50,
    grade: 'Grade A Export Quality',
    expectedPriceUSD: 1250,
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    status: 'LIVE',
    featured: true,
    matchedBuyer: 'Punjab Agro Corp'
  },
  {
    id: 'LST-502',
    cropName: 'Organic Jyoti Potatoes',
    farmerName: 'Rameshwar Patil',
    quantityTons: 25,
    grade: 'Grade A',
    expectedPriceUSD: 380,
    location: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    status: 'PENDING_REVIEW',
    featured: false,
    matchedBuyer: null
  }
];

// Transaction & Escrow Ledger
export const INITIAL_TRANSACTION_LEDGER = [
  {
    id: 'TXN-9001',
    orderId: 'ORD-901',
    buyerCompany: 'Punjab Agro Corp',
    farmerName: 'GreenHarvest Organic Farms',
    item: 'Organic Jyoti Potatoes (15 Tons)',
    grossAmountUSD: 5625,
    commissionRatePct: 3.5,
    agrilogCommissionUSD: 196.88,
    farmerPayoutUSD: 5428.12,
    escrowStatus: 'ESCROW_LOCKED',
    payoutStatus: 'PENDING_RELEASE',
    date: '2026-07-14 10:30 AM'
  },
  {
    id: 'TXN-9002',
    orderId: 'ORD-902',
    buyerCompany: 'Midwest Grains Co.',
    farmerName: 'Gurpreet Singh',
    item: 'Hard Red Winter Wheat (100 Tons)',
    grossAmountUSD: 29000,
    commissionRatePct: 3.5,
    agrilogCommissionUSD: 1015.00,
    farmerPayoutUSD: 27985.00,
    escrowStatus: 'RELEASED',
    payoutStatus: 'PAID',
    date: '2026-07-12 04:15 PM'
  }
];

// Enterprise Subscriptions
export const INITIAL_ENTERPRISE_SUBSCRIPTIONS = [
  {
    id: 'SUB-201',
    company: 'Punjab Agro Corp Ltd',
    planTier: 'B2B Growth ($299/mo)',
    monthlyFeeUSD: 299,
    status: 'ACTIVE',
    renewalDate: '2026-08-15',
    autoRenew: true
  },
  {
    id: 'SUB-202',
    company: 'Global Grain Traders Inc',
    planTier: 'Enterprise SaaS ($999/mo)',
    monthlyFeeUSD: 999,
    status: 'TRIAL',
    renewalDate: '2026-08-01',
    autoRenew: true
  }
];

// Multilingual Translation Dictionary
export const INITIAL_LOCALIZATION_DICTIONARY = [
  {
    id: 'LOC-01',
    key: 'dashboard_welcome',
    category: 'Navigation',
    en: 'Welcome to AGRILOG Portal',
    hi: 'एग्रीलॉग पोर्टल में आपका स्वागत है',
    pa: 'ਐਗਰੀਲੌਗ ਪੋਰਟਲ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    mr: 'ॲग्रीलॉग पोर्टलमध्ये आपले स्वागत आहे',
    te: 'అగ్రిలాగ్ పోర్టల్‌కి స్వాగతం',
    ta: 'அக்ரிலாக் இணையதளத்திற்கு வரவேற்கிறோம்',
    gu: 'એગ્રીલોગ પોર્ટલમાં આપનું સ્વાગત છે',
    bn: 'এগ্রিলগ পোর্টালে আপনাকে স্বাগতম',
    kn: 'ಅಗ್ರಿಲಾಗ್ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ'
  },
  {
    id: 'LOC-02',
    key: 'demand_high_alert',
    category: 'Advisory Alerts',
    en: 'High buyer demand in your region',
    hi: 'आपके क्षेत्र में खरीदारों की उच्च मांग',
    pa: 'ਤੁਹਾਡੇ ਖੇਤਰ ਵਿੱਚ ਖਰੀਦਦਾਰਾਂ ਦੀ ਉੱਚ ਮੰਗ',
    mr: 'तुमच्या भागात खरेदीदारांची जास्त मागणी',
    te: 'మీ ప్రాంతంలో కొనుగోలుదారుల నుండి భారీ డిమాండ్',
    ta: 'உங்கள் பகுதியில் வாங்குபவர்களின் அதிக தேவை',
    gu: 'તમારા વિસ્તારમાં ખરીદદારોની ઊંચી માંગ',
    bn: 'আপনার অঞ্চলে ক্রেতাদের উচ্চ চাহিদা',
    kn: 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಖರೀದಿದಾರರ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ'
  }
];

// Broadcast Alerts History
export const INITIAL_BROADCAST_HISTORY = [
  {
    id: 'BRD-401',
    title: 'Sudden Demand Spike: Basmati Rice in Punjab',
    category: 'DEMAND_SPIKE',
    targetGeography: 'Punjab, Haryana',
    targetCrop: 'Basmati Rice',
    message: 'Verified Buyers are offering up to $1280/Ton for Grade A 1121 Basmati Rice. Submit your harvest listings immediately.',
    sentAt: '2026-07-21 09:00 AM',
    recipientCount: 3420,
    status: 'DELIVERED'
  },
  {
    id: 'BRD-402',
    title: 'Weather Warning: Heavy Rainfall Advisory',
    category: 'WEATHER_ALERT',
    targetGeography: 'Maharashtra (Nashik, Pune)',
    targetCrop: 'All Crops',
    message: 'Monsoon surge expected over next 48 hours. Secure stored grains and ensure farm drainage.',
    sentAt: '2026-07-19 06:30 PM',
    recipientCount: 5120,
    status: 'DELIVERED'
  }
];

// System Audit Logs
export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUD-9901',
    timestamp: '2026-07-22T10:15:30Z',
    adminId: 'ADMIN-01',
    adminName: 'Operations Lead',
    role: 'OPERATIONS',
    action: 'KYC_APPROVE',
    target: 'User Gurpreet Singh (USR-801)',
    ipAddress: '49.207.12.89',
    details: 'Verified Aadhaar & Land Holding Docs. Issued Verified AGRILOG Farmer badge.'
  },
  {
    id: 'AUD-9902',
    timestamp: '2026-07-21T16:40:12Z',
    adminId: 'ADMIN-02',
    adminName: 'Agronomy Lead',
    role: 'AGRONOMY',
    action: 'DEMAND_INDEX_UPDATE',
    target: 'Organic Wheat (Punjab)',
    ipAddress: '103.22.45.11',
    details: 'Updated Demand Level to CRITICAL. Target tonnage set to 500 Tons.'
  },
  {
    id: 'AUD-9903',
    timestamp: '2026-07-21T14:20:00Z',
    adminId: 'ADMIN-03',
    adminName: 'Finance Admin',
    role: 'FINANCE',
    action: 'COMMISSION_UPDATE',
    target: 'Platform Fee Config',
    ipAddress: '115.110.8.4',
    details: 'Set default Marketplace Commission Rate to 3.5%.'
  }
];
