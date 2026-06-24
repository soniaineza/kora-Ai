import { useState } from 'react';
import {
  Globe, Palette, Sparkles, LayoutTemplate, Upload, Eye,
} from 'lucide-react';

export function WebsiteBuilder() {
  const [activeTab, setActiveTab] = useState('details');
  const [isGenerating, setIsGenerating] = useState(false);
  const handleGenerate = () => { setIsGenerating(true); setTimeout(() => setIsGenerating(false), 3000); };

  return (
    <div className="pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Website Builder</h1>
          <p className="text-sm text-gray-500 mt-0.5">Design and publish your professional online presence.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5">
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button className="px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5">
            <Globe className="w-4 h-4" /> Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
            <div className="p-1 border-b border-gray-100 flex overflow-x-auto">
              {['details', 'theme', 'media'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${activeTab === tab ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === 'details' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Business Name</label>
                    <input type="text" defaultValue="Sunny Cafe" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tagline</label>
                    <input type="text" defaultValue="Best coffee in town" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">About Us</label>
                    <textarea rows={4} defaultValue="We serve freshly brewed coffee and homemade pastries every day." className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900 resize-none" />
                  </div>
                </div>
              )}

              {activeTab === 'theme' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                      <LayoutTemplate className="w-3.5 h-3.5" /> Select Theme
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border-2 border-kora-500 rounded-lg overflow-hidden cursor-pointer">
                        <div className="h-16 bg-gray-100 p-2"><div className="w-full h-full bg-white rounded shadow-sm" /></div>
                        <div className="p-1.5 text-center text-[10px] font-medium bg-white text-gray-900">Modern</div>
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-gray-300 transition-colors">
                        <div className="h-16 bg-gray-100 p-2"><div className="w-full h-full bg-white rounded shadow-sm" /></div>
                        <div className="p-1.5 text-center text-[10px] font-medium bg-white text-gray-500">Classic</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5" /> Brand Color
                    </label>
                    <div className="flex gap-2">
                      {['bg-kora-500', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-gray-900'].map((c, i) => (
                        <div key={i} className={`w-7 h-7 rounded-full ${c} ${i === 0 ? 'ring-2 ring-offset-1 ring-kora-500' : ''} cursor-pointer`} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Logo</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5 text-gray-400 mb-1.5" />
                      <span className="text-xs font-medium text-gray-900">Upload Logo</span>
                      <span className="text-[10px] text-gray-500 mt-0.5">PNG, JPG up to 2MB</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Gallery Images</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[1, 2].map((i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img src={`https://images.unsplash.com/photo-${i === 1 ? '1497935586351-b67a49e012bf' : '1554118811-1e0d58224f24'}?auto=format&fit=crop&w=150&q=80`} alt="Gallery" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-kora-50 to-orange-50 rounded-xl p-4 border border-kora-100">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-lg bg-kora-500 flex items-center justify-center text-white shadow-glow">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">AI Generate</h3>
            </div>
            <p className="text-xs text-gray-600 mb-3">Let AI build a complete, beautiful website based on your business profile in seconds.</p>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-2 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors flex items-center justify-center gap-1.5 disabled:opacity-70"
            >
              {isGenerating ? <><Sparkles className="w-3.5 h-3.5 animate-spin" /> Generating...</> : <><Sparkles className="w-3.5 h-3.5" /> Generate Website</>}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-100 rounded-xl p-3 h-[560px] flex flex-col border border-gray-200">
            <div className="flex items-center gap-1.5 mb-3 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="mx-auto bg-white text-[10px] text-gray-500 px-3 py-0.5 rounded-full flex items-center gap-1.5">
                <Globe className="w-3 h-3" /> sunnycafe.kora.site
              </div>
            </div>
            <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-sm relative">
              {isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                  <Sparkles className="w-7 h-7 text-kora-500 animate-pulse mb-3" />
                  <p className="text-sm text-gray-900 font-medium">Designing your site...</p>
                </div>
              )}
              <div className="h-full overflow-y-auto">
                <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
                  <div className="font-bold text-base text-gray-900">Sunny Cafe</div>
                  <nav className="flex gap-5 text-[11px] font-medium text-gray-600">
                    <span>Home</span><span>Menu</span><span>About</span><span>Contact</span>
                  </nav>
                </div>
                <div className="px-6 py-14 text-center bg-gray-50">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2.5">Best coffee in town</h1>
                  <p className="text-xs text-gray-500 max-w-md mx-auto mb-6">We serve freshly brewed coffee and homemade pastries every day.</p>
                  <button className="px-5 py-2 bg-kora-500 text-white rounded-full text-xs font-medium">View Menu</button>
                </div>
                <div className="px-6 py-10">
                  <h2 className="text-lg font-bold text-center mb-5 text-gray-900">Our Gallery</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80" className="rounded-lg w-full h-40 object-cover" alt="Coffee" />
                    <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80" className="rounded-lg w-full h-40 object-cover" alt="Cafe" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
