import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  QrCode,
  Globe,
  MousePointerClick,
  ArrowUpRight } from
'lucide-react';
export function Analytics() {
  const [timeRange, setTimeRange] = useState('This Month');
  const stats = [
  {
    label: 'Total Revenue',
    value: '1,250,000 RWF',
    trend: '+15%',
    icon: TrendingUp,
    color: 'text-green-600 bg-green-50 dark:bg-green-500/10'
  },
  {
    label: 'Website Visits',
    value: '3,456',
    trend: '+8%',
    icon: Globe,
    color: 'text-blue-600 bg-blue-50 dark:bg-blue-500/10'
  },
  {
    label: 'QR Scans',
    value: '892',
    trend: '+12%',
    icon: QrCode,
    color: 'text-purple-600 bg-purple-50 dark:bg-purple-500/10'
  },
  {
    label: 'New Leads',
    value: '156',
    trend: '+24%',
    icon: Users,
    color: 'text-kora-600 bg-kora-50 dark:bg-kora-500/10'
  }];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your business performance and growth.
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-kora-500/20">
          
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) =>
        <div
          key={i}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-soft border border-gray-100 dark:border-gray-800">
          
            <div className="flex items-center justify-between mb-3">
              <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              
                <s.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {s.trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {s.value}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {s.label}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Traffic Overview
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {/* Mock Chart */}
            {[40, 60, 45, 80, 55, 90, 75].map((h, i) =>
            <div key={i} className="w-full flex flex-col justify-end group">
                <div
                className="w-full bg-kora-100 dark:bg-kora-500/20 rounded-t-md relative group-hover:bg-kora-200 dark:group-hover:bg-kora-500/30 transition-colors"
                style={{
                  height: `${h}%`
                }}>
                
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h * 10} visits
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-soft border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Conversion Sources
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  WhatsApp
                </span>
                <span className="text-gray-500 dark:text-gray-400">45%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{
                    width: '45%'
                  }}>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Website
                </span>
                <span className="text-gray-500 dark:text-gray-400">30%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: '30%'
                  }}>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  QR Menu
                </span>
                <span className="text-gray-500 dark:text-gray-400">15%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{
                    width: '15%'
                  }}>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Social Media
                </span>
                <span className="text-gray-500 dark:text-gray-400">10%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div
                  className="bg-pink-500 h-2 rounded-full"
                  style={{
                    width: '10%'
                  }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}