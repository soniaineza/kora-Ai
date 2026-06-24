import React, { useState } from 'react';
import {
  User, Store, Palette, Shield, Bell, CreditCard, Puzzle, Users,
} from 'lucide-react';

const tabs = [
  { id: 'profile', name: 'Business Profile', icon: Store },
  { id: 'branding', name: 'Branding', icon: Palette },
  { id: 'users', name: 'Users & Permissions', icon: Users },
  { id: 'subscription', name: 'Subscription', icon: CreditCard },
  { id: 'integrations', name: 'Integrations', icon: Puzzle },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="pb-12">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 shrink-0">
          <nav className="space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-kora-50 text-kora-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card">
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Business Profile</h2>

                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-lg font-bold">
                    SC
                  </div>
                  <div>
                    <button className="px-3.5 py-1.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-xs">
                      Change Logo
                    </button>
                    <p className="text-[10px] text-gray-500 mt-1">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Business Name</label>
                    <input type="text" defaultValue="Sunny Cafe" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Business Type</label>
                    <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900">
                      <option>Cafe</option>
                      <option>Restaurant</option>
                      <option>Retail</option>
                      <option>Service</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" defaultValue="hello@sunnycafe.com" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" defaultValue="+250 788 123 456" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900" />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button className="px-5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab !== 'profile' && (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 mb-3">
                  {React.createElement(tabs.find(t => t.id === activeTab)?.icon || User, { className: 'w-6 h-6' })}
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">{tabs.find(t => t.id === activeTab)?.name}</h3>
                <p className="text-xs text-gray-500 max-w-xs">This section is currently under construction. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
