import React, { useState } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  AlertCircle, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  FileText, 
  Search, 
  CloudRain, 
  Bug, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function CropDemandAdvisoryModule({ 
  demandList, 
  advisoriesList, 
  onAddDemandIndex, 
  onUpdateDemandIndex, 
  onAddAdvisory, 
  onUpdateAdvisory 
}) {
  const [activeTab, setActiveTab] = useState('demand'); // 'demand' or 'advisories'
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');

  // Demand Modal state
  const [showDemandModal, setShowDemandModal] = useState(false);
  const [editingDemandId, setEditingDemandId] = useState(null);
  const [cropName, setCropName] = useState('');
  const [regionState, setRegionState] = useState('Punjab');
  const [demandLevel, setDemandLevel] = useState('HIGH');
  const [targetTonnage, setTargetTonnage] = useState('');
  const [supplyTonnage, setSupplyTonnage] = useState('');
  const [season, setSeason] = useState('Kharif / Q3 2026');
  const [priceUSD, setPriceUSD] = useState('');

  // Advisory Modal state
  const [showAdvisoryModal, setShowAdvisoryModal] = useState(false);
  const [editingAdvisoryId, setEditingAdvisoryId] = useState(null);
  const [advCropName, setAdvCropName] = useState('');
  const [regionCluster, setRegionCluster] = useState('North Plains (Punjab, Haryana)');
  const [stage, setStage] = useState('Sowing & Transplantation');
  const [sowingWindow, setSowingWindow] = useState('June 15 - July 25');
  const [fertilizerSchedule, setFertilizerSchedule] = useState('');
  const [pestAlert, setPestAlert] = useState('SAFE');
  const [pestDetails, setPestDetails] = useState('');
  const [harvestWindow, setHarvestWindow] = useState('October 15 - November 10');

  const [successMsg, setSuccessMsg] = useState('');

  const openNewDemandModal = () => {
    setEditingDemandId(null);
    setCropName('');
    setRegionState('Punjab');
    setDemandLevel('HIGH');
    setTargetTonnage('500');
    setSupplyTonnage('200');
    setSeason('Kharif / Q3 2026');
    setPriceUSD('320');
    setShowDemandModal(true);
  };

  const openEditDemandModal = (item) => {
    setEditingDemandId(item.id);
    setCropName(item.cropName);
    setRegionState(item.regionState);
    setDemandLevel(item.demandLevel);
    setTargetTonnage(item.buyerTargetTonnage);
    setSupplyTonnage(item.currentSupplyTonnage || 0);
    setSeason(item.season);
    setPriceUSD(item.priceEstimateUSD || 0);
    setShowDemandModal(true);
  };

  const handleSaveDemand = (e) => {
    e.preventDefault();
    const payload = {
      id: editingDemandId || `DEM-${Math.floor(100 + Math.random() * 900)}`,
      cropName,
      regionState,
      demandLevel,
      buyerTargetTonnage: Number(targetTonnage),
      currentSupplyTonnage: Number(supplyTonnage),
      season,
      priceEstimateUSD: Number(priceUSD),
      updatedBy: 'Agronomy Manager',
      updatedAt: new Date().toISOString()
    };

    if (editingDemandId) {
      onUpdateDemandIndex(payload);
      setSuccessMsg(`Demand index for "${cropName}" in ${regionState} updated!`);
    } else {
      onAddDemandIndex(payload);
      setSuccessMsg(`New Crop Demand index created for "${cropName}"!`);
    }

    setShowDemandModal(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const openNewAdvisoryModal = () => {
    setEditingAdvisoryId(null);
    setAdvCropName('');
    setRegionCluster('North Plains (Punjab, Haryana)');
    setStage('Sowing & Transplantation');
    setSowingWindow('June 15 - July 25');
    setFertilizerSchedule('Apply NPK (12:32:16) @ 50kg/acre; Zinc Sulfate @ 10kg/acre');
    setPestAlert('WARNING');
    setPestDetails('Stem Borer & Leaf Folder threat elevated.');
    setHarvestWindow('October 15 - November 10');
    setShowAdvisoryModal(true);
  };

  const openEditAdvisoryModal = (item) => {
    setEditingAdvisoryId(item.id);
    setAdvCropName(item.cropName);
    setRegionCluster(item.regionCluster);
    setStage(item.stage);
    setSowingWindow(item.sowingWindow);
    setFertilizerSchedule(item.fertilizerSchedule);
    setPestAlert(item.pestAlert);
    setPestDetails(item.pestDetails);
    setHarvestWindow(item.harvestWindow);
    setShowAdvisoryModal(true);
  };

  const handleSaveAdvisory = (e) => {
    e.preventDefault();
    const payload = {
      id: editingAdvisoryId || `ADV-${Math.floor(100 + Math.random() * 900)}`,
      cropName: advCropName,
      regionCluster,
      stage,
      sowingWindow,
      fertilizerSchedule,
      pestAlert,
      pestDetails,
      harvestWindow
    };

    if (editingAdvisoryId) {
      onUpdateAdvisory(payload);
      setSuccessMsg(`Advisory guide for "${advCropName}" updated!`);
    } else {
      onAddAdvisory(payload);
      setSuccessMsg(`New Crop Advisory guide published for "${advCropName}"!`);
    }

    setShowAdvisoryModal(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Filters
  const filteredDemand = demandList.filter(item => {
    const matchesSearch = item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.regionState.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === 'ALL' || item.regionState === stateFilter;
    return matchesSearch && matchesState;
  });

  const filteredAdvisories = advisoriesList.filter(item => 
    item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.regionCluster.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Module Title & Tab Toggle */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">Crop Demand & Advisory Engine</h2>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
              Module 02
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Update market demand indices and broadcast regional crop lifecycle advisories to farmers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('demand')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'demand'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Market Demand Portal ({demandList.length})
          </button>
          <button
            onClick={() => setActiveTab('advisories')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'advisories'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Crop Lifecycle Guides ({advisoriesList.length})
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

      {/* DEMAND TAB */}
      {activeTab === 'demand' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search crops or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600 focus:bg-white text-slate-800"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
              >
                <option value="ALL">All States</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Gujarat">Gujarat</option>
              </select>

              <button
                onClick={openNewDemandModal}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus size={16} />
                <span>Input Demand Entry</span>
              </button>
            </div>
          </div>

          {/* Demand Index Table */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Crop Name</th>
                    <th className="px-6 py-4">State / Region</th>
                    <th className="px-6 py-4">Demand Index</th>
                    <th className="px-6 py-4">Target Tonnage</th>
                    <th className="px-6 py-4">Current Supply</th>
                    <th className="px-6 py-4">Tonnage Gap</th>
                    <th className="px-6 py-4">Est. Price</th>
                    <th className="px-6 py-4">Season</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredDemand.map((item) => {
                    const gap = item.buyerTargetTonnage - (item.currentSupplyTonnage || 0);

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-extrabold text-slate-900 block text-sm">{item.cropName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {item.id}</span>
                        </td>

                        <td className="px-6 py-4 font-semibold text-slate-700">
                          <div className="flex items-center gap-1">
                            <MapPin size={13} className="text-emerald-600" />
                            <span>{item.regionState}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            item.demandLevel === 'CRITICAL' ? 'bg-rose-100 text-rose-800 animate-pulse' :
                            item.demandLevel === 'HIGH' ? 'bg-amber-100 text-amber-800' :
                            item.demandLevel === 'MEDIUM' ? 'bg-blue-100 text-blue-800' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {item.demandLevel} DEMAND
                          </span>
                        </td>

                        <td className="px-6 py-4 font-extrabold text-slate-900">
                          {item.buyerTargetTonnage.toLocaleString()} Tons
                        </td>

                        <td className="px-6 py-4 text-slate-600 font-medium">
                          {(item.currentSupplyTonnage || 0).toLocaleString()} Tons
                        </td>

                        <td className="px-6 py-4">
                          <span className={`font-bold ${gap > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {gap > 0 ? `Deficit: ${gap} Tons` : 'Requirement Met'}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-mono font-bold text-slate-900">
                          ${item.priceEstimateUSD || '300'}/Ton
                        </td>

                        <td className="px-6 py-4 text-slate-500 font-medium">
                          {item.season}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => openEditDemandModal(item)}
                            className="p-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-all text-slate-600"
                            title="Edit Entry"
                          >
                            <Edit3 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredDemand.length === 0 && (
                    <tr>
                      <td colSpan="9" className="py-16 text-center text-slate-400">
                        No crop demand records match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ADVISORIES TAB */}
      {activeTab === 'advisories' && (
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex justify-between items-center gap-3">
            <div className="relative w-72">
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search advisories by crop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
              />
            </div>

            <button
              onClick={openNewAdvisoryModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Create Advisory Guide</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAdvisories.map((adv) => (
              <div key={adv.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold uppercase tracking-wider">
                        {adv.regionCluster}
                      </span>
                      <h3 className="text-lg font-bold font-display text-slate-900 mt-1">{adv.cropName}</h3>
                    </div>

                    <button
                      onClick={() => openEditAdvisoryModal(adv)}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50"
                    >
                      <Edit3 size={16} />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Growth Stage & Sowing Window</span>
                      <span className="font-semibold text-slate-800">{adv.stage} ({adv.sowingWindow})</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Fertilizer & Nutrition Schedule</span>
                      <span className="text-slate-700">{adv.fertilizerSchedule}</span>
                    </div>

                    <div className={`p-3 rounded-xl border ${
                      adv.pestAlert === 'OUTBREAK' ? 'bg-rose-50 border-rose-200 text-rose-800' :
                      adv.pestAlert === 'WARNING' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                      'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}>
                      <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase">
                        <Bug size={14} />
                        <span>Pest Alert Status: {adv.pestAlert}</span>
                      </div>
                      <p className="mt-1 text-xs">{adv.pestDetails}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                  <span>Harvest Window: <strong>{adv.harvestWindow}</strong></span>
                  <span className="font-mono text-[10px]">ID: {adv.id}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Demand Input Modal */}
      {showDemandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-slate-900">
              {editingDemandId ? 'Edit Crop Demand Index' : 'Input Market Demand Requirement'}
            </h3>

            <form onSubmit={handleSaveDemand} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Crop Name & Variety</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Wheat (HD-2967)"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">State / Region</label>
                  <select
                    value={regionState}
                    onChange={(e) => setRegionState(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Demand Index Level</label>
                  <select
                    value={demandLevel}
                    onChange={(e) => setDemandLevel(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-rose-700"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Buyer Target (Tons)</label>
                  <input
                    type="number"
                    required
                    value={targetTonnage}
                    onChange={(e) => setTargetTonnage(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Current Supply (Tons)</label>
                  <input
                    type="number"
                    value={supplyTonnage}
                    onChange={(e) => setSupplyTonnage(e.target.value)}
                    placeholder="e.g. 180"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Estimated Price ($/Ton)</label>
                  <input
                    type="number"
                    value={priceUSD}
                    onChange={(e) => setPriceUSD(e.target.value)}
                    placeholder="310"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Season Timeline</label>
                  <input
                    type="text"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    placeholder="Kharif / Q3 2026"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowDemandModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save Demand Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Advisory Input Modal */}
      {showAdvisoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-slate-900">
              {editingAdvisoryId ? 'Edit Crop Advisory Guide' : 'Publish Crop Lifecycle Advisory'}
            </h3>

            <form onSubmit={handleSaveAdvisory} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Crop Name</label>
                <input
                  type="text"
                  required
                  value={advCropName}
                  onChange={(e) => setAdvCropName(e.target.value)}
                  placeholder="e.g. Basmati Rice"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Region Cluster</label>
                  <input
                    type="text"
                    value={regionCluster}
                    onChange={(e) => setRegionCluster(e.target.value)}
                    placeholder="North Plains"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 uppercase mb-1">Pest Alert Level</label>
                  <select
                    value={pestAlert}
                    onChange={(e) => setPestAlert(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="SAFE">SAFE</option>
                    <option value="WARNING">WARNING</option>
                    <option value="OUTBREAK">OUTBREAK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Fertilizer & Irrigation Schedule</label>
                <textarea
                  rows="2"
                  value={fertilizerSchedule}
                  onChange={(e) => setFertilizerSchedule(e.target.value)}
                  placeholder="Specify dosage per acre..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-600 uppercase mb-1">Pest Warning Details</label>
                <textarea
                  rows="2"
                  value={pestDetails}
                  onChange={(e) => setPestDetails(e.target.value)}
                  placeholder="Describe active threats..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdvisoryModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Publish Advisory Guide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
