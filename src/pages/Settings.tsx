import React, { useState } from 'react';
import {
  User,
  Store,
  Palette,
  Shield,
  Bell,
  CreditCard,
  Puzzle,
  Users } from
'lucide-react';
export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [
  {
    id: 'profile',
    name: 'Business Profile',
    icon: Store
  },
  {
    id: 'branding',
    name: 'Branding',
    icon: Palette
  },
  {
    id: 'users',
    name: 'Users & Permissions',
    icon: Users
  },
  {
    id: 'subscription',
    name: 'Subscription',
    icon: CreditCard
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: Puzzle
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield
  }];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-kora-50 dark:bg-kora-500/10 text-kora-600 dark:text-kora-500' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'}`}>
              
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            )}
          </nav>
        </div>

        <div className="flex-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 p-6">
            {activeTab === 'profile' &&
            <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Business Profile
                </h2>

                <div className="flex items-center gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                    SC
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                      Change Logo
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Business Name
                    </label>
                    <input
                    type="text"
                    defaultValue="Sunny Cafe"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-kora-500/20 text-gray-900 dark:text-gray-100" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Business Type
                    </label>
                    <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-kora-500/20 text-gray-900 dark:text-gray-100">
                      <option>Cafe</option>
                      <option>Restaurant</option>
                      <option>Retail</option>
                      <option>Service</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                    type="email"
                    defaultValue="hello@sunnycafe.com"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-kora-500/20 text-gray-900 dark:text-gray-100" />
                  
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                    type="tel"
                    defaultValue="+250 788 123 456"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-kora-500/20 text-gray-900 dark:text-gray-100" />
                  
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                  <button className="px-6 py-2.5 bg-kora-500 hover:bg-kora-600 text-white font-medium rounded-xl shadow-glow transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            }

            {activeTab !== 'profile' &&
            <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 mb-4">
                  {tabs.
                find((t) => t.id === activeTab)?.
                icon({
                  className: 'w-8 h-8'
                })}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {tabs.find((t) => t.id === activeTab)?.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  This section is currently under construction. Check back soon.
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}