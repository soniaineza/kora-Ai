import { useState } from 'react';
import { MessageCircle, RefreshCw, Share2, ExternalLink, Plus, CheckCircle2 } from 'lucide-react';

export function WhatsAppCatalog() {
  const [isSyncing, setIsSyncing] = useState(false);
  const handleSync = () => { setIsSyncing(true); setTimeout(() => setIsSyncing(false), 2000); };

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">WhatsApp Catalog</h1>
          <p className="text-sm text-gray-500 mt-0.5">Sync your products directly to your WhatsApp Business profile.</p>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-70"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing...' : 'Sync Catalog'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-900">Synced Products (50)</h2>
              <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add New
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900">Product {i}</h3>
                    <p className="text-xs text-gray-500">1,500 RWF</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Synced
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100 text-center">
              <button className="text-xs font-medium text-gray-600 hover:text-gray-900">View All Products</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-5">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 text-white shadow-lg">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3 backdrop-blur-sm">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold mb-1">WhatsApp Business</h2>
            <p className="text-emerald-50 text-xs mb-4">Your catalog is connected and currently live on WhatsApp.</p>
            <div className="space-y-2">
              <button className="w-full py-2 bg-white text-emerald-600 text-xs font-medium rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Share Catalog Link
              </button>
              <button className="w-full py-2 bg-emerald-600/50 hover:bg-emerald-600/70 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-emerald-400/30">
                <ExternalLink className="w-3.5 h-3.5" /> Open in WhatsApp
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-card">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-1">
              {['Create Broadcast Message', 'Set up Auto-Replies', 'View Chat Analytics'].map((action) => (
                <button key={action} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
