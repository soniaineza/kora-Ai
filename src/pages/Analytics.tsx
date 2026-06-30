import { useState } from 'react';
import { TrendingUp, Users, QrCode, Globe, ArrowUpRight, Loader2 } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { analyticsApi } from '../api/analytics';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('This Month');
  const { data: stats, loading } = useApi(() => analyticsApi.getStats(timeRange), [timeRange]);
  const { data: traffic } = useApi(() => analyticsApi.getTraffic(timeRange), [timeRange]);
  const { data: conversions } = useApi(() => analyticsApi.getConversionSources());

  const statCards = stats ? [
    { label: 'Total Revenue', value: `${(stats.totalRevenue / 1000).toFixed(0)}K RWF`, trend: '+15%', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'Website Visits', value: stats.websiteVisits.toLocaleString(), trend: '+8%', icon: Globe, color: 'text-blue-600 bg-blue-50' },
    { label: 'QR Scans', value: stats.qrScans.toLocaleString(), trend: '+12%', icon: QrCode, color: 'text-purple-600 bg-purple-50' },
    { label: 'New Leads', value: stats.newLeads.toLocaleString(), trend: '+24%', icon: Users, color: 'text-charcoal bg-cream' },
  ] : [];

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 className="w-5 h-5 text-silver animate-spin" /></div>;
  }

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-charcoal tracking-tight">Analytics</h1>
          <p className="text-sm text-silver mt-0.5">Track your business performance and growth.</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input-field w-auto text-xs py-2"
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} className="card p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-[18px] h-[18px]" />
              </div>
              <span className="badge bg-green-50 text-green-700 gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> {s.trend}
              </span>
            </div>
            <p className="text-xl font-bold text-charcoal tracking-tight">{s.value}</p>
            <p className="text-xs text-silver mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-charcoal mb-4">Traffic Overview</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {(traffic || []).map((d, i) => (
              <div key={i} className="w-full flex flex-col justify-end group">
                <div className="w-full bg-charcoal/10 rounded-t-lg relative group-hover:bg-charcoal/20 transition-colors" style={{ height: `${(d.visits / 10)}%` }}>
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[10px] py-1 px-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {d.visits} visits
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[10px] text-muted">
            {(traffic || []).map((d, i) => <span key={i}>{d.day}</span>)}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-charcoal mb-4">Conversion Sources</h3>
          <div className="space-y-3.5">
            {(conversions || []).map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-charcoal">{item.label}</span>
                  <span className="text-silver">{item.value}%</span>
                </div>
                <div className="w-full bg-cream rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
