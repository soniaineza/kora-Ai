import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Instagram,
  Facebook,
  Mail,
  CreditCard,
  Globe,
  MessageSquare,
  Search } from
'lucide-react';
interface Integration {
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  connected: boolean;
  category: string;
}
const initialIntegrations: Integration[] = [
{
  name: 'WhatsApp Business',
  description: 'Sync your catalog and send broadcasts.',
  icon: MessageCircle,
  color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10',
  connected: true,
  category: 'Messaging'
},
{
  name: 'Instagram',
  description: 'Auto-publish posters and reels.',
  icon: Instagram,
  color: 'text-pink-600 bg-pink-50 dark:bg-pink-500/10',
  connected: true,
  category: 'Social'
},
{
  name: 'Facebook Pages',
  description: 'Schedule posts and run promotions.',
  icon: Facebook,
  color: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10',
  connected: true,
  category: 'Social'
},
{
  name: 'MTN Mobile Money',
  description: 'Accept payments and subscriptions.',
  icon: CreditCard,
  color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10',
  connected: false,
  category: 'Payments'
},
{
  name: 'Google Business',
  description: 'Manage your Google profile & reviews.',
  icon: Globe,
  color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10',
  connected: false,
  category: 'Presence'
},
{
  name: 'Email (Mailchimp)',
  description: 'Send email campaigns to customers.',
  icon: Mail,
  color: 'text-orange-600 bg-orange-50 dark:bg-orange-500/10',
  connected: false,
  category: 'Messaging'
},
{
  name: 'SMS Gateway',
  description: 'Send bulk SMS campaigns and alerts.',
  icon: MessageSquare,
  color: 'text-sky-600 bg-sky-50 dark:bg-sky-500/10',
  connected: false,
  category: 'Messaging'
},
{
  name: 'TikTok',
  description: 'Publish short-form video content.',
  icon: Globe,
  color: 'text-gray-900 bg-gray-100 dark:text-gray-100 dark:bg-gray-800',
  connected: false,
  category: 'Social'
}];

export function Integrations() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [search, setSearch] = useState('');
  const toggle = (name: string) =>
  setIntegrations((prev) =>
  prev.map((i) =>
  i.name === name ?
  {
    ...i,
    connected: !i.connected
  } :
  i
  )
  );
  const filtered = integrations.filter((i) =>
  i.name.toLowerCase().includes(search.toLowerCase())
  );
  const connectedCount = integrations.filter((i) => i.connected).length;
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Integrations
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Connect Kora to the tools you already use. {connectedCount}{' '}
            connected.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl w-full sm:w-64 focus-within:ring-2 focus-within:ring-kora-500/20 transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search integrations..."
            className="bg-transparent outline-none w-full text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400"
            aria-label="Search integrations" />
          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((integration, i) =>
        <motion.div
          key={integration.name}
          initial={{
            opacity: 0,
            y: 16
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.04
          }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft border border-gray-100 dark:border-gray-800 flex flex-col">
          
            <div className="flex items-start justify-between mb-4">
              <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${integration.color}`}>
              
                <integration.icon className="w-6 h-6" />
              </div>
              {integration.connected &&
            <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-full">
                  Connected
                </span>
            }
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {integration.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-5 flex-1">
              {integration.description}
            </p>
            <button
            onClick={() => toggle(integration.name)}
            className={`w-full py-2.5 text-sm font-medium rounded-xl transition-colors ${integration.connected ? 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' : 'bg-kora-500 hover:bg-kora-600 text-white shadow-glow'}`}>
            
              {integration.connected ? 'Disconnect' : 'Connect'}
            </button>
          </motion.div>
        )}
      </div>

      {filtered.length === 0 &&
      <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          No integrations match "{search}".
        </div>
      }
    </div>);

}