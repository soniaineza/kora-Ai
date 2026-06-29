import { useState } from 'react';
import { Megaphone, Plus, Search, Filter, MoreHorizontal, TrendingUp, Loader2 } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { campaignsApi } from '../api/campaigns';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../hooks/useToast';

export function Campaigns() {
  const { data: campaignData, loading, refetch } = useApi(() => campaignsApi.list());
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', goal: 'Increase Sales' });
  const { toast } = useToast();

  if (loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 text-kora-500 animate-spin" /></div>;
  }

  const campaigns = campaignData || [];

  function handleCreate() {
    toast(`Campaign "${form.name}" created`, 'success');
    setModalOpen(false);
    setForm({ name: '', goal: 'Increase Sales' });
    refetch();
  }

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage and track your marketing campaigns.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="px-3.5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-card overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center gap-3 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-900 rounded-lg flex-1 focus-within:ring-2 focus-within:ring-kora-500/20">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search campaigns..." className="bg-transparent outline-none w-full text-xs text-gray-900 placeholder-gray-400" />
          </div>
          <button className="px-3 py-2 bg-gray-50 dark:bg-slate-900 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-slate-700">
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
                <tr key={c.id} className="border-b border-gray-50 dark:border-slate-700 last:border-0 hover:bg-gray-50/60 dark:hover:bg-slate-700/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-kora-50 flex items-center justify-center text-kora-600"><Megaphone className="w-4 h-4" /></div>
                      <span className="font-semibold text-gray-900 dark:text-white text-xs">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{c.goal}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{c.reach}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{c.clicks}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 font-medium text-gray-900 dark:text-white">
                      {c.conversions}
                      {c.conversions !== '-' && <TrendingUp className="w-3 h-3 text-green-500" />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      c.status === 'Active' ? 'bg-green-50 text-green-700' :
                      c.status === 'Draft' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                    }`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg transition-colors"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Campaign">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Campaign Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Weekend Flash Sale" className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Goal</label>
            <select value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm">
              <option>Increase Sales</option><option>Awareness</option><option>Retention</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">Cancel</button>
            <button onClick={handleCreate} disabled={!form.name} className="px-4 py-2 bg-kora-500 hover:bg-kora-600 text-white text-xs font-medium rounded-lg disabled:opacity-50">Create</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}