import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Target, Wallet, Store,
  CheckCircle2, Image as ImageIcon, MessageCircle,
  Share2, Calendar,
} from 'lucide-react';
import { growthApi } from '../api/growth';

export function GrowthCenter() {
  const [step, setStep] = useState<'input' | 'generating' | 'results'>('input');
  const [goal, setGoal] = useState('Get More Customers');
  const [budget, setBudget] = useState('10,000');
  const [businessType, setBusinessType] = useState('Cafe');
  const [plan, setPlan] = useState<{
    goal: string; budget: string; businessType: string;
    posters: string[]; whatsappMessage: string;
    weeklyPlan: { day: string; title: string; description: string }[];
  } | null>(null);

  const handleGenerate = async () => {
    setStep('generating');
    const result = await growthApi.generatePlan({ goal, budget, businessType });
    if (result) {
      setPlan(result);
      setStep('results');
    } else {
      setStep('input');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-charcoal mb-3">
          <Sparkles className="w-6 h-6 text-gold-500" />
        </div>
        <h1 className="text-xl font-bold text-charcoal tracking-tight">Growth Center</h1>
        <p className="text-sm text-silver max-w-xl mx-auto">
          Tell AI what you want to achieve, and it will instantly generate a complete, multi-channel marketing campaign tailored to your business.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="card p-6 max-w-lg mx-auto"
          >
            <div className="space-y-5">
              <div>
                <label className="label flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-gold-500" /> What is your main goal?
                </label>
                <select value={goal} onChange={(e) => setGoal(e.target.value)} className="input-field">
                  <option>Get More Customers</option>
                  <option>Promote a New Product</option>
                  <option>Increase Weekend Sales</option>
                  <option>Build Brand Awareness</option>
                </select>
              </div>
              <div>
                <label className="label flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-gold-500" /> Budget (RWF)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm font-medium">RWF</span>
                  <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} className="input-field pl-12" />
                </div>
              </div>
              <div>
                <label className="label flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-gold-500" /> Business Type
                </label>
                <input type="text" value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="input-field" />
              </div>
              <button onClick={handleGenerate} className="w-full py-3 bg-charcoal text-white font-medium rounded-2xl hover:bg-charcoal/80 transition-all flex items-center justify-center gap-2 text-sm mt-2">
                <Sparkles className="w-4 h-4" /> Generate Growth Plan
              </button>
            </div>
          </motion.div>
        )}

        {step === 'generating' && (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16">
            <div className="relative w-16 h-16 mb-5">
              <div className="absolute inset-0 rounded-full border-3 border-border" />
              <div className="absolute inset-0 rounded-full border-3 border-charcoal border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-charcoal">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-charcoal mb-1.5">AI is working its magic...</h2>
            <div className="text-sm text-silver h-5 overflow-hidden">
              <motion.div animate={{ y: [0, -20, -40, -60] }} transition={{ duration: 3, ease: 'linear', repeat: Infinity }} className="flex flex-col">
                <span className="h-5">Analyzing your business profile...</span>
                <span className="h-5">Designing promotional posters...</span>
                <span className="h-5">Writing WhatsApp copy...</span>
                <span className="h-5">Structuring weekly plan...</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === 'results' && plan && (
          <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-3xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-green-900 mb-0.5">Your Growth Plan is Ready!</h3>
                <p className="text-xs text-green-800">
                  We've created a comprehensive campaign to help your {plan.businessType} achieve "{plan.goal}" with a budget of {plan.budget} RWF.
                </p>
              </div>
              <button onClick={() => setStep('input')} className="shrink-0 px-3 py-1.5 bg-white border border-green-200 text-green-700 rounded-2xl text-xs font-medium hover:bg-green-50 transition-colors">Start Over</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="card p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 bg-purple-50 text-purple-600 rounded-xl"><ImageIcon className="w-4 h-4" /></div>
                  <h3 className="text-sm font-bold text-charcoal">AI Generated Posters</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {plan.posters.map((src, i) => (
                    <div key={i} className="aspect-[4/5] bg-cream rounded-2xl overflow-hidden relative group">
                      <img src={src} alt="Poster" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                        <button className="px-3 py-1.5 bg-white text-charcoal rounded-2xl text-xs font-medium">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 bg-cream hover:bg-hover text-silver text-sm font-medium rounded-2xl transition-colors">View All Designs</button>
              </div>

              <div className="card p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-xl"><MessageCircle className="w-4 h-4" /></div>
                  <h3 className="text-sm font-bold text-charcoal">WhatsApp Broadcast</h3>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 mb-3">
                  <p className="text-xs text-charcoal whitespace-pre-line">{plan.whatsappMessage}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-charcoal hover:bg-charcoal/80 text-white text-sm font-medium rounded-2xl transition-colors flex items-center justify-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" /> Send Now
                  </button>
                  <button className="px-3 py-2.5 bg-cream hover:bg-hover text-silver text-sm font-medium rounded-2xl transition-colors">Edit</button>
                </div>
              </div>

              <div className="md:col-span-2 card p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl"><Calendar className="w-4 h-4" /></div>
                  <h3 className="text-sm font-bold text-charcoal">Weekly Promotion Plan</h3>
                </div>
                <div className="space-y-3">
                  {plan.weeklyPlan.map((item) => (
                    <div key={item.day} className="flex gap-3 p-3 rounded-2xl border border-border hover:bg-cream transition-colors">
                      <div className="w-12 text-center shrink-0">
                        <span className="block text-[10px] font-bold text-muted uppercase">Day</span>
                        <span className="block text-sm font-bold text-charcoal">{item.day}</span>
                      </div>
                      <div className="w-px bg-border" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-charcoal">{item.title}</h4>
                        <p className="text-xs text-silver mt-0.5">{item.description}</p>
                      </div>
                      <button className="shrink-0 self-center px-3 py-1.5 bg-cream text-charcoal rounded-2xl text-xs font-medium hover:bg-hover transition-colors">Schedule</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
