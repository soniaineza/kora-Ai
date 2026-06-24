import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Clock } from
'lucide-react';
export function SocialScheduler() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [currentMonth] = useState('October 2023');
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Social Scheduler
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Plan and automate your social media content.
          </p>
        </div>
        <button className="px-4 py-2 bg-kora-500 hover:bg-kora-600 text-white font-medium rounded-xl shadow-glow transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {currentMonth}
                </h2>
                <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <button className="px-3 py-1 text-sm font-medium bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded shadow-sm">
                  Month
                </button>
                <button className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  Week
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-800">
              {days.map((day) =>
              <div
                key={day}
                className="py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                
                  {day}
                </div>
              )}
            </div>

            <div className="grid grid-cols-7 auto-rows-fr">
              {Array.from({
                length: 35
              }).map((_, i) => {
                const date = i - 2; // Offset for starting day
                const isCurrentMonth = date > 0 && date <= 31;
                const hasPost = date === 12 || date === 15 || date === 18;
                return (
                  <div
                    key={i}
                    className={`min-h-[100px] p-2 border-b border-r border-gray-100 dark:border-gray-800 ${!isCurrentMonth ? 'bg-gray-50/50 dark:bg-gray-800/20' : ''}`}>
                    
                    <span
                      className={`text-sm font-medium ${date === 15 ? 'w-6 h-6 rounded-full bg-kora-500 text-white flex items-center justify-center' : isCurrentMonth ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}`}>
                      
                      {date > 0 && date <= 31 ? date : ''}
                    </span>

                    {hasPost &&
                    <div className="mt-1 p-1.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded text-xs text-blue-700 dark:text-blue-400 font-medium truncate cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors">
                        <Instagram className="w-3 h-3 inline mr-1" />
                        Promo...
                      </div>
                    }
                  </div>);

              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Upcoming Posts
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=100&q=80"
                    alt="Post"
                    className="w-full h-full object-cover" />
                  
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Clock className="w-3 h-3" /> Today, 2:00 PM
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                    Weekend special starts now! Come grab your favorite...
                  </p>
                  <div className="flex gap-1 mt-2">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <Facebook className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Connected Accounts
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-pink-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    @sunnycafe
                  </span>
                </div>
                <span className="text-xs text-green-600 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full font-medium">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sunny Cafe
                  </span>
                </div>
                <span className="text-xs text-green-600 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full font-medium">
                  Connected
                </span>
              </div>
              <button className="w-full py-2 mt-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                + Connect Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}