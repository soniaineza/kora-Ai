import { useState } from 'react';
import { Image as ImageIcon, Sparkles, Download, Share2, Palette, Layout } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const posterStyles = ['Modern', 'Minimalist', 'Bold', 'Elegant'];
const formats = [
  { label: 'Instagram (1:1)', aspect: '1/1', w: 400, h: 400 },
  { label: 'Story (9:16)', aspect: '9/16', w: 360, h: 640 },
  { label: 'Print (A4)', aspect: '3/4', w: 400, h: 533 },
];

export function PosterGenerator() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Modern');
  const [format, setFormat] = useState(formats[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<{ title: string; imageUrl: string }[]>([]);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setGenerated([]);

    const keywords = prompt.toLowerCase().split(' ').filter(w => w.length > 2).slice(0, 5);
    const seed = keywords.join('-') || 'promo';

    setTimeout(() => {
      const results = [];
      const titles = [
        `${style} ${prompt.slice(0, 30)}`,
        `Limited Offer - ${prompt.slice(0, 20)}`,
        'Weekend Special Deal',
        'New Collection Alert',
        'Flash Sale - Today Only',
        'Exclusive Member Offer',
        'Seasonal Promotion',
        'Buy More Save More',
      ];
      for (let i = 0; i < 8; i++) {
        results.push({
          title: titles[i % titles.length],
          imageUrl: `https://picsum.photos/seed/${seed}-${i}-${Date.now()}/${format.w}/${format.h}`,
        });
      }
      setGenerated(results);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="pb-12">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-charcoal tracking-tight">Poster Generator</h1>
        <p className="text-sm text-silver mt-0.5">Create stunning promotional graphics in seconds with AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-5">
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-charcoal mb-3">Generate New</h2>
            <div className="space-y-3.5">
              <div>
                <label className="label">What's the promotion?</label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Weekend special: Buy 1 Get 1 Free on all large coffees."
                  className="input-field resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="label flex items-center gap-1"><Palette className="w-3 h-3" /> Style</label>
                  <select value={style} onChange={(e) => setStyle(e.target.value)} className="input-field">
                    {posterStyles.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label flex items-center gap-1"><Layout className="w-3 h-3" /> Format</label>
                  <select
                    value={format.label}
                    onChange={(e) => setFormat(formats.find(f => f.label === e.target.value) || formats[0])}
                    className="input-field"
                  >
                    {formats.map(f => <option key={f.label}>{f.label}</option>)}
                  </select>
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="w-full py-2.5 bg-charcoal text-white text-sm font-medium rounded-2xl hover:bg-charcoal/80 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60 mt-1"
              >
                {isGenerating ? <><Sparkles className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate Posters</>}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card p-6 min-h-[480px]">
            {!isGenerating && generated.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-silver mb-3">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-medium text-charcoal mb-1">No posters generated yet</h3>
                <p className="text-xs text-silver max-w-xs">Enter a prompt on the left and click generate to create beautiful promotional graphics.</p>
              </div>
            ) : isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center py-16">
                <Sparkles className="w-8 h-8 text-gold-500 animate-pulse mb-3" />
                <p className="text-sm text-charcoal font-medium">Designing your posters...</p>
                <p className="text-xs text-silver mt-1">Applying {style} style, {format.label} format</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-charcoal">Generated Options ({generated.length})</h3>
                  <button
                    onClick={handleGenerate}
                    className="text-xs text-silver hover:text-charcoal font-medium flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Regenerate
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {generated.map((poster, i) => (
                    <div key={i} className="bg-cream rounded-2xl overflow-hidden border border-border group">
                      <div style={{ aspectRatio: format.aspect }} className="relative">
                        <img
                          src={poster.imageUrl}
                          alt={poster.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button onClick={() => toast('Poster downloaded', 'success')} className="p-2 bg-white text-charcoal rounded-full hover:bg-hover transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button onClick={() => toast('Poster link copied', 'success')} className="p-2 bg-white text-charcoal rounded-full hover:bg-hover transition-colors" title="Share">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs font-medium text-charcoal truncate">{poster.title}</p>
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
