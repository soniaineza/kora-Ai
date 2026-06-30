import {
  Users, QrCode, MessageCircle, Sparkles,
  CheckCircle2, Globe, Image as ImageIcon, Video,
  ArrowRight, Megaphone, Clock, TrendingUp,
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
    { label: "Today's Visitors", value: String(m.todayVisitors), trend: `+${m.visitorsTrend}%`, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'QR Scans', value: String(m.qrScans), trend: `+${m.qrTrend}%`, icon: QrCode, color: 'text-purple-600 bg-purple-50' },
    { label: 'WhatsApp Leads', value: String(m.whatsappLeads), trend: `+${m.leadsTrend}%`, icon: MessageCircle, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Revenue Today', value: `${(m.revenueToday / 1000).toFixed(0)}K RWF`, trend: `+${m.revenueTrend}%`, icon: DollarSign, color: 'text-charcoal bg-cream' },
  ] : [];

  const activity = activityData?.map(a => ({ ...a, icon: loadIcon(a.icon) })) || [];
  const campaigns = campaignData || [];
  const recs = recsData || [];

  if (ml) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-5 h-5 text-silver animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal tracking-tight">Good morning, {company?.name || 'there'}</h1>
          <p className="text-sm text-silver mt-1">Here's what's happening with your business today.</p>
        </div>
        <button
          onClick={() => navigate('/growth')}
          className="btn-primary flex items-center gap-2 shadow-premium-sm"
        >
          <Sparkles className="w-4 h-4" />
          Generate Campaign
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((mItem) => (
          <div key={mItem.label} className="card p-5 hover:shadow-premium-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${mItem.color}`}>
                <mItem.icon className="w-[18px] h-[18px]" />
              </div>
              <span className="badge bg-green-50 text-green-700 gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                {mItem.trend}
              </span>
            </div>
            <p className="text-xs text-silver font-medium">{mItem.label}</p>
            <p className="text-xl font-bold text-charcoal mt-0.5 tracking-tight">{mItem.value}</p>
          </div>
        ))}
      </div>

      {/* AI Assistant + Health Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card p-6 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-charcoal flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold-500" />
              </div>
              <h2 className="text-sm font-semibold text-charcoal">AI Business Assistant</h2>
            </div>
            <div className="bg-cream rounded-2xl p-1.5 flex items-center gap-2 mb-4 border border-border">
              <input
                type="text"
                placeholder="What would you like to grow today?"
                className="flex-1 bg-transparent border-none outline-none px-2.5 py-2 text-sm text-charcoal placeholder-muted"
              />
              <button className="p-2.5 bg-charcoal text-white rounded-xl hover:bg-charcoal/80 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-muted uppercase tracking-[0.12em] mb-2.5">AI Suggestions</p>
              <div className="flex flex-wrap gap-1.5">
                {['30-Day Marketing Plan', 'Create Posters', 'Social Content', 'WhatsApp Campaign', 'Promo Video'].map((text) => (
                  <button key={text} className="px-3 py-1.5 bg-cream border border-border rounded-2xl text-xs text-silver hover:bg-hover transition-colors">
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold text-charcoal mb-4">Business Health Score</h2>
          <div className="flex items-center justify-center mb-5">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-border" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-charcoal" strokeWidth="3" strokeDasharray={`${health?.score || 85}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold text-charcoal">{health?.score || 85}</span>
                <span className="text-[10px] text-muted">/100</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {(health?.items || []).slice(0, 4).map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs text-silver">{item.label}</span>
                <CheckCircle2 className={`w-3.5 h-3.5 ${item.status === 'good' ? 'text-success' : 'text-warning'}`} />
              </div>
            ))}
          </div>
          {(health?.suggestions?.length ?? 0) > 0 && (
            <div className="bg-cream rounded-2xl p-3 border border-border">
              <p className="text-[11px] font-medium text-charcoal mb-1">Suggestions:</p>
              {health?.suggestions?.map((s, i) => (
                <p key={i} className="text-[11px] text-silver">• {s}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Online Assets */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-charcoal">Your Online Assets</h2>
          <button className="text-xs font-medium text-silver hover:text-charcoal transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <div key={asset.title} className="card-sm p-4 hover:shadow-premium transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-2xl bg-cream flex items-center justify-center text-silver">
                  <asset.icon className="w-[18px] h-[18px]" />
                </div>
                <span className={`badge ${asset.statusColor}`}>{asset.status}</span>
              </div>
              <h3 className="text-sm font-semibold text-charcoal mb-3">{asset.title}</h3>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-cream hover:bg-hover text-silver text-xs font-medium rounded-2xl transition-colors">{asset.primaryAction}</button>
                <button className="flex-1 py-2 bg-white border border-border hover:bg-hover text-silver text-xs font-medium rounded-2xl transition-colors">{asset.secondaryAction}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section>
        <h2 className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-gold-500" />
          Recommended for You
        </h2>
        <div className="flex overflow-x-auto gap-3 pb-2 -mx-1 px-1 snap-x">
          {recs.map((item) => (
            <div key={item.title} className="min-w-[260px] snap-start card-sm p-5 cursor-pointer hover:shadow-premium transition-shadow">
              <div className="w-8 h-8 rounded-2xl bg-cream flex items-center justify-center text-silver mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-charcoal mb-1">{item.title}</h4>
              <p className="text-xs text-silver leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activity + Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-charcoal mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activity.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${item.color} shrink-0`}>
                  <item.icon className="w-[18px] h-[18px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal">{item.title}</p>
                  <p className="text-xs text-muted">{item.time}</p>
                </div>
                <Clock className="w-3.5 h-3.5 text-muted shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-charcoal">Active Campaigns</h2>
            <button className="text-xs font-medium text-silver hover:text-charcoal transition-colors">View All</button>
          </div>
          <div className="space-y-2">
            {campaigns.map((c) => (
              <div key={c.name} className="flex items-center justify-between p-3 rounded-2xl bg-cream hover:bg-hover transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-charcoal">{c.name}</p>
                  <p className="text-xs text-muted mt-0.5">Reach: {c.reach} · Conv: {c.conversions}</p>
                </div>
                <span className={`badge shrink-0 ml-3 ${
                  c.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-cream text-silver'
                }`}>
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
