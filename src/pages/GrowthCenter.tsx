import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Target,
  Wallet,
  Store,
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
  MessageCircle,
  Share2,
  Calendar,
  Loader2 } from
'lucide-react';
export function GrowthCenter() {
  const [step, setStep] = useState<'input' | 'generating' | 'results'>('input');
  const [goal, setGoal] = useState('Get More Customers');
  const [budget, setBudget] = useState('10,000');
  const [businessType, setBusinessType] = useState('Cafe');
  const handleGenerate = () => {
    setStep('generating');
    // Simulate AI generation delay
    setTimeout(() => {
      setStep('results');
    }, 3500);
  };
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-kora-400 to-kora-600 text-white mb-4 shadow-glow">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Growth Center</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Tell AI what you want to achieve, and it will instantly generate a
          complete, multi-channel marketing campaign tailored to your business.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'input' &&
        <motion.div
          key="input"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          className="bg-white rounded-3xl p-8 shadow-soft-lg border border-gray-100 max-w-2xl mx-auto">
          
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-kora-500" /> What is your main
                  goal?
                </label>
                <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kora-500/20 focus:border-kora-500 outline-none transition-all text-gray-900">
                
                  <option>Get More Customers</option>
                  <option>Promote a New Product</option>
                  <option>Increase Weekend Sales</option>
                  <option>Build Brand Awareness</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-kora-500" /> Budget (RWF)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    RWF
                  </span>
                  <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-4 pl-14 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kora-500/20 focus:border-kora-500 outline-none transition-all text-gray-900"
                  placeholder="e.g. 10,000" />
                
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Store className="w-4 h-4 text-kora-500" /> Business Type
                </label>
                <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-kora-500/20 focus:border-kora-500 outline-none transition-all text-gray-900"
                placeholder="e.g. Cafe, Salon, Retail" />
              
              </div>

              <button
              onClick={handleGenerate}
              className="w-full py-4 bg-gradient-to-r from-kora-500 to-kora-600 hover:from-kora-600 hover:to-kora-700 text-white font-bold rounded-xl shadow-glow transition-all flex items-center justify-center gap-2 text-lg mt-8">
              
                <Sparkles className="w-5 h-5" /> Generate Growth Plan
              </button>
            </div>
          </motion.div>
        }

        {step === 'generating' &&
        <motion.div
          key="generating"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="flex flex-col items-center justify-center py-20">
          
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-kora-500 border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-kora-500">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              AI is working its magic...
            </h2>
            <div className="text-gray-500 h-6 overflow-hidden">
              <motion.div
              animate={{
                y: [0, -24, -48, -72]
              }}
              transition={{
                duration: 3,
                ease: 'linear',
                repeat: Infinity
              }}
              className="flex flex-col">
              
                <span className="h-6">Analyzing your business profile...</span>
                <span className="h-6">Designing promotional posters...</span>
                <span className="h-6">Writing WhatsApp copy...</span>
                <span className="h-6">Structuring weekly plan...</span>
              </motion.div>
            </div>
          </motion.div>
        }

        {step === 'results' &&
        <motion.div
          key="results"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="space-y-8">
          
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-1">
                  Your Growth Plan is Ready!
                </h3>
                <p className="text-green-800">
                  We've created a comprehensive campaign to help your{' '}
                  {businessType} achieve "{goal}" with a budget of {budget} RWF.
                </p>
              </div>
              <button
              onClick={() => setStep('input')}
              className="ml-auto px-4 py-2 bg-white border border-green-200 text-green-700 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
              
                Start Over
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Posters */}
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    AI Generated Posters
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden relative group">
                    <img
                    src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=300&q=80"
                    alt="Coffee"
                    className="w-full h-full object-cover" />
                  
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden relative group">
                    <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80"
                    alt="Cafe interior"
                    className="w-full h-full object-cover" />
                  
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors">
                  View All Designs
                </button>
              </div>

              {/* WhatsApp Campaign */}
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    WhatsApp Broadcast
                  </h3>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4 relative">
                  <p className="text-gray-800 text-sm whitespace-pre-line">
                    ☕ *Hey Coffee Lovers!* 👋 Need a mid-week boost? We've got
                    you covered! Show this message at Sunny Cafe today and get
                    *20% OFF* any pastry when you buy a large coffee. 🥐☕ Tap
                    here to see our menu: 👉 kora.ai/sunnycafe See you soon! ✨
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" /> Send Now
                  </button>
                  <button className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors">
                    Edit
                  </button>
                </div>
              </div>

              {/* Weekly Plan */}
              <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Weekly Promotion Plan
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="w-16 text-center shrink-0">
                      <span className="block text-xs font-bold text-gray-400 uppercase">
                        Day 1
                      </span>
                      <span className="block text-lg font-bold text-gray-900">
                        Mon
                      </span>
                    </div>
                    <div className="w-px bg-gray-200"></div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Launch Teaser on Instagram
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Post the first AI generated poster to build anticipation
                        for the weekend offer.
                      </p>
                    </div>
                    <button className="ml-auto self-center px-4 py-2 bg-kora-50 text-kora-600 rounded-lg text-sm font-medium">
                      Schedule
                    </button>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="w-16 text-center shrink-0">
                      <span className="block text-xs font-bold text-gray-400 uppercase">
                        Day 3
                      </span>
                      <span className="block text-lg font-bold text-gray-900">
                        Wed
                      </span>
                    </div>
                    <div className="w-px bg-gray-200"></div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Send WhatsApp Broadcast
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Send the generated message to your top 100 customers
                        with the special link.
                      </p>
                    </div>
                    <button className="ml-auto self-center px-4 py-2 bg-kora-50 text-kora-600 rounded-lg text-sm font-medium">
                      Schedule
                    </button>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="w-16 text-center shrink-0">
                      <span className="block text-xs font-bold text-gray-400 uppercase">
                        Day 5
                      </span>
                      <span className="block text-lg font-bold text-gray-900">
                        Fri
                      </span>
                    </div>
                    <div className="w-px bg-gray-200"></div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Run Facebook Ad (Budget: 10k RWF)
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Boost the promotional video targeting people within 5km
                        of your location.
                      </p>
                    </div>
                    <button className="ml-auto self-center px-4 py-2 bg-kora-50 text-kora-600 rounded-lg text-sm font-medium">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}