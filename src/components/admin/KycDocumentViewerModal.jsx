import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, RefreshCw, CheckCircle2, XCircle, AlertTriangle, FileText, Download, ShieldCheck } from 'lucide-react';

export default function KycDocumentViewerModal({ user, onClose, onApprove, onReject, onRequestReupload, maskPii }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeDocTab, setActiveDocTab] = useState('idProof');
  
  // Rejection modal state
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionCode, setRejectionCode] = useState('INVALID_DOCUMENT');
  const [rejectionNotes, setRejectionNotes] = useState('');

  if (!user) return null;

  const docs = user.kycDocuments || {};

  const docTabs = [
    { id: 'idProof', label: 'Identity Proof / Aadhaar', url: docs.idProofUrl, text: docs.idProof },
    { id: 'businessDoc', label: 'Trade License / GST / IEC', url: docs.businessDocUrl || docs.gstDocUrl || docs.iecDocUrl, text: docs.businessDoc || docs.gstDoc || docs.iecDoc },
    { id: 'landHolding', label: 'Land Record / Fleet Permit', url: docs.landHoldingUrl || docs.equipmentRcUrl, text: docs.landHoldingDoc || docs.equipmentRcDoc },
    { id: 'bankPassbook', label: 'Bank Account Passbook', url: docs.bankPassbookUrl, text: docs.bankDetails }
  ].filter(d => d.text || d.url);

  const activeDoc = docTabs.find(d => d.id === activeDocTab) || docTabs[0] || {
    label: 'Submitted Document',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    text: 'Official Registration Document'
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const handleRejectSubmit = (e) => {
    e.preventDefault();
    onReject(user.id, rejectionCode, rejectionNotes);
    setShowRejectForm(false);
  };

  const maskString = (str) => {
    if (!str) return 'N/A';
    if (!maskPii) return str;
    return str.replace(/(\d{4}-?\d{4}-?)(\d{4})/, 'XXXX-XXXX-$2')
              .replace(/(\+91\s?\d{2})\d{5}(\d{3})/, '$1-*****-$2');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-forest-600 text-white rounded-xl shadow-xs">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 font-display">{user.name}</h2>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                  user.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                  user.verificationStatus === 'REJECTED' ? 'bg-rose-100 text-rose-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {user.verificationStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {user.company ? `${user.company} • ` : ''}{user.role.replace('_', ' ')} • {user.location}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Document Viewer Left Area */}
          <div className="flex-1 bg-slate-900 flex flex-col relative overflow-hidden">
            
            {/* Doc Tabs Header */}
            {docTabs.length > 0 && (
              <div className="bg-slate-950/80 border-b border-slate-800 p-2 flex gap-2 overflow-x-auto z-10">
                {docTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveDocTab(tab.id);
                      handleReset();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      activeDocTab === tab.id
                        ? 'bg-forest-600 text-white shadow-xs'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Canvas / Image Display */}
            <div className="flex-1 flex items-center justify-center p-6 relative overflow-auto select-none">
              <div 
                className="transition-transform duration-200 ease-out max-w-full max-h-full flex items-center justify-center"
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`
                }}
              >
                <img 
                  src={activeDoc.url || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80'} 
                  alt={activeDoc.label}
                  className="max-w-md w-full object-contain rounded-lg shadow-2xl border border-slate-700 bg-white"
                />
              </div>
            </div>

            {/* Viewer Control Toolbar */}
            <div className="bg-slate-950/90 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-white z-10">
              <div className="text-xs text-slate-400 font-mono">
                Zoom: {Math.round(zoomLevel * 100)}% • Rotation: {rotation}°
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-all"
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-all"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  onClick={handleRotate}
                  title="Rotate 90°"
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-all"
                >
                  <RotateCw size={16} />
                </button>
                <button
                  onClick={handleReset}
                  title="Reset View"
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition-all"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* User & Verification Info Right Panel */}
          <div className="w-full lg:w-96 border-l border-slate-200/80 bg-white p-6 flex flex-col justify-between overflow-y-auto">
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Verification Details</h3>
                
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Email</span>
                    <span className="font-semibold text-slate-800">{user.email}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Number</span>
                    <span className="font-semibold text-slate-800 font-mono">{maskString(user.phone)}</span>
                  </div>

                  {user.landHoldingAcres && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Land Holding Size</span>
                      <span className="font-semibold text-slate-800">{user.landHoldingAcres} Acres</span>
                    </div>
                  )}

                  {user.gstNumber && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">GST Number</span>
                      <span className="font-semibold text-slate-800 font-mono">{maskString(user.gstNumber)}</span>
                    </div>
                  )}

                  {user.iecCode && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Import Export Code (IEC)</span>
                      <span className="font-semibold text-slate-800 font-mono">{user.iecCode}</span>
                    </div>
                  )}

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Bank Account Info</span>
                    <span className="font-semibold text-slate-800">{maskString(docs.bankDetails || user.bankDetails)}</span>
                  </div>
                </div>
              </div>

              {/* Rejection Form Drawer inside Right Panel */}
              {showRejectForm ? (
                <form onSubmit={handleRejectSubmit} className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                    <AlertTriangle size={16} />
                    <span>Reject Verification</span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-rose-700 uppercase mb-1">Reason Code</label>
                    <select
                      value={rejectionCode}
                      onChange={(e) => setRejectionCode(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-rose-200 rounded-lg focus:outline-hidden text-slate-800 font-semibold"
                    >
                      <option value="INVALID_DOCUMENT">Invalid / Fraudulent Document</option>
                      <option value="EXPIRED_GST">Expired GST / Trade License</option>
                      <option value="UNCLEAR_IMAGE">Unclear / Blurry Image</option>
                      <option value="NAME_MISMATCH">Name Mismatch on Aadhaar</option>
                      <option value="INVALID_AADHAAR">Invalid Aadhaar Details</option>
                      <option value="OTHER">Other Reason</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-rose-700 uppercase mb-1">Notes / Instructions</label>
                    <textarea
                      rows="2"
                      required
                      value={rejectionNotes}
                      onChange={(e) => setRejectionNotes(e.target.value)}
                      placeholder="Specify exact issue for applicant..."
                      className="w-full text-xs p-2 bg-white border border-rose-200 rounded-lg focus:outline-hidden text-slate-800"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRejectForm(false)}
                      className="flex-1 py-1.5 bg-white border border-rose-200 text-rose-700 rounded-lg text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </form>
              ) : null}
            </div>

            {/* Action Buttons */}
            {!showRejectForm && (
              <div className="pt-6 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => onApprove(user.id)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <CheckCircle2 size={16} />
                  <span>Approve KYC Verification</span>
                </button>

                <button
                  onClick={() => onRequestReupload(user.id)}
                  className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw size={14} />
                  <span>Request Re-upload</span>
                </button>

                <button
                  onClick={() => setShowRejectForm(true)}
                  className="w-full py-2 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <XCircle size={14} />
                  <span>Reject with Reason</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
