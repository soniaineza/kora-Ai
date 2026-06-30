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
    return <div className="flex items-center justify-center py-32"><Loader2 className="w-5 h-5 text-silver animate-spin" /></div>;
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
          <h1 className="text-xl font-bold text-charcoal tracking-tight">Campaigns</h1>
          <p className="text-sm text-silver mt-0.5">Manage and track your marketing campaigns.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center gap-3 border-b border-border">
          <div className="flex items-center gap-2 px-3 py-2 bg-cream rounded-2xl flex-1">
            <Search className="w-4 h-4 text-muted" />
            <input type="text" placeholder="Search campaigns..." className="bg-transparent outline-none w-full text-xs text-charcoal placeholder-muted" />
          </div>
          <button className="px-3 py-2 bg-cream rounded-2xl text-xs font-medium text-silver hover:bg-hover transition-colors flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-muted border-b border-border">
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
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-cream transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-2xl bg-cream flex items-center justify-center text-silver">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-charcoal text-xs">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-silver">{c.goal}</td>
                  <td className="px-4 py-3 font-medium text-charcoal">{c.reach}</td>
                  <td className="px-4 py-3 font-medium text-charcoal">{c.clicks}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 font-medium text-charcoal">
                      {c.conversions}
                      {c.conversions !== '-' && <TrendingUp className="w-3 h-3 text-success" />}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${
                      c.status === 'Active' ? 'bg-green-50 text-green-700' :
                      c.status === 'Draft' ? 'bg-amber-50 text-amber-700' : 'bg-cream text-silver'
                    }`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 text-muted hover:text-charcoal rounded-xl hover:bg-hover transition-colors">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
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
            <label className="label">Campaign Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Weekend Flash Sale" className="input-field" />
          </div>
          <div>
            <label className="label">Goal</label>
            <select value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))} className="input-field">
              <option>Increase Sales</option><option>Awareness</option><option>Retention</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-secondary text-xs">Cancel</button>
            <button onClick={handleCreate} disabled={!form.name} className="btn-primary text-xs disabled:bg-disabled">Create</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
