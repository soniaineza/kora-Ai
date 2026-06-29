import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle, Instagram, Facebook, Mail, CreditCard, Globe, MessageSquare, Search, Loader2,
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { integrationsApi } from '../api/integrations';
import { useToast } from '../hooks/useToast';

const iconMap: Record<string, React.ElementType> = {
  MessageCircle, Instagram, Facebook, Mail, CreditCard, Globe, MessageSquare,
};

export function Integrations() {
  const { data: integrations, loading } = useApi(() => integrationsApi.list());
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const filtered = (integrations || []).filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
  const connectedCount = (integrations || []).filter((i) => i.connected).length;

  if (loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 text-kora-500 animate-spin" /></div>;
  }

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Integrations</h1>
          <p className="text-sm text-gray-500 mt-0.5">Connect Kora to the tools you already use. {connectedCount} connected.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-lg w-full sm:w-56 focus-within:ring-2 focus-within:ring-kora-500/20">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search integrations..."
            className="bg-transparent outline-none w-full text-xs text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((integration, i) => {
          const Icon = iconMap[integration.icon] || Globe;
          return (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-card flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${integration.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {integration.connected && (
                  <span className="text-[10px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">Connected</span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{integration.name}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4 flex-1">{integration.description}</p>
              <button
                onClick={() => toast(`${integration.connected ? 'Disconnected from' : 'Connected to'} ${integration.name}`, 'success')}
                className={`w-full py-2 text-xs font-medium rounded-lg transition-colors ${
                  integration.connected
                    ? 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    : 'bg-kora-500 hover:bg-kora-600 text-white shadow-glow'
                }`}
              >
                {integration.connected ? 'Disconnect' : 'Connect'}
              </button>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-sm text-gray-500">No integrations match &quot;{search}&quot;.</div>
      )}
    </div>
  );
}