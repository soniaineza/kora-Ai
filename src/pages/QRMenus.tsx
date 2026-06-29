import { useState } from 'react';
import { QrCode, Plus, Edit3, Trash2, Download, Share2 } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../hooks/useToast';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

const defaultProducts: MenuItem[] = [
  { id: 1, name: 'Espresso', category: 'Hot Drinks', price: '1,500 RWF', image: 'https://images.unsplash.com/photo-1510061155155-99fef2f40653?auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'Cappuccino', category: 'Hot Drinks', price: '2,500 RWF', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'Iced Latte', category: 'Cold Drinks', price: '3,000 RWF', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=100&q=80' },
  { id: 4, name: 'Croissant', category: 'Pastries', price: '1,200 RWF', image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&w=100&q=80' },
];

export function QRMenus() {
  const [categories] = useState(['Hot Drinks', 'Cold Drinks', 'Pastries', 'Sandwiches']);
  const [products, setProducts] = useState<MenuItem[]>(defaultProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({ name: '', category: 'Hot Drinks', price: '' });
  const { toast } = useToast();

  function openAdd() {
    setEditing(null);
    setForm({ name: '', category: 'Hot Drinks', price: '' });
    setModalOpen(true);
  }

  function openEdit(p: MenuItem) {
    setEditing(p);
    setForm({ name: p.name, category: p.category, price: p.price.replace(' RWF', '') });
    setModalOpen(true);
  }

  function handleSave() {
    if (editing) {
      setProducts(prev => prev.map(p => p.id === editing.id ? { ...p, name: form.name, category: form.category, price: `${form.price} RWF` } : p));
    } else {
      const newItem: MenuItem = { id: Date.now(), name: form.name, category: form.category, price: `${form.price} RWF`, image: 'https://images.unsplash.com/photo-1510061155155-99fef2f40653?auto=format&fit=crop&w=100&q=80' };
      setProducts(prev => [...prev, newItem]);
    }
    toast(`Product "${form.name}" ${editing ? 'updated' : 'added'}`, 'success');
    setModalOpen(false);
  }

  function handleDelete(id: number, name: string) {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast(`Product "${name}" removed`, 'success');
  }

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">QR Menus</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your digital menu and generate QR codes for tables.</p>
        </div>
        <button onClick={openAdd} className="px-3.5 py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors flex items-center gap-1.5">
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
                  <button key={c} className="px-2.5 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 text-[10px] font-medium rounded-md whitespace-nowrap transition-colors">{c}</button>
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
                    <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-kora-600 hover:bg-kora-50 rounded-md transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(p.id, p.name)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
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
              <button onClick={() => toast('QR code downloaded', 'success')} className="w-full py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Download QR
              </button>
              <button onClick={() => toast('QR link copied to clipboard', 'success')} className="w-full py-2 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Share Link
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5">Table Tents</h3>
            <p className="text-xs text-gray-600 mb-3">Generate printable table tents with your QR code and branding.</p>
            <button onClick={() => toast('Table tent PDF generated', 'success')} className="w-full py-2 bg-white text-blue-600 font-medium rounded-lg shadow-sm hover:shadow transition-all text-xs">Create Printables</button>
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Product' : 'Add Product'}>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Product Name</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Price (RWF)</label>
            <input type="text" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 bg-kora-500 hover:bg-kora-600 text-white text-xs font-medium rounded-lg">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}