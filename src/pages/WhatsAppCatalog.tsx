import React, { useState } from 'react';
import {
  MessageCircle,
  RefreshCw,
  Share2,
  ExternalLink,
  Plus,
  CheckCircle2 } from
'lucide-react';
export function WhatsAppCatalog() {
  const [isSyncing, setIsSyncing] = useState(false);
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            WhatsApp Catalog
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Sync your products directly to your WhatsApp Business profile.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl shadow-glow transition-colors flex items-center gap-2 disabled:opacity-70">
            
            <RefreshCw
              className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            
            {isSyncing ? 'Syncing...' : 'Sync Catalog'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Synced Products (50)
              </h2>
              <button className="text-sm font-medium text-emerald-600 dark:text-emerald-500 flex items-center gap-1 hover:text-emerald-700">
                <Plus className="w-4 h-4" /> Add New
              </button>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {[1, 2, 3, 4, 5].map((i) =>
              <div
                key={i}
                className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      Product {i}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      1,500 RWF
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Synced
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 text-center">
              <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                View All Products
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-soft-lg">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">WhatsApp Business</h2>
            <p className="text-emerald-50 text-sm mb-6">
              Your catalog is connected and currently live on WhatsApp.
            </p>

            <div className="space-y-3">
              <button className="w-full py-2.5 bg-white text-emerald-600 font-medium rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share Catalog Link
              </button>
              <button className="w-full py-2.5 bg-emerald-600/50 hover:bg-emerald-600/70 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 border border-emerald-400/30">
                <ExternalLink className="w-4 h-4" /> Open in WhatsApp
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                Create Broadcast Message
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                Set up Auto-Replies
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                View Chat Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}