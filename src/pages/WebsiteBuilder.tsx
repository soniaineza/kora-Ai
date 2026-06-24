import React, { useState } from 'react';
import {
  Globe,
  Palette,
  Image as ImageIcon,
  Sparkles,
  LayoutTemplate,
  Upload,
  Eye,
  CheckCircle2 } from
'lucide-react';
export function WebsiteBuilder() {
  const [activeTab, setActiveTab] = useState('details');
  const [isGenerating, setIsGenerating] = useState(false);
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Website Builder
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Design and publish your professional online presence.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center gap-2">
            <Globe className="w-4 h-4" /> Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-2 border-b border-gray-100 dark:border-gray-800 flex overflow-x-auto kora-scroll">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${activeTab === 'details' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                
                Details
              </button>
              <button
                onClick={() => setActiveTab('theme')}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${activeTab === 'theme' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                
                Theme
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${activeTab === 'media' ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                
                Media
              </button>
            </div>

            <div className="p-5">
              {activeTab === 'details' &&
              <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Business Name
                    </label>
                    <input
                    type="text"
                    defaultValue="Sunny Cafe"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-kora-500/20 text-gray-900 dark:text-gray-100" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tagline
                    </label>
                    <input
                    type="text"
                    defaultValue="Best coffee in town"
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-kora-500/20 text-gray-900 dark:text-gray-100" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      About Us
                    </label>
                    <textarea
                    rows={4}
                    defaultValue="We serve freshly brewed coffee and homemade pastries every day."
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-kora-500/20 text-gray-900 dark:text-gray-100 resize-none">
                  </textarea>
                  </div>
                </div>
              }

              {activeTab === 'theme' &&
              <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <LayoutTemplate className="w-4 h-4" /> Select Theme
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border-2 border-kora-500 rounded-xl overflow-hidden cursor-pointer">
                        <div className="h-20 bg-gray-100 dark:bg-gray-800 p-2">
                          <div className="w-full h-full bg-white dark:bg-gray-700 rounded shadow-sm"></div>
                        </div>
                        <div className="p-2 text-center text-xs font-medium bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                          Modern
                        </div>
                      </div>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                        <div className="h-20 bg-gray-100 dark:bg-gray-800 p-2">
                          <div className="w-full h-full bg-white dark:bg-gray-700 rounded shadow-sm"></div>
                        </div>
                        <div className="p-2 text-center text-xs font-medium bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                          Classic
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Palette className="w-4 h-4" /> Brand Color
                    </label>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-kora-500 ring-2 ring-offset-2 ring-kora-500 dark:ring-offset-gray-900 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-emerald-500 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white cursor-pointer border border-gray-200 dark:border-gray-700"></div>
                    </div>
                  </div>
                </div>
              }

              {activeTab === 'media' &&
              <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Logo
                    </label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                      <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Upload Logo
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 2MB
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gallery Images
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img
                        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=150&q=80"
                        alt="Gallery"
                        className="w-full h-full object-cover" />
                      
                      </div>
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=150&q=80"
                        alt="Gallery"
                        className="w-full h-full object-cover" />
                      
                      </div>
                      <div className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <div className="bg-gradient-to-br from-kora-50 to-orange-50 dark:from-kora-900/20 dark:to-orange-900/10 rounded-2xl p-6 border border-kora-100 dark:border-kora-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-kora-500 flex items-center justify-center text-white shadow-glow">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                AI Generate
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Let AI build a complete, beautiful website based on your business
              profile in seconds.
            </p>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-2.5 bg-kora-500 hover:bg-kora-600 text-white font-medium rounded-xl shadow-glow transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
              
              {isGenerating ?
              <>
                  <Sparkles className="w-4 h-4 animate-spin" /> Generating...
                </> :

              <>
                  <Sparkles className="w-4 h-4" /> Generate Website
                </>
              }
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-4 h-[600px] flex flex-col border border-gray-300 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="mx-auto bg-white dark:bg-gray-900 text-xs text-gray-500 dark:text-gray-400 px-4 py-1 rounded-full flex items-center gap-2">
                <Globe className="w-3 h-3" /> sunnycafe.kora.site
              </div>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-sm relative">
              {isGenerating ?
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-10">
                  <Sparkles className="w-8 h-8 text-kora-500 animate-pulse mb-4" />
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    Designing your site...
                  </p>
                </div> :
              null}

              {/* Mock Website Preview */}
              <div className="h-full overflow-y-auto kora-scroll">
                <header className="px-8 py-6 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
                  <div className="font-bold text-xl text-gray-900 dark:text-gray-100">
                    Sunny Cafe
                  </div>
                  <nav className="flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <span>Home</span>
                    <span>Menu</span>
                    <span>About</span>
                    <span>Contact</span>
                  </nav>
                </header>
                <div className="px-8 py-20 text-center bg-gray-50 dark:bg-gray-900">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Best coffee in town
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                    We serve freshly brewed coffee and homemade pastries every
                    day.
                  </p>
                  <button className="px-6 py-3 bg-kora-500 text-white rounded-full font-medium">
                    View Menu
                  </button>
                </div>
                <div className="px-8 py-16">
                  <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                    Our Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80"
                      className="rounded-xl w-full h-48 object-cover"
                      alt="Coffee" />
                    
                    <img
                      src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80"
                      className="rounded-xl w-full h-48 object-cover"
                      alt="Cafe" />
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}