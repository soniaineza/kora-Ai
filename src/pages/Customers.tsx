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
  Active: 'bg-green-50 text-green-700 ring-1 ring-green-100',
  Lead: 'bg-kora-50 text-kora-700 ring-1 ring-kora-100',
  Inactive: 'bg-gray-100 text-gray-500 ring-1 ring-gray-200',
};

const avatarColors = [
  'bg-kora-100 text-kora-700', 'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700', 'bg-purple-100 text-purple-700', 'bg-amber-100 text-amber-700',
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
    { label: 'Total Customers', value: String(statsData.total), trend: '+18%', icon: Users, color: 'text-kora-600 bg-kora-50' },
    { label: 'New This Week', value: String(statsData.newThisWeek), trend: '+24%', icon: UserPlus, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Leads', value: String(statsData.activeLeads), trend: '+9%', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'WhatsApp Contacts', value: String(statsData.whatsappContacts), trend: '+12%', icon: MessageCircle, color: 'text-emerald-600 bg-emerald-50' },
  ] : [];

  if (loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 text-kora-500 animate-spin" /></div>;
  }

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage and engage with your {allCustomers.length} customers.</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors">
          <UserPlus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 shadow-card">
            <div className="flex items-center justify-between mb-2.5">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}><s.icon className="w-[18px] h-[18px]" /></div>
              <span className="text-[10px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">{s.trend}</span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-card overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center gap-3 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-900 rounded-lg flex-1 focus-within:ring-2 focus-within:ring-kora-500/20">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or phone..." className="bg-transparent outline-none w-full text-xs text-gray-900 placeholder-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value as 'All' | Source)} className="px-2.5 py-2 bg-gray-50 dark:bg-slate-900 border border-transparent rounded-lg text-xs text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-kora-500/20">
              <option value="All">All Sources</option>
              <option value="WhatsApp">WhatsApp</option><option value="QR">QR</option><option value="Website">Website</option><option value="Walk-in">Walk-in</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'All' | Status)} className="px-2.5 py-2 bg-gray-50 dark:bg-slate-900 border border-transparent rounded-lg text-xs text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-kora-500/20">
              <option value="All">All Status</option>
              <option value="Active">Active</option><option value="Lead">Lead</option><option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-900 flex items-center justify-center text-gray-300 dark:text-gray-500 mb-3"><Inbox className="w-6 h-6" /></div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">No customers found</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">Try adjusting your search or filters to find who you're looking for.</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-slate-700">
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
                      <tr key={c.id} className="border-b border-gray-50 dark:border-slate-700 last:border-0 hover:bg-gray-50/60 dark:hover:bg-slate-700/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold ${avatarColors[i % avatarColors.length]}`}>{initials(c.name)}</div>
                            <span className="font-medium text-gray-900 dark:text-white text-xs">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{c.phone}</td>
                        <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{c.lastInteraction}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${sourceStyles[c.source].bg} ${sourceStyles[c.source].text}`}>
                            <SourceIcon className="w-3 h-3" /> {c.source}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusStyles[c.status]}`}>{c.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-0.5">
                            <button onClick={() => handleMessage(c.name)} className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title={`Message ${c.name}`}>
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-kora-600 hover:bg-kora-50 rounded-md transition-colors" title={`Edit ${c.name}`}>
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDelete(c.id, c.name)} className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title={`Delete ${c.name}`}>
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

            <div className="md:hidden divide-y divide-gray-50 dark:divide-slate-700">
              {shown.map((c: Customer, i) => {
                const SourceIcon = sourceStyles[c.source].icon;
                return (
                  <div key={c.id} className="p-3 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${avatarColors[i % avatarColors.length]}`}>{initials(c.name)}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{c.name}</span>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${statusStyles[c.status]}`}>{c.status}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-gray-500 dark:text-gray-400"><Phone className="w-3 h-3" /> {c.phone}</div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${sourceStyles[c.source].bg} ${sourceStyles[c.source].text}`}>
                          <SourceIcon className="w-2.5 h-2.5" /> {c.source}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">{c.lastInteraction}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {visible < filtered.length && (
              <div className="p-3 flex justify-center border-t border-gray-100 dark:border-slate-700">
                <button onClick={() => setVisible(v => v + 8)} className="px-4 py-2 bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg transition-colors">
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
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input type="text" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Source</label>
              <select value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value as Source }))} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm">
                <option>WhatsApp</option><option>QR</option><option>Website</option><option>Walk-in</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Status }))} className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm">
                <option>Active</option><option>Lead</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-kora-500 hover:bg-kora-600 text-white text-xs font-medium rounded-lg">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}