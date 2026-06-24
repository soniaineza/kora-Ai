import { useState } from 'react';
import { QrCode, Plus, Edit3, Trash2, Download, Share2 } from 'lucide-react';

export function QRMenus() {
  const [categories] = useState(['Hot Drinks', 'Cold Drinks', 'Pastries', 'Sandwiches']);
  const [products] = useState([
    { id: 1, name: 'Espresso', category: 'Hot Drinks', price: '1,500 RWF', image: 'https://images.unsplash.com/photo-1510061155155-99fef2f40653?auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Cappuccino', category: 'Hot Drinks', price: '2,500 RWF', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Iced Latte', category: 'Cold Drinks', price: '3,000 RWF', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=100&q=80' },
    { id: 4, name: 'Croissant', category: 'Pastries', price: '1,200 RWF', image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&w=100&q=80' },
  ]);

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">QR Menus</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your digital menu and generate QR codes for tables.</p>
        </div>
        <button className="px-3.5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Menu Items</h2>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                <button className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-medium rounded-md whitespace-nowrap">All</button>
                {categories.map((c) => (
                  <button key={c} className="px-2.5 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-[10px] font-medium rounded-md whitespace-nowrap transition-colors">
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3 border border-gray-50 rounded-lg hover:bg-gray-50 transition-colors">
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
                    <p className="text-[10px] text-gray-500">{p.category}</p>
                  </div>
                  <div className="text-sm font-bold text-gray-900">{p.price}</div>
                  <div className="flex items-center gap-1 ml-2">
                    <button className="p-1.5 text-gray-400 hover:text-kora-600 hover:bg-kora-50 rounded-md transition-colors">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card text-center">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Your QR Code</h2>
            <div className="inline-block p-3 bg-white border-2 border-gray-100 rounded-xl shadow-sm mb-4">
              <div className="w-40 h-40 bg-gray-50 flex items-center justify-center relative overflow-hidden rounded-lg">
                <QrCode className="w-28 h-28 text-gray-900" />
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Download QR
              </button>
              <button className="w-full py-2 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Share Link
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">Table Tents</h3>
            <p className="text-xs text-gray-600 mb-3">Generate printable table tents with your QR code and branding.</p>
            <button className="w-full py-2 bg-white text-blue-600 font-medium rounded-lg shadow-sm hover:shadow transition-all text-xs">Create Printables</button>
          </div>
        </div>
      </div>
    </div>
  );
}
