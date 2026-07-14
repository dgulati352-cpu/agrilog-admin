import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function AccessDenied({ userRole, onRedirect }) {
  const allowedDashboard = userRole === 'BUYER' ? 'Buyer Dashboard' : 'Seller Dashboard';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="p-4 bg-red-50 text-red-600 rounded-full mb-6 border border-red-100 animate-bounce">
        <ShieldAlert size={48} />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
        Access Denied
      </h1>
      <p className="text-slate-600 max-w-md mb-8">
        You are currently logged in as a <span className="font-semibold text-forest-600">{userRole}</span>. 
        You do not have permission to view this panel.
      </p>
      <button
        onClick={onRedirect}
        className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white font-medium rounded-xl shadow-md shadow-forest-100 transition-all duration-200 hover:-translate-y-0.5"
      >
        <ArrowLeft size={18} />
        Go to {allowedDashboard}
      </button>
    </div>
  );
}
