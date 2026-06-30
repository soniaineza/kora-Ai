import {
  Users, QrCode, MessageCircle, Sparkles,
  CheckCircle2, Globe, Image as ImageIcon, Video,
  ArrowRight, Megaphone, Clock,
  DollarSign, ArrowUpRight, Loader2,
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { dashboardApi } from '../api/dashboard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const iconMap: Record<string, React.ElementType> = {
  Users, QrCode, MessageCircle, Image: ImageIcon, Video, Globe, Megaphone,
};

function loadIcon(name: string): React.ElementType {
  return iconMap[name] || Globe;
}

const assets = [
  { icon: Globe, title: 'Website', status: 'Live', statusColor: 'text-green-700 bg-green-50', primaryAction: 'Manage', secondaryAction: 'Preview' },
  { icon: QrCode, title: 'QR Menu', status: '35 Items', statusColor: 'text-blue-700 bg-blue-50', primaryAction: 'Manage', secondaryAction: 'Download' },
  { icon: MessageCircle, title: 'WhatsApp Catalog', status: '50 Products', statusColor: 'text-emerald-700 bg-emerald-50', primaryAction: 'Manage', secondaryAction: 'Share' },
  { icon: ImageIcon, title: 'AI Posters', status: '12 Generated', statusColor: 'text-purple-700 bg-purple-50', primaryAction: 'Manage', secondaryAction: 'Generate' },
  { icon: Video, title: 'Promo Videos', status: '3 Generated', statusColor: 'text-pink-700 bg-pink-50', primaryAction: 'Manage', secondaryAction: 'Generate' },
  { icon: Globe, title: 'Landing Pages', status: '2 Active', statusColor: 'text-indigo-700 bg-indigo-50', primaryAction: 'Manage', secondaryAction: 'Create New' },
];

export function Dashboard() {
  const { company } = useAuth();
  const navigate = useNavigate();
  const { data: m, loading: ml } = useApi(() => dashboardApi.getMetrics());
  const { data: health } = useApi(() => dashboardApi.getHealth());
  const { data: activityData } = useApi(() => dashboardApi.getActivity());
  const { data: campaignData } = useApi(() => dashboardApi.getCampaigns());
  const { data: recsData } = useApi(() => dashboardApi.getRecommendations());

  const metrics = m ? [
    { label: 'Today\'s Visitors', value: String(m.todayVisitors), trend: `+${m.visitorsTrend}%`, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'QR Scans', value: String(m.qrScans), trend: `+${m.qrTrend}%`, icon: QrCode, color: 'text-purple-600 bg-purple-50' },
    { label: 'WhatsApp Leads', value: String(m.whatsappLeads), trend: `+${m.leadsTrend}%`, icon: MessageCircle, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Revenue Today', value: `${(m.revenueToday / 1000).toFixed(0)}K RWF`, trend: `+${m.revenueTrend}%`, icon: DollarSign, color: 'text-kora-600 bg-kora-50' },
  ] : [];

  const activity = activityData?.map(a => ({ ...a, icon: loadIcon(a.icon) })) || [];
  const campaigns = campaignData || [];
  const recs = recsData || [];

  if (ml) {
    return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 text-kora-500 animate-spin" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Good morning, {company?.name || 'there'}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Here's what's happening with your business today.</p>
        </div>
        <button onClick={() => navigate('/growth')} className="flex items-center gap-1.5 px-3.5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg transition-colors shadow-glow">
          <Sparkles className="w-4 h-4" />
          Generate Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((mItem) => (
          <div key={mItem.label} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${mItem.color}`}>
                <mItem.icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                {mItem.trend}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{mItem.label}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{mItem.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-kora-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-kora-400 to-kora-600 flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-sm font-semibold text-white">AI Business Assistant</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-2 flex items-center gap-2 mb-4 focus-within:bg-white/[0.12] transition-colors">
              <input
                type="text"
                placeholder="What would you like to grow today? (e.g. Increase weekend sales)"
                className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-gray-400 px-2 py-1.5"
              />
              <button className="p-1.5 bg-kora-500 hover:bg-kora-600 rounded-md transition-colors">
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">AI Suggestions</p>
              <div className="flex flex-wrap gap-1.5">
                {['30-Day Marketing Plan', 'Create Posters', 'Social Content', 'WhatsApp Campaign', 'Promo Video'].map((text) => (
                  <button key={text} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs text-gray-300 transition-colors">
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 shadow-card">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Business Health Score</h2>
          <div className="flex items-center justify-center mb-5">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-100 dark:text-slate-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-kora-500" strokeWidth="3" strokeDasharray={`${health?.score || 85}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{health?.score || 85}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">/100</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {(health?.items || []).map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                <CheckCircle2 className={`w-4 h-4 ${item.status === 'good' ? 'text-green-500' : 'text-orange-500'}`} />
              </div>
            ))}
          </div>
          {(health?.suggestions?.length ?? 0) > 0 && (
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <p className="text-xs font-medium text-amber-800 mb-1">Suggestions to improve:</p>
              <ul className="text-xs text-amber-700 space-y-0.5 list-disc list-inside">
                {health?.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Your Online Assets</h2>
          <button className="text-xs font-medium text-kora-600 hover:text-kora-700">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <div key={asset.title} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 shadow-card hover:shadow-card-hover transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-900 flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <asset.icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${asset.statusColor}`}>{asset.status}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{asset.title}</h3>
              <div className="flex gap-1.5">
                <button className="flex-1 py-1.5 bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md transition-colors">{asset.primaryAction}</button>
                <button className="flex-1 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md transition-colors">{asset.secondaryAction}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-kora-500" />
          Recommended for You
        </h2>
        <div className="flex overflow-x-auto gap-3 pb-2 -mx-1 px-1 snap-x">
          {recs.map((item) => (
            <div key={item.title} className="min-w-[240px] snap-start bg-gradient-to-br from-kora-50 to-white border border-kora-100 rounded-xl p-4 cursor-pointer hover:shadow-card-hover transition-shadow">
              <div className="w-7 h-7 rounded-full bg-kora-100 flex items-center justify-center text-kora-600 mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{item.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 shadow-card">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activity.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
                </div>
                <Clock className="w-3.5 h-3.5 text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Active Campaigns</h2>
            <button className="text-xs font-medium text-kora-600 hover:text-kora-700">View All</button>
          </div>
          <div className="space-y-2">
            {campaigns.map((c) => (
              <div key={c.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-50 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{c.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Reach: {c.reach} · Conv: {c.conversions}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${c.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}