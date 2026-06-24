import { Megaphone, Plus, Search, Filter, MoreHorizontal, TrendingUp } from 'lucide-react';

export function Campaigns() {
  const campaigns = [
    { id: 1, name: 'Weekend Special', goal: 'Increase Sales', reach: '2.4k', clicks: '342', conversions: '124', status: 'Active', color: 'bg-green-50 text-green-700' },
    { id: 2, name: 'New Menu Launch', goal: 'Awareness', reach: '1.1k', clicks: '156', conversions: '56', status: 'Active', color: 'bg-green-50 text-green-700' },
    { id: 3, name: 'Holiday Promo', goal: 'Increase Sales', reach: '5.8k', clicks: '890', conversions: '312', status: 'Completed', color: 'bg-gray-100 text-gray-600' },
    { id: 4, name: 'Loyalty Program', goal: 'Retention', reach: '-', clicks: '-', conversions: '-', status: 'Draft', color: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and track your marketing campaigns.</p>
        </div>
        <button className="px-3.5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center gap-3 border-b border-gray-100">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg flex-1 focus-within:ring-2 focus-within:ring-kora-500/20">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search campaigns..." className="bg-transparent outline-none w-full text-xs text-gray-900 placeholder-gray-400" />
          </div>
          <button className="px-3 py-2 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="font-medium px-4 py-3">Campaign Name</th>
                <th className="font-medium px-4 py-3">Goal</th>
                <th className="font-medium px-4 py-3">Reach</th>
                <th className="font-medium px-4 py-3">Clicks</th>
                <th className="font-medium px-4 py-3">Conversions</th>
                <th className="font-medium px-4 py-3">Status</th>
                <th className="font-medium px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-kora-50 flex items-center justify-center text-kora-600">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-gray-900 text-xs">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.goal}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{c.reach}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{c.clicks}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 font-medium text-gray-900">
                      {c.conversions}
                      {c.conversions !== '-' && <TrendingUp className="w-3 h-3 text-green-500" />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${c.color}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg transition-colors">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
