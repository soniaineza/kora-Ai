import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Instagram, Facebook, Clock } from 'lucide-react';

export function SocialScheduler() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [currentMonth] = useState('October 2023');

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Social Scheduler</h1>
          <p className="text-sm text-gray-500 mt-0.5">Plan and automate your social media content.</p>
        </div>
        <button className="px-3.5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
            <div className="p-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-bold text-gray-900">{currentMonth}</h2>
                <div className="flex items-center gap-0.5">
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex bg-gray-100 p-0.5 rounded-md">
                <button className="px-2.5 py-1 text-[10px] font-medium bg-white text-gray-900 rounded shadow-sm">Month</button>
                <button className="px-2.5 py-1 text-[10px] font-medium text-gray-500 hover:text-gray-700">Week</button>
              </div>
            </div>

            <div className="grid grid-cols-7 border-b border-gray-100">
              {days.map((day) => (
                <div key={day} className="py-2 text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 auto-rows-fr">
              {Array.from({ length: 35 }).map((_, i) => {
                const date = i - 2;
                const isCurrentMonth = date > 0 && date <= 31;
                const hasPost = date === 12 || date === 15 || date === 18;
                return (
                  <div key={i} className={`min-h-[80px] p-1.5 border-b border-r border-gray-100 ${!isCurrentMonth ? 'bg-gray-50/50' : ''}`}>
                    <span className={`text-xs font-medium ${date === 15 ? 'w-5 h-5 rounded-full bg-kora-500 text-white flex items-center justify-center text-[10px]' : isCurrentMonth ? 'text-gray-700' : 'text-gray-400'}`}>
                      {date > 0 && date <= 31 ? date : ''}
                    </span>
                    {hasPost && (
                      <div className="mt-1 p-1 bg-blue-50 border border-blue-100 rounded text-[10px] text-blue-700 font-medium truncate cursor-pointer hover:bg-blue-100 transition-colors">
                        <Instagram className="w-2.5 h-2.5 inline mr-0.5" />
                        Promo...
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-card">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Upcoming Posts</h3>
            <div className="space-y-3">
              <div className="flex gap-2.5">
                <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=100&q=80" alt="Post" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-0.5">
                    <Clock className="w-3 h-3" /> Today, 2:00 PM
                  </div>
                  <p className="text-xs font-medium text-gray-900 line-clamp-2">Weekend special starts now! Come grab your favorite...</p>
                  <div className="flex gap-1 mt-1.5">
                    <Instagram className="w-3 h-3 text-pink-600" />
                    <Facebook className="w-3 h-3 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-card">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Connected Accounts</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span className="text-xs font-medium text-gray-700">@sunnycafe</span>
                </div>
                <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full font-medium">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">Sunny Cafe</span>
                </div>
                <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full font-medium">Connected</span>
              </div>
              <button className="w-full py-1.5 mt-1.5 border border-dashed border-gray-300 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                + Connect Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
