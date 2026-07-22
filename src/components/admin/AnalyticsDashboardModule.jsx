import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Zap, 
  MapPin, 
  Clock, 
  Tractor, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export default function AnalyticsDashboardModule({ 
  orders, 
  users, 
  demandList, 
  equipmentList, 
  subscriptionsList 
}) {
  const gtv = orders.reduce((sum, o) => sum + (o.price * o.quantity), 0);
  const netRevenue = gtv * 0.035;
  const mrr = subscriptionsList.reduce((sum, s) => sum + s.monthlyFeeUSD, 0);

  const activeFarmers = users.filter(u => u.role === 'FARMER').length;
  const equipmentPartners = users.filter(u => u.role === 'EQUIPMENT_PARTNER').length;
  const domesticBuyers = users.filter(u => u.role === 'DOMESTIC_BUYER').length;
  const enterpriseBuyers = users.filter(u => u.role === 'ENTERPRISE_BUYER').length;

  const indianStatesData = [
    { state: 'Punjab', crop: 'Organic Wheat & Basmati', demandTons: 1700, supplyTons: 1030, status: 'DEFICIT' },
    { state: 'Haryana', crop: 'Basmati Rice', demandTons: 1200, supplyTons: 850, status: 'DEFICIT' },
    { state: 'Maharashtra', crop: 'Onion & Alphonso Mango', demandTons: 750, supplyTons: 400, status: 'DEFICIT' },
    { state: 'Madhya Pradesh', crop: 'Soybean', demandTons: 900, supplyTons: 720, status: 'BALANCED' },
    { state: 'Gujarat', crop: 'Cotton', demandTons: 400, supplyTons: 490, status: 'SURPLUS' },
    { state: 'Uttar Pradesh', crop: 'Sugarcane & Rice', demandTons: 2100, supplyTons: 1950, status: 'BALANCED' },
    { state: 'Andhra Pradesh', crop: 'Chilli & Maize', demandTons: 650, supplyTons: 610, status: 'BALANCED' },
    { state: 'Tamil Nadu', crop: 'Paddy Rice', demandTons: 800, supplyTons: 780, status: 'BALANCED' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Title */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">Platform Analytics & Executive Dashboard</h2>
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs font-semibold">
              Module 07
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time GTV, marketplace velocity, regional supply-demand heatmap across Indian states.
          </p>
        </div>
      </div>

      {/* Primary Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* GTV & Net Revenue */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-forest-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Gross Transaction Volume</span>
              <h3 className="text-3xl font-extrabold font-display mt-1">${gtv.toLocaleString()}</h3>
              <span className="text-xs text-forest-400 font-semibold block mt-1">
                Net Revenue: ${netRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="p-3 bg-forest-500/20 text-forest-400 rounded-2xl border border-forest-500/30">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        {/* B2B MRR */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Monthly Recurring (MRR)</span>
            <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">${mrr.toLocaleString()}</h3>
            <span className="text-xs text-purple-600 font-semibold block mt-1">Enterprise SaaS subscriptions</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
            <Zap size={24} />
          </div>
        </div>

        {/* User Ecosystem Growth */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Active Ecosystem</span>
            <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">{users.length}</h3>
            <span className="text-xs text-blue-600 font-semibold block mt-1">
              {activeFarmers} Farmers • {equipmentPartners} Partners
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
            <Users size={24} />
          </div>
        </div>

        {/* Marketplace Velocity */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Deal Closure Velocity</span>
            <h3 className="text-3xl font-extrabold font-display text-slate-900 mt-1">2.4 Days</h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-1">1,420 Active Rental Hours</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <Clock size={24} />
          </div>
        </div>

      </div>

      {/* Regional Supply vs Demand Heatmap */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
              <MapPin size={18} className="text-emerald-600" />
              Regional Heatmap: Supply vs. Demand Matrix (Indian States)
            </h3>
            <p className="text-xs text-slate-500">Live tonnage gap monitoring across major agricultural production hubs.</p>
          </div>

          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold font-mono">
            8 States Tracked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {indianStatesData.map((st, i) => {
            const gap = st.demandTons - st.supplyTons;

            return (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-slate-900 text-sm">{st.state}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                      st.status === 'DEFICIT' ? 'bg-rose-100 text-rose-800' :
                      st.status === 'SURPLUS' ? 'bg-blue-100 text-blue-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {st.status}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-500 font-semibold block">{st.crop}</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Buyer Demand:</span>
                    <span className="font-bold text-slate-800">{st.demandTons} Tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Farmer Supply:</span>
                    <span className="font-bold text-slate-800">{st.supplyTons} Tons</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 flex justify-between">
                    <span className="text-slate-500 font-bold">Net Balance:</span>
                    <span className={`font-extrabold ${gap > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {gap > 0 ? `-${gap} Tons` : `+${Math.abs(gap)} Tons`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
