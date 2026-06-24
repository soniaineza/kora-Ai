import { useState } from 'react';
import { Video, Sparkles, Play, Download, Share2 } from 'lucide-react';

export function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => { setIsGenerating(false); setGenerated(true); }, 4000);
  };

  return (
    <div className="pb-12">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Video Generator</h1>
        <p className="text-sm text-gray-500 mt-0.5">Create engaging short-form videos for social media.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Generate Video</h2>
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">What is the video about?</label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A quick behind-the-scenes look at how we make our signature latte."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-kora-500/20 text-sm text-gray-900 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Platform Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-1.5 p-2.5 border border-kora-500 bg-kora-50 rounded-lg cursor-pointer">
                    <input type="radio" name="format" defaultChecked className="text-kora-500 focus:ring-kora-500" />
                    <span className="text-xs font-medium text-gray-900">TikTok / Reels</span>
                  </label>
                  <label className="flex items-center gap-1.5 p-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="format" className="text-kora-500 focus:ring-kora-500" />
                    <span className="text-xs font-medium text-gray-900">YouTube (16:9)</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Voiceover Style</label>
                <select className="w-full px-2.5 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-xs text-gray-900">
                  <option>Energetic & Upbeat</option>
                  <option>Calm & Professional</option>
                  <option>Trendy & Casual</option>
                  <option>No Voiceover (Music Only)</option>
                </select>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="w-full py-2.5 bg-kora-500 hover:bg-kora-600 text-white text-sm font-medium rounded-lg shadow-glow transition-colors flex items-center justify-center gap-1.5 disabled:opacity-70 mt-1"
              >
                {isGenerating ? <><Sparkles className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate Video</>}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-6 min-h-[560px] flex items-center justify-center">
            {!generated && !isGenerating ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-300 mb-3 shadow-sm mx-auto">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Ready to create</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">Describe your video idea and we'll generate a ready-to-post short form video.</p>
              </div>
            ) : isGenerating ? (
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full border-3 border-gray-200" />
                  <div className="absolute inset-0 rounded-full border-3 border-kora-500 border-t-transparent animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center text-kora-500">
                    <Video className="w-6 h-6 animate-pulse" />
                  </div>
                </div>
                <p className="text-sm text-gray-900 font-medium mb-1">Rendering your video...</p>
                <p className="text-xs text-gray-500">Adding transitions and syncing audio</p>
              </div>
            ) : (
              <div className="w-full max-w-xs mx-auto">
                <div className="bg-black rounded-[1.5rem] p-2 shadow-xl relative border-4 border-gray-800">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-800 rounded-b-xl z-10" />
                  <div className="aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80" alt="Video Thumbnail" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors group-hover:scale-110 duration-300">
                        <Play className="w-5 h-5 ml-0.5" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-xs font-medium">Sunny Cafe Signature Latte ✨☕️</p>
                      <p className="text-white/70 text-[10px] mt-0.5">#coffee #cafe #latteart</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
