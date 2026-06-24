import React, { useState } from 'react';
import {
  QrCode,
  Plus,
  Edit3,
  Trash2,
  Download,
  Share2,
  Image as ImageIcon } from
'lucide-react';
export function QRMenus() {
  const [categories] = useState([
  'Hot Drinks',
  'Cold Drinks',
  'Pastries',
  'Sandwiches']
  );
  const [products] = useState([
  {
    id: 1,
    name: 'Espresso',
    category: 'Hot Drinks',
    price: '1,500 RWF',
    image:
    'https://images.unsplash.com/photo-1510061155155-99fef2f40653?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 2,
    name: 'Cappuccino',
    category: 'Hot Drinks',
    price: '2,500 RWF',
    image:
    'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 3,
    name: 'Iced Latte',
    category: 'Cold Drinks',
    price: '3,000 RWF',
    image:
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 4,
    name: 'Croissant',
    category: 'Pastries',
    price: '1,200 RWF',
    image:
    'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&w=100&q=80'
  }]
  );
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            QR Menus
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your digital menu and generate QR codes for tables.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-kora-500 hover:bg-kora-600 text-white font-medium rounded-xl shadow-glow transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Menu Items
              </h2>
              <div className="flex gap-2 overflow-x-auto kora-scroll pb-2">
                <button className="px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-lg whitespace-nowrap">
                  All
                </button>
                {categories.map((c) =>
                <button
                  key={c}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium rounded-lg whitespace-nowrap transition-colors">
                  
                    {c}
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {products.map((p) =>
              <div
                key={p.id}
                className="flex items-center gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                
                  <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 rounded-lg object-cover" />
                
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {p.category}
                    </p>
                  </div>
                  <div className="font-bold text-gray-900 dark:text-gray-100">
                    {p.price}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-kora-600 hover:bg-kora-50 dark:hover:bg-kora-500/10 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Your QR Code
            </h2>

            <div className="inline-block p-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm mb-6">
              {/* Mock QR Code */}
              <div className="w-48 h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                <QrCode className="w-32 h-32 text-gray-900" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download QR
              </button>
              <button className="w-full py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share Link
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 rounded-2xl p-6 border border-blue-100 dark:border-blue-500/20">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Table Tents
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Generate printable table tents with your QR code and branding.
            </p>
            <button className="w-full py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium rounded-xl shadow-sm hover:shadow transition-all text-sm">
              Create Printables
            </button>
          </div>
        </div>
      </div>
    </div>);

}