import { useState } from 'react';
import {
  TrendingUp, Users, QrCode, Globe, ArrowUpRight,
} from 'lucide-react';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('This Month');

  const stats = [
    { label: 'Total Revenue', value: '1,250,000 RWF', trend: '+15%', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'Website Visits', value: '3,456', trend: '+8%', icon: Globe, color: 'text-blue-600 bg-blue-50' },
    { label: 'QR Scans', value: '892', trend: '+12%', icon: QrCode, color: 'text-purple-600 bg-purple-50' },
    { label: 'New Leads', value: '156', trend: '+24%', icon: Users, color: 'text-kora-600 bg-kora-50' },
  ];

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track your business performance and growth.</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 outline-none focus:ring-2 focus:ring-kora-500/20"
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-card">
            <div className="flex items-center justify-between mb-2.5">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="w-[18px] h-[18px]" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3" /> {s.trend}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Traffic Overview</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[40, 60, 45, 80, 55, 90, 75].map((h, i) => (
              <div key={i} className="w-full flex flex-col justify-end group">
                <div
                  className="w-full bg-kora-100 rounded-t-md relative group-hover:bg-kora-200 transition-colors"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h * 10} visits
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-[10px] text-gray-500">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Conversion Sources</h3>
          <div className="space-y-3.5">
            {[
              { label: 'WhatsApp', value: 45, color: 'bg-emerald-500' },
              { label: 'Website', value: 30, color: 'bg-blue-500' },
              { label: 'QR Menu', value: 15, color: 'bg-purple-500' },
              { label: 'Social Media', value: 10, color: 'bg-pink-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="text-gray-500">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
