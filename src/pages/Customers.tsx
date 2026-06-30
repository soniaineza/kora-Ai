import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, UserPlus, Search, MessageCircle, Edit3,
  MoreHorizontal, Phone, TrendingUp, QrCode, Globe, Store, Inbox, Loader2,
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { customersApi } from '../api/customers';
import type { Customer } from '../api/types';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../hooks/useToast';

type Source = 'WhatsApp' | 'QR' | 'Website' | 'Walk-in';
type Status = 'Active' | 'Lead' | 'Inactive';

const sourceStyles: Record<Source, { bg: string; text: string; icon: React.ElementType }> = {
  WhatsApp: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: MessageCircle },
  QR: { bg: 'bg-blue-50', text: 'text-blue-600', icon: QrCode },
  Website: { bg: 'bg-indigo-50', text: 'text-indigo-600', icon: Globe },
  'Walk-in': { bg: 'bg-amber-50', text: 'text-amber-600', icon: Store },
};

const statusStyles: Record<Status, string> = {
  Active: 'bg-success/10 text-success',
  Lead: 'bg-cream text-charcoal',
  Inactive: 'bg-cream text-muted',
};

const avatarColors = [
  'bg-cream text-charcoal', 'bg-blue-50 text-blue-700',
  'bg-emerald-50 text-emerald-700', 'bg-purple-50 text-purple-700', 'bg-amber-50 text-amber-700',
];

function initials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

export function Customers() {
  const { data: customerData, loading, refetch } = useApi(() => customersApi.list());
  const { data: statsData } = useApi(() => customersApi.getStats());
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'All' | Source>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All');
  const [visible, setVisible] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', source: 'WhatsApp' as Source, status: 'Lead' as Status });
  const allCustomers: Customer[] = useMemo(() => customerData?.customers || [], [customerData]);

  const filtered = useMemo(() => {
    return allCustomers.filter((c) => {
      const ms = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.replace(/\s/g, '').includes(search.replace(/\s/g, ''));
      return ms && (sourceFilter === 'All' || c.source === sourceFilter) && (statusFilter === 'All' || c.status === statusFilter);
    });
  }, [search, sourceFilter, statusFilter, allCustomers]);

  const shown: Customer[] = filtered.slice(0, visible);

  function openAdd() {
    setEditingCustomer(null);
    setForm({ name: '', phone: '', source: 'WhatsApp', status: 'Lead' });
    setModalOpen(true);
  }

  function openEdit(c: Customer) {
    setEditingCustomer(c);
    setForm({ name: c.name, phone: c.phone, source: c.source, status: c.status });
    setModalOpen(true);
  }

  function handleSave() {
    toast(`Customer "${form.name}" ${editingCustomer ? 'updated' : 'added'}`, 'success');
    setModalOpen(false);
    refetch();
  }

  function handleDelete(_id: number, name: string) {
    toast(`Customer "${name}" removed`, 'success');
    refetch();
  }

  function handleMessage(name: string) {
    toast(`Opening WhatsApp chat with ${name}...`, 'success');
  }

  const stats = statsData ? [
    { label: 'Total Customers', value: String(statsData.total), trend: '+18%', icon: Users, color: 'text-charcoal bg-cream' },
    { label: 'New This Week', value: String(statsData.newThisWeek), trend: '+24%', icon: UserPlus, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Leads', value: String(statsData.activeLeads), trend: '+9%', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'WhatsApp Contacts', value: String(statsData.whatsappContacts), trend: '+12%', icon: MessageCircle, color: 'text-emerald-600 bg-emerald-50' },
  ] : [];

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 className="w-5 h-5 text-silver animate-spin" /></div>;
  }

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-charcoal tracking-tight">Customers</h1>
          <p className="text-sm text-silver mt-0.5">Manage and engage with your {allCustomers.length} customers.</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-1.5">
          <UserPlus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.color}`}><s.icon className="w-[18px] h-[18px]" /></div>
              <span className="badge bg-green-50 text-green-700">{s.trend}</span>
            </div>
            <p className="text-xl font-bold text-charcoal tracking-tight">{s.value}</p>
            <p className="text-xs text-silver mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center gap-3 border-b border-border">
          <div className="flex items-center gap-2 px-3 py-2 bg-cream rounded-2xl flex-1">
            <Search className="w-4 h-4 text-muted" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or phone..." className="bg-transparent outline-none w-full text-xs text-charcoal placeholder-muted" />
          </div>
          <div className="flex items-center gap-2">
            <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value as 'All' | Source)} className="input-field text-xs py-2 w-auto">
              <option value="All">All Sources</option>
              <option value="WhatsApp">WhatsApp</option><option value="QR">QR</option><option value="Website">Website</option><option value="Walk-in">Walk-in</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'All' | Status)} className="input-field text-xs py-2 w-auto">
              <option value="All">All Status</option>
              <option value="Active">Active</option><option value="Lead">Lead</option><option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-muted mb-3"><Inbox className="w-6 h-6" /></div>
            <h3 className="text-sm font-semibold text-charcoal mb-1">No customers found</h3>
            <p className="text-xs text-silver max-w-xs">Try adjusting your search or filters to find who you're looking for.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-muted border-b border-border">
                    <th className="font-medium px-4 py-3">Name</th>
                    <th className="font-medium px-4 py-3">Phone</th>
                    <th className="font-medium px-4 py-3">Last Interaction</th>
                    <th className="font-medium px-4 py-3">Source</th>
                    <th className="font-medium px-4 py-3">Status</th>
                    <th className="font-medium px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((c: Customer, i) => {
                    const SourceIcon = sourceStyles[c.source].icon;
                    return (
                      <tr key={c.id} className="border-b border-border last:border-0 hover:bg-cream transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-[10px] font-semibold ${avatarColors[i % avatarColors.length]}`}>{initials(c.name)}</div>
                            <span className="font-medium text-charcoal text-xs">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-silver">{c.phone}</td>
                        <td className="px-4 py-3 text-muted">{c.lastInteraction}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 badge ${sourceStyles[c.source].bg} ${sourceStyles[c.source].text}`}>
                            <SourceIcon className="w-3 h-3" /> {c.source}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`badge ${statusStyles[c.status]}`}>{c.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-0.5">
                            <button onClick={() => handleMessage(c.name)} className="p-1.5 text-muted hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors" title={`Message ${c.name}`}>
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => openEdit(c)} className="p-1.5 text-muted hover:text-charcoal hover:bg-hover rounded-xl transition-colors" title={`Edit ${c.name}`}>
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDelete(c.id, c.name)} className="p-1.5 text-muted hover:text-error hover:bg-red-50 rounded-xl transition-colors" title={`Delete ${c.name}`}>
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-border">
              {shown.map((c: Customer, i) => {
                const SourceIcon = sourceStyles[c.source].icon;
                return (
                  <div key={c.id} className="p-3 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-[10px] font-semibold shrink-0 ${avatarColors[i % avatarColors.length]}`}>{initials(c.name)}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-charcoal truncate">{c.name}</span>
                        <span className={`badge shrink-0 ${statusStyles[c.status]}`}>{c.status}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-muted"><Phone className="w-3 h-3" /> {c.phone}</div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1 badge ${sourceStyles[c.source].bg} ${sourceStyles[c.source].text}`}>
                          <SourceIcon className="w-2.5 h-2.5" /> {c.source}
                        </span>
                        <span className="text-[10px] text-muted">{c.lastInteraction}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {visible < filtered.length && (
              <div className="p-3 flex justify-center border-t border-border">
                <button onClick={() => setVisible(v => v + 8)} className="btn-secondary text-xs">
                  Load more ({filtered.length - visible} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingCustomer ? 'Edit Customer' : 'Add Customer'}>
        <div className="space-y-3">
          <div>
            <label className="label">Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" />
          </div>
          <div>
            <label className="label">Phone</label>
            <input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Source</label>
              <select value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value as Source }))} className="input-field">
                <option>WhatsApp</option><option>QR</option><option>Website</option><option>Walk-in</option>
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))} className="input-field">
                <option>Active</option><option>Lead</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="btn-secondary text-xs">Cancel</button>
            <button onClick={handleSave} className="btn-primary text-xs">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
