import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  Search,
  MessageCircle,
  Edit3,
  MoreHorizontal,
  Phone,
  TrendingUp,
  Filter,
  QrCode,
  Globe,
  Store,
  Inbox } from
'lucide-react';
type Source = 'WhatsApp' | 'QR' | 'Website' | 'Walk-in';
type Status = 'Active' | 'Lead' | 'Inactive';
interface Customer {
  id: number;
  name: string;
  phone: string;
  lastInteraction: string;
  source: Source;
  status: Status;
}
const CUSTOMERS: Customer[] = [
{
  id: 1,
  name: 'Aline Uwase',
  phone: '+250 788 123 456',
  lastInteraction: '2 hours ago',
  source: 'WhatsApp',
  status: 'Active'
},
{
  id: 2,
  name: 'Jean-Paul Habimana',
  phone: '+250 722 998 211',
  lastInteraction: 'Yesterday',
  source: 'QR',
  status: 'Lead'
},
{
  id: 3,
  name: 'Grace Mukamana',
  phone: '+250 788 442 109',
  lastInteraction: '3 days ago',
  source: 'Website',
  status: 'Active'
},
{
  id: 4,
  name: 'Eric Niyonzima',
  phone: '+250 733 567 800',
  lastInteraction: '5 hours ago',
  source: 'Walk-in',
  status: 'Active'
},
{
  id: 5,
  name: 'Divine Ingabire',
  phone: '+250 788 010 234',
  lastInteraction: '1 week ago',
  source: 'WhatsApp',
  status: 'Inactive'
},
{
  id: 6,
  name: 'Samuel Okello',
  phone: '+256 701 223 119',
  lastInteraction: 'Today',
  source: 'QR',
  status: 'Lead'
},
{
  id: 7,
  name: 'Fatou Diallo',
  phone: '+221 77 556 1290',
  lastInteraction: '4 days ago',
  source: 'Website',
  status: 'Active'
},
{
  id: 8,
  name: 'Kwame Mensah',
  phone: '+233 24 778 4421',
  lastInteraction: '2 days ago',
  source: 'WhatsApp',
  status: 'Active'
},
{
  id: 9,
  name: 'Chioma Adeyemi',
  phone: '+234 803 119 7765',
  lastInteraction: '6 hours ago',
  source: 'Walk-in',
  status: 'Lead'
},
{
  id: 10,
  name: 'Brian Otieno',
  phone: '+254 712 445 980',
  lastInteraction: '1 week ago',
  source: 'QR',
  status: 'Inactive'
},
{
  id: 11,
  name: 'Sandrine Keza',
  phone: '+250 788 661 002',
  lastInteraction: 'Yesterday',
  source: 'WhatsApp',
  status: 'Active'
},
{
  id: 12,
  name: 'Patrick Bizimana',
  phone: '+250 722 330 778',
  lastInteraction: '3 hours ago',
  source: 'Website',
  status: 'Lead'
},
{
  id: 13,
  name: 'Lucia Nakato',
  phone: '+256 772 884 110',
  lastInteraction: '5 days ago',
  source: 'Walk-in',
  status: 'Active'
},
{
  id: 14,
  name: 'Thomas Rugamba',
  phone: '+250 788 220 554',
  lastInteraction: '2 weeks ago',
  source: 'QR',
  status: 'Inactive'
},
{
  id: 15,
  name: 'Esperance Mutoni',
  phone: '+250 733 909 121',
  lastInteraction: 'Today',
  source: 'WhatsApp',
  status: 'Lead'
}];

const sourceStyles: Record<
  Source,
  {
    bg: string;
    text: string;
    icon: React.ElementType;
  }> =
{
  WhatsApp: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    icon: MessageCircle
  },
  QR: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: QrCode
  },
  Website: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    icon: Globe
  },
  'Walk-in': {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    icon: Store
  }
};
const statusStyles: Record<Status, string> = {
  Active: 'bg-green-50 text-green-600 ring-1 ring-green-100',
  Lead: 'bg-kora-50 text-kora-600 ring-1 ring-kora-100',
  Inactive: 'bg-gray-100 text-gray-500 ring-1 ring-gray-200'
};
function initials(name: string) {
  return name.
  split(' ').
  map((n) => n[0]).
  slice(0, 2).
  join('').
  toUpperCase();
}
const avatarColors = [
'bg-kora-100 text-kora-700',
'bg-blue-100 text-blue-700',
'bg-emerald-100 text-emerald-700',
'bg-purple-100 text-purple-700',
'bg-amber-100 text-amber-700'];

export function Customers() {
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'All' | Source>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All');
  const [visible, setVisible] = useState(8);
  const filtered = useMemo(() => {
    return CUSTOMERS.filter((c) => {
      const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.replace(/\s/g, '').includes(search.replace(/\s/g, ''));
      const matchesSource = sourceFilter === 'All' || c.source === sourceFilter;
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
      return matchesSearch && matchesSource && matchesStatus;
    });
  }, [search, sourceFilter, statusFilter]);
  const shown = filtered.slice(0, visible);
  const stats = [
  {
    label: 'Total Customers',
    value: CUSTOMERS.length.toString(),
    trend: '+18%',
    icon: Users,
    color: 'text-kora-600 bg-kora-50'
  },
  {
    label: 'New This Week',
    value: '6',
    trend: '+24%',
    icon: UserPlus,
    color: 'text-blue-600 bg-blue-50'
  },
  {
    label: 'Active Leads',
    value: CUSTOMERS.filter((c) => c.status === 'Lead').length.toString(),
    trend: '+9%',
    icon: TrendingUp,
    color: 'text-green-600 bg-green-50'
  },
  {
    label: 'WhatsApp Contacts',
    value: CUSTOMERS.filter((c) => c.source === 'WhatsApp').length.toString(),
    trend: '+12%',
    icon: MessageCircle,
    color: 'text-emerald-600 bg-emerald-50'
  }];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 mt-1">
            Manage and engage with your {CUSTOMERS.length} customers.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-kora-500 hover:bg-kora-600 text-white font-medium rounded-xl shadow-glow transition-colors">
          <UserPlus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) =>
        <motion.div
          key={s.label}
          initial={{
            opacity: 0,
            y: 16
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.06
          }}
          className="bg-white rounded-2xl p-5 shadow-soft border border-gray-100">
          
            <div className="flex items-center justify-between mb-3">
              <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              
                <s.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {s.trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{s.value}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </motion.div>
        )}
      </div>

      {/* Filters + table */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-3 border-b border-gray-100">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-xl flex-1 focus-within:ring-2 focus-within:ring-kora-500/20 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or phone..."
              className="bg-transparent outline-none w-full text-sm text-gray-900 placeholder-gray-400"
              aria-label="Search customers" />
            
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-gray-400 text-sm">
              <Filter className="w-4 h-4" />
            </div>
            <select
              value={sourceFilter}
              onChange={(e) =>
              setSourceFilter(e.target.value as 'All' | Source)
              }
              className="px-3 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm text-gray-700 outline-none focus:ring-2 focus:ring-kora-500/20"
              aria-label="Filter by source">
              
              <option value="All">All Sources</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="QR">QR</option>
              <option value="Website">Website</option>
              <option value="Walk-in">Walk-in</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) =>
              setStatusFilter(e.target.value as 'All' | Status)
              }
              className="px-3 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm text-gray-700 outline-none focus:ring-2 focus:ring-kora-500/20"
              aria-label="Filter by status">
              
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Lead">Lead</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ?
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              No customers found
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Try adjusting your search or filters to find who you're looking
              for.
            </p>
          </div> :

        <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto kora-scroll">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-100">
                    <th className="font-medium px-6 py-3">Name</th>
                    <th className="font-medium px-6 py-3">Phone</th>
                    <th className="font-medium px-6 py-3">Last Interaction</th>
                    <th className="font-medium px-6 py-3">Source</th>
                    <th className="font-medium px-6 py-3">Status</th>
                    <th className="font-medium px-6 py-3 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((c, i) => {
                  const SourceIcon = sourceStyles[c.source].icon;
                  return (
                    <tr
                      key={c.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                      
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${avatarColors[i % avatarColors.length]}`}>
                            
                              {initials(c.name)}
                            </div>
                            <span className="font-medium text-gray-900">
                              {c.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{c.phone}</td>
                        <td className="px-6 py-4 text-gray-500">
                          {c.lastInteraction}
                        </td>
                        <td className="px-6 py-4">
                          <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${sourceStyles[c.source].bg} ${sourceStyles[c.source].text}`}>
                          
                            <SourceIcon className="w-3.5 h-3.5" /> {c.source}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[c.status]}`}>
                          
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            aria-label={`Message ${c.name}`}>
                            
                              <MessageCircle className="w-4 h-4" />
                            </button>
                            <button
                            className="p-2 text-gray-400 hover:text-kora-600 hover:bg-kora-50 rounded-lg transition-colors"
                            aria-label={`Edit ${c.name}`}>
                            
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label={`More actions for ${c.name}`}>
                            
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>);

                })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {shown.map((c, i) => {
              const SourceIcon = sourceStyles[c.source].icon;
              return (
                <div key={c.id} className="p-4 flex items-center gap-3">
                    <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                    
                      {initials(c.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-gray-900 truncate">
                          {c.name}
                        </span>
                        <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${statusStyles[c.status]}`}>
                        
                          {c.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Phone className="w-3 h-3" /> {c.phone}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${sourceStyles[c.source].bg} ${sourceStyles[c.source].text}`}>
                        
                          <SourceIcon className="w-3 h-3" /> {c.source}
                        </span>
                        <span className="text-xs text-gray-400">
                          {c.lastInteraction}
                        </span>
                      </div>
                    </div>
                  </div>);

            })}
            </div>

            {visible < filtered.length &&
          <div className="p-4 flex justify-center border-t border-gray-100">
                <button
              onClick={() => setVisible((v) => v + 8)}
              className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-xl transition-colors">
              
                  Load more ({filtered.length - visible} remaining)
                </button>
              </div>
          }
          </>
        }
      </div>
    </div>);

}