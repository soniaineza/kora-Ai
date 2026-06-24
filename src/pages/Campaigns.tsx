import React from 'react';
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  TrendingUp } from
'lucide-react';
export function Campaigns() {
  const campaigns = [
  {
    id: 1,
    name: 'Weekend Special',
    goal: 'Increase Sales',
    reach: '2.4k',
    clicks: '342',
    conversions: '124',
    status: 'Active',
    color: 'bg-green-50 text-green-600'
  },
  {
    id: 2,
    name: 'New Menu Launch',
    goal: 'Awareness',
    reach: '1.1k',
    clicks: '156',
    conversions: '56',
    status: 'Active',
    color: 'bg-green-50 text-green-600'
  },
  {
    id: 3,
    name: 'Holiday Promo',
    goal: 'Increase Sales',
    reach: '5.8k',
    clicks: '890',
    conversions: '312',
    status: 'Completed',
    color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
  },
  {
    id: 4,
    name: 'Loyalty Program',
    goal: 'Retention',
    reach: '-',
    clicks: '-',
    conversions: '-',
    status: 'Draft',
    color: 'bg-amber-50 text-amber-600'
  }];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Campaigns
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and track your marketing campaigns.
          </p>
        </div>
        <button className="px-4 py-2 bg-kora-500 hover:bg-kora-600 text-white font-medium rounded-xl shadow-glow transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl flex-1 focus-within:ring-2 focus-within:ring-kora-500/20 transition-all border border-transparent dark:border-gray-700">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              className="bg-transparent outline-none w-full text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400" />
            
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto kora-scroll">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                <th className="font-medium px-6 py-4">Campaign Name</th>
                <th className="font-medium px-6 py-4">Goal</th>
                <th className="font-medium px-6 py-4">Reach</th>
                <th className="font-medium px-6 py-4">Clicks</th>
                <th className="font-medium px-6 py-4">Conversions</th>
                <th className="font-medium px-6 py-4">Status</th>
                <th className="font-medium px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) =>
              <tr
                key={c.id}
                className="border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50/60 dark:hover:bg-gray-800/50 transition-colors">
                
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-kora-50 dark:bg-kora-500/10 flex items-center justify-center text-kora-600 dark:text-kora-500">
                        <Megaphone className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {c.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {c.goal}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                    {c.reach}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                    {c.clicks}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-gray-100">
                      {c.conversions}
                      {c.conversions !== '-' &&
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.color}`}>
                    
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}