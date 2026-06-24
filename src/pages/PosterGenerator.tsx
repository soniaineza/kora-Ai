import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Download,
  Share2,
  Palette,
  Layout } from
'lucide-react';
export function PosterGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 3000);
  };
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Poster Generator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Create stunning promotional graphics in seconds with AI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Generate New
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What's the promotion?
                </label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Weekend special: Buy 1 Get 1 Free on all large coffees. Valid this Saturday and Sunday only."
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-kora-500/20 text-gray-900 dark:text-gray-100 resize-none">
                </textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <Palette className="w-3 h-3" /> Style
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm text-gray-900 dark:text-gray-100">
                    <option>Modern</option>
                    <option>Minimalist</option>
                    <option>Bold</option>
                    <option>Elegant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <Layout className="w-3 h-3" /> Format
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm text-gray-900 dark:text-gray-100">
                    <option>Instagram (1:1)</option>
                    <option>Story (9:16)</option>
                    <option>Print (A4)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="w-full py-3 bg-kora-500 hover:bg-kora-600 text-white font-medium rounded-xl shadow-glow transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-2">
                
                {isGenerating ?
                <>
                    <Sparkles className="w-4 h-4 animate-spin" /> Generating...
                  </> :

                <>
                    <Sparkles className="w-4 h-4" /> Generate Posters
                  </>
                }
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 min-h-[500px]">
            {!generated && !isGenerating ?
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-300 dark:text-gray-600 mb-4 shadow-sm">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                  No posters generated yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  Enter a prompt on the left and click generate to create
                  beautiful promotional graphics.
                </p>
              </div> :
            isGenerating ?
            <div className="h-full flex flex-col items-center justify-center py-20">
                <Sparkles className="w-10 h-10 text-kora-500 animate-pulse mb-4" />
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  Designing your posters...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Applying brand colors and typography
                </p>
              </div> :

            <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Generated Options
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2].map((i) =>
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group">
                  
                      <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
                        <img
                      src={`https://images.unsplash.com/photo-${i === 1 ? '1497935586351-b67a49e012bf' : '1554118811-1e0d58224f24'}?auto=format&fit=crop&w=400&q=80`}
                      alt="Generated Poster"
                      className="w-full h-full object-cover" />
                    
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button
                        className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                        title="Download">
                        
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                        className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                        title="Share">
                        
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Option {i}
                        </span>
                        <button className="text-xs font-medium text-kora-600 dark:text-kora-500 hover:text-kora-700">
                          Edit
                        </button>
                      </div>
                    </div>
                )}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}