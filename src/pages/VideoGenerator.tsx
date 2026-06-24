import React, { useState } from 'react';
import {
  Video,
  Sparkles,
  Play,
  Download,
  Share2,
  Smartphone } from
'lucide-react';
export function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 4000);
  };
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Video Generator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Create engaging short-form videos for social media.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Generate Video
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What is the video about?
                </label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A quick behind-the-scenes look at how we make our signature latte, ending with a call to action to visit us."
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-kora-500/20 text-gray-900 dark:text-gray-100 resize-none">
                </textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-3 border border-kora-500 bg-kora-50 dark:bg-kora-500/10 rounded-xl cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      defaultChecked
                      className="text-kora-500 focus:ring-kora-500" />
                    
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      TikTok / Reels
                    </span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <input
                      type="radio"
                      name="format"
                      className="text-kora-500 focus:ring-kora-500" />
                    
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      YouTube (16:9)
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Voiceover Style
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-sm text-gray-900 dark:text-gray-100">
                  <option>Energetic & Upbeat</option>
                  <option>Calm & Professional</option>
                  <option>Trendy & Casual</option>
                  <option>No Voiceover (Music Only)</option>
                </select>
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
                    <Sparkles className="w-4 h-4" /> Generate Video
                  </>
                }
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 min-h-[600px] flex items-center justify-center">
            {!generated && !isGenerating ?
            <div className="text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-300 dark:text-gray-600 mb-4 shadow-sm mx-auto">
                  <Video className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                  Ready to create
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  Describe your video idea and we'll generate a ready-to-post
                  short form video.
                </p>
              </div> :
            isGenerating ?
            <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-kora-500 border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-kora-500">
                    <Video className="w-6 h-6 animate-pulse" />
                  </div>
                </div>
                <p className="text-gray-900 dark:text-gray-100 font-medium text-lg mb-2">
                  Rendering your video...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Adding transitions and syncing audio
                </p>
              </div> :

            <div className="w-full max-w-sm mx-auto">
                <div className="bg-black rounded-[2rem] p-2 shadow-xl relative border-4 border-gray-800">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-10"></div>
                  <div className="aspect-[9/16] bg-gray-900 rounded-[1.5rem] overflow-hidden relative group">
                    <img
                    src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover opacity-80" />
                  
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors group-hover:scale-110 duration-300">
                        <Play className="w-6 h-6 ml-1" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-medium text-sm">
                        Sunny Cafe Signature Latte ✨☕️
                      </p>
                      <p className="text-white/70 text-xs mt-1">
                        #coffee #cafe #latteart
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button className="flex-1 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}