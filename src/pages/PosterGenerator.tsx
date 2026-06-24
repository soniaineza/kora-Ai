import { useState } from 'react';
import { Image as ImageIcon, Sparkles, Download, Share2, Palette, Layout } from 'lucide-react';

export function PosterGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => { setIsGenerating(false); setGenerated(true); }, 3000);
  };

  return (
    <div className="pb-12">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Poster Generator</h1>
        <p className="text-sm text-gray-500 mt-0.5">Create stunning promotional graphics in seconds with AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Generate New</h2>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">What's the promotion?</label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Weekend special: Buy 1 Get 1 Free on all large coffees."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Palette className="w-3 h-3" /> Style
                  </label>
                  <select className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-xs text-gray-900">
                    <option>Modern</option><option>Minimalist</option><option>Bold</option><option>Elegant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Layout className="w-3 h-3" /> Format
                  </label>
                  <select className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-xs text-gray-900">
                    <option>Instagram (1:1)</option><option>Story (9:16)</option><option>Print (A4)</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="w-full py-2.5 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors flex items-center justify-center gap-1.5 disabled:opacity-70 mt-1"
              >
                {isGenerating ? <><Sparkles className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate Posters</>}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 min-h-[480px]">
            {!generated && !isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-300 mb-3 shadow-sm">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">No posters generated yet</h3>
                <p className="text-xs text-gray-500 max-w-xs">Enter a prompt on the left and click generate to create beautiful promotional graphics.</p>
              </div>
            ) : isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center py-16">
                <Sparkles className="w-8 h-8 text-kora-500 animate-pulse mb-3" />
                <p className="text-sm text-gray-900 font-medium">Designing your posters...</p>
                <p className="text-xs text-gray-500 mt-1">Applying brand colors and typography</p>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Generated Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group">
                      <div className="aspect-square bg-gray-100 relative">
                        <img
                          src={`https://images.unsplash.com/photo-${i === 1 ? '1497935586351-b67a49e012bf' : '1554118811-1e0d58224f24'}?auto=format&fit=crop&w=400&q=80`}
                          alt="Generated Poster"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors" title="Share">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-2.5 flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-900">Option {i}</span>
                        <button className="text-[10px] font-medium text-kora-600 hover:text-kora-700">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
