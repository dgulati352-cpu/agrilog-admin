import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Unlock, 
  CreditCard, 
  ShieldCheck, 
  Building, 
  FileText, 
  Zap,
  ArrowUpRight
} from 'lucide-react';

export default function RevenueCommissionModule({ 
  transactionLedger, 
  subscriptionsList, 
  commissionSettings, 
  onUpdateCommissionSettings, 
  onReleaseEscrow 
}) {
  const [activeTab, setActiveTab] = useState('ledger'); // 'ledger', 'settings', 'subscriptions'
  
  // Settings Form
  const [txCommissionRate, setTxCommissionRate] = useState(commissionSettings.marketplaceCommissionPct || 3.5);
  const [rentalFeeRate, setRentalFeeRate] = useState(commissionSettings.rentalServiceFeePct || 8.0);
  const [enterpriseBaseRate, setEnterpriseBaseRate] = useState(commissionSettings.enterpriseSaasMonthlyUSD || 999);

  const [successMsg, setSuccessMsg] = useState('');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onUpdateCommissionSettings({
      marketplaceCommissionPct: Number(txCommissionRate),
      rentalServiceFeePct: Number(rentalFeeRate),
      enterpriseSaasMonthlyUSD: Number(enterpriseBaseRate),
      updatedAt: new Date().toISOString()
    });

    setSuccessMsg('Platform commission rates updated successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleReleaseEscrowAction = (txn) => {
    onReleaseEscrow(txn.id);
    setSuccessMsg(`Escrow payout of $${txn.farmerPayoutUSD.toLocaleString()} released to ${txn.farmerName}!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Metrics
  const totalGTV = transactionLedger.reduce((sum, t) => sum + t.grossAmountUSD, 0);
  const totalNetCommission = transactionLedger.reduce((sum, t) => sum + t.agrilogCommissionUSD, 0);
  const totalMRR = subscriptionsList.reduce((sum, s) => sum + s.monthlyFeeUSD, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">Revenue & Commission Management</h2>
            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
              Module 05
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track gross transaction volume (GTV), manage escrow releases, configure platform commission fees, and handle B2B SaaS subscriptions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'ledger'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Transaction Ledger ({transactionLedger.length})
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'subscriptions'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Enterprise Subscriptions ({subscriptionsList.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Fee Settings
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Gross Transaction Volume</span>
            <h3 className="text-2xl font-extrabold font-display text-slate-900 mt-0.5">
              ${totalGTV.toLocaleString()}
            </h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-0.5">Total trade contract value</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <TrendingUp size={22} />
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AGRILOG Net Revenue</span>
            <h3 className="text-2xl font-extrabold font-display text-slate-900 mt-0.5">
              ${totalNetCommission.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-xs text-amber-600 font-semibold block mt-0.5">Earned from 3.5% transaction commission</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
            <DollarSign size={22} />
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">B2B Monthly Recurring (MRR)</span>
            <h3 className="text-2xl font-extrabold font-display text-slate-900 mt-0.5">
              ${totalMRR.toLocaleString()}/mo
            </h3>
            <span className="text-xs text-purple-600 font-semibold block mt-0.5">Enterprise SaaS subscription tiers</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
            <Zap size={22} />
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* LEDGER TAB */}
      {activeTab === 'ledger' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Txn ID</th>
                  <th className="px-6 py-4">Buyer Company</th>
                  <th className="px-6 py-4">Farmer / Seller</th>
                  <th className="px-6 py-4">Commodity Item</th>
                  <th className="px-6 py-4">Gross Value (GTV)</th>
                  <th className="px-6 py-4">AGRILOG Cut (3.5%)</th>
                  <th className="px-6 py-4">Farmer Payout</th>
                  <th className="px-6 py-4">Escrow Status</th>
                  <th className="px-6 py-4 text-right">Escrow Release</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {transactionLedger.map((txn) => {
                  const isLocked = txn.escrowStatus === 'ESCROW_LOCKED';

                  return (
                    <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-400">
                        {txn.id}
                      </td>

                      <td className="px-6 py-4 font-bold text-slate-900">
                        {txn.buyerCompany}
                      </td>

                      <td className="px-6 py-4 text-slate-700 font-medium">
                        {txn.farmerName}
                      </td>

                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {txn.item}
                      </td>

                      <td className="px-6 py-4 font-mono font-extrabold text-slate-950">
                        ${txn.grossAmountUSD.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 font-mono font-bold text-amber-700">
                        ${txn.agrilogCommissionUSD.toFixed(2)}
                      </td>

                      <td className="px-6 py-4 font-mono font-bold text-emerald-700">
                        ${txn.farmerPayoutUSD.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          isLocked ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {txn.escrowStatus}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {isLocked ? (
                          <button
                            onClick={() => handleReleaseEscrowAction(txn)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Unlock size={14} />
                            <span>Release Escrow</span>
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1 justify-end">
                            <CheckCircle2 size={13} />
                            <span>Paid Out</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBSCRIPTIONS TAB */}
      {activeTab === 'subscriptions' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Subscriber Company</th>
                  <th className="px-6 py-4">Subscription Plan</th>
                  <th className="px-6 py-4">Monthly Fee</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Next Renewal Date</th>
                  <th className="px-6 py-4 text-right">Subscription Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {subscriptionsList.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">
                      {sub.company}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-[10px] font-bold uppercase">
                        {sub.planTier}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-mono font-extrabold text-slate-950">
                      ${sub.monthlyFeeUSD}/mo
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        sub.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sub.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {sub.renewalDate}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setSuccessMsg(`Subscription invoice sent to ${sub.company}!`);
                          setTimeout(() => setSuccessMsg(''), 4000);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-purple-50 hover:text-purple-700 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer"
                      >
                        Send Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FEE SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs max-w-xl">
          <h3 className="text-lg font-bold font-display text-slate-900 mb-4">Configurable Commission Rates</h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Marketplace Transaction Commission (%)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={txCommissionRate}
                onChange={(e) => setTxCommissionRate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-800"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Deducted from gross trade value on completed contracts.</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Equipment Machinery Rental Service Fee (%)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={rentalFeeRate}
                onChange={(e) => setRentalFeeRate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-800"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Deducted from machinery rental earnings per partner.</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Enterprise SaaS Subscription Monthly Base Rate ($)
              </label>
              <input
                type="number"
                required
                value={enterpriseBaseRate}
                onChange={(e) => setEnterpriseBaseRate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-slate-800"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
              >
                Save Commission Rates Configuration
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
