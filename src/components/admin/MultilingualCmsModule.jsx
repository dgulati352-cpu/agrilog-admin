import React, { useState } from 'react';
import { 
  Globe, 
  Radio, 
  Send, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  Search, 
  Languages, 
  BellRing, 
  MapPin, 
  Sprout, 
  CloudRain, 
  TrendingUp, 
  Clock, 
  Users
} from 'lucide-react';

export default function MultilingualCmsModule({ 
  dictionaryList, 
  broadcastHistory, 
  onAddTranslation, 
  onUpdateTranslation, 
  onSendBroadcast 
}) {
  const [activeTab, setActiveTab] = useState('localization'); // 'localization' or 'broadcast'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Translation Modal State
  const [showTransModal, setShowTransModal] = useState(false);
  const [editingTransId, setEditingTransId] = useState(null);
  const [transKey, setTransKey] = useState('');
  const [category, setCategory] = useState('Navigation');
  const [textEn, setTextEn] = useState('');
  const [textHi, setTextHi] = useState('');
  const [textPa, setTextPa] = useState('');
  const [textMr, setTextMr] = useState('');
  const [textTe, setTextTe] = useState('');

  // Broadcast Modal State
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastCategory, setBroadcastCategory] = useState('DEMAND_SPIKE');
  const [targetGeography, setTargetGeography] = useState('Punjab, Haryana');
  const [targetCrop, setTargetCrop] = useState('Basmati Rice');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const openNewTransModal = () => {
    setEditingTransId(null);
    setTransKey('');
    setCategory('Navigation');
    setTextEn('');
    setTextHi('');
    setTextPa('');
    setTextMr('');
    setTextTe('');
    setShowTransModal(true);
  };

  const openEditTransModal = (item) => {
    setEditingTransId(item.id);
    setTransKey(item.key);
    setCategory(item.category);
    setTextEn(item.en || '');
    setTextHi(item.hi || '');
    setTextPa(item.pa || '');
    setTextMr(item.mr || '');
    setTextTe(item.te || '');
    setShowTransModal(true);
  };

  const handleSaveTranslation = (e) => {
    e.preventDefault();
    const payload = {
      id: editingTransId || `LOC-${Math.floor(10 + Math.random() * 90)}`,
      key: transKey,
      category,
      en: textEn,
      hi: textHi,
      pa: textPa,
      mr: textMr,
      te: textTe
    };

    if (editingTransId) {
      onUpdateTranslation(payload);
      setSuccessMsg(`Translation string "${transKey}" updated across languages!`);
    } else {
      onAddTranslation(payload);
      setSuccessMsg(`New localization string "${transKey}" created!`);
    }

    setShowTransModal(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleSendBroadcastSubmit = (e) => {
    e.preventDefault();
    const newBrd = {
      id: `BRD-${Math.floor(400 + Math.random() * 900)}`,
      title: broadcastTitle,
      category: broadcastCategory,
      targetGeography,
      targetCrop,
      message: broadcastMessage,
      sentAt: new Date().toLocaleString(),
      recipientCount: Math.floor(2500 + Math.random() * 3000),
      status: 'DELIVERED'
    };

    onSendBroadcast(newBrd);
    setSuccessMsg(`Broadcast push alert "${broadcastTitle}" delivered to ${newBrd.recipientCount} targeted farmers!`);
    setShowBroadcastModal(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const filteredDictionary = dictionaryList.filter(item => {
    const matchesSearch = item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.en && item.en.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.hi && item.hi.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = categoryFilter === 'ALL' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">Multilingual Content & Broadcast Engine (CMS)</h2>
            <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-full text-xs font-semibold">
              Module 06
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage regional language translations across 9 Indian languages and broadcast targeted push advisories to farmer clusters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('localization')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'localization'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Localization Dictionary ({dictionaryList.length})
          </button>
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'broadcast'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Broadcast Alerts ({broadcastHistory.length})
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* LOCALIZATION TAB */}
      {activeTab === 'localization' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search key or text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
              >
                <option value="ALL">All Categories</option>
                <option value="Navigation">Navigation</option>
                <option value="Advisory Alerts">Advisory Alerts</option>
                <option value="KYC Labels">KYC Labels</option>
              </select>

              <button
                onClick={openNewTransModal}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus size={16} />
                <span>Add Translation String</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">String Key</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">English (EN)</th>
                    <th className="px-6 py-4">Hindi (HI)</th>
                    <th className="px-6 py-4">Punjabi (PA)</th>
                    <th className="px-6 py-4">Marathi (MR)</th>
                    <th className="px-6 py-4 text-right">Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredDictionary.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-900 text-xs">
                        {item.key}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold uppercase">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-800 font-medium">
                        {item.en}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {item.hi || '—'}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {item.pa || '—'}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {item.mr || '—'}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => openEditTransModal(item)}
                          className="p-1.5 text-slate-400 hover:text-teal-700 rounded-lg hover:bg-teal-50"
                        >
                          <Edit3 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* BROADCAST TAB */}
      {activeTab === 'broadcast' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Push Broadcast Notifications</h3>
              <p className="text-xs text-slate-500">Send geo-targeted advisories or high-demand alerts to farmer WhatsApp/App notifications.</p>
            </div>

            <button
              onClick={() => setShowBroadcastModal(true)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Radio size={16} />
              <span>Compose Broadcast Alert</span>
            </button>
          </div>

          <div className="space-y-4">
            {broadcastHistory.map((brd) => (
              <div key={brd.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 rounded text-[10px] font-bold uppercase">
                      {brd.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{brd.sentAt}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{brd.title}</h4>
                  <p className="text-xs text-slate-600 max-w-2xl">{brd.message}</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Target Cluster</span>
                    <span className="font-semibold text-slate-800">{brd.targetGeography} ({brd.targetCrop})</span>
                  </div>

                  <div className="px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Recipients</span>
                    <span className="font-extrabold text-emerald-700 font-mono">{brd.recipientCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Translation String Modal */}
      {showTransModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-slate-900">
              {editingTransId ? 'Edit Localization String' : 'Add Translation String'}
            </h3>

            <form onSubmit={handleSaveTranslation} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">String Key</label>
                  <input
                    type="text"
                    required
                    value={transKey}
                    onChange={(e) => setTransKey(e.target.value)}
                    placeholder="e.g. demand_high_alert"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">UI Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Navigation">Navigation</option>
                    <option value="Advisory Alerts">Advisory Alerts</option>
                    <option value="KYC Labels">KYC Labels</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">English (EN)</label>
                <input
                  type="text"
                  required
                  value={textEn}
                  onChange={(e) => setTextEn(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Hindi (HI - हिंदी)</label>
                <input
                  type="text"
                  value={textHi}
                  onChange={(e) => setTextHi(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Punjabi (PA - ਪੰਜਾਬੀ)</label>
                <input
                  type="text"
                  value={textPa}
                  onChange={(e) => setTextPa(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowTransModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save Translation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-slate-900">Compose Targeted Broadcast Alert</h3>

            <form onSubmit={handleSendBroadcastSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Broadcast Title</label>
                <input
                  type="text"
                  required
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. Urgent Demand Spike: Organic Wheat in Punjab"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Target Geography</label>
                  <input
                    type="text"
                    required
                    value={targetGeography}
                    onChange={(e) => setTargetGeography(e.target.value)}
                    placeholder="e.g. Punjab, Haryana"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Target Crop</label>
                  <input
                    type="text"
                    required
                    value={targetCrop}
                    onChange={(e) => setTargetCrop(e.target.value)}
                    placeholder="e.g. Organic Wheat"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Alert Message</label>
                <textarea
                  rows="3"
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Enter message to send to targeted farmers..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-sm flex items-center justify-center gap-1"
                >
                  <Send size={14} />
                  <span>Send Broadcast Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
