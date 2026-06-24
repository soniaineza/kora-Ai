import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Download, CreditCard, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free', price: '0', period: 'forever',
    description: 'For getting started online.',
    features: ['1 QR Menu', 'Basic website', '5 AI posters / month', 'Community support'],
  },
  {
    name: 'Business', price: '15,000', period: 'per month',
    description: 'For growing local businesses.',
    features: [
      'Everything in Free', 'Unlimited QR menus', 'WhatsApp catalog',
      '50 AI posters / month', '10 promo videos / month', 'Email support',
    ],
    current: true,
  },
  {
    name: 'Premium', price: '35,000', period: 'per month',
    description: 'For businesses scaling fast.',
    features: [
      'Everything in Business', 'Unlimited AI generations', 'Growth Center campaigns',
      'Advanced analytics', 'Social scheduler', 'Priority support',
    ],
    highlight: true,
  },
  {
    name: 'Enterprise', price: 'Custom', period: 'contact us',
    description: 'For multi-location brands.',
    features: [
      'Everything in Premium', 'Multiple locations', 'Team roles & permissions',
      'Dedicated manager', 'Custom integrations', 'SLA & onboarding',
    ],
  },
];

const invoices = [
  { id: 'INV-2026-006', date: 'Jun 1, 2026', amount: '15,000 RWF', status: 'Paid' },
  { id: 'INV-2026-005', date: 'May 1, 2026', amount: '15,000 RWF', status: 'Paid' },
  { id: 'INV-2026-004', date: 'Apr 1, 2026', amount: '15,000 RWF', status: 'Paid' },
  { id: 'INV-2026-003', date: 'Mar 1, 2026', amount: '15,000 RWF', status: 'Paid' },
];

export function Billing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="pb-12">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Billing & Plans</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your subscription and choose the plan that fits your business.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-kora-50 flex items-center justify-center text-kora-600">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Current Plan</p>
            <p className="text-sm font-bold text-gray-900">Business · 15,000 RWF / month</p>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Renews on <span className="font-medium text-gray-900">Jul 1, 2026</span>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-100 p-0.5 rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            Yearly
            <span className="text-[10px] bg-kora-100 text-kora-600 px-1 py-0.5 rounded-full font-medium">-20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`relative rounded-xl p-5 flex flex-col border transition-shadow ${
              plan.highlight
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg ring-1 ring-kora-500'
                : 'bg-white border-gray-100 shadow-card'
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2.5 py-0.5 bg-kora-500 text-white text-[10px] font-semibold rounded-full shadow-glow">
                <Sparkles className="w-2.5 h-2.5" /> Most Popular
              </span>
            )}
            <h3 className={`text-sm font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
            <p className={`text-xs mt-1 mb-3 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>{plan.description}</p>
            <div className="mb-4">
              <span className={`text-2xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                {plan.price === 'Custom' ? 'Custom' : `${plan.price}`}
              </span>
              {plan.price !== 'Custom' && plan.price !== '0' && (
                <span className={`text-xs ml-0.5 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>RWF</span>
              )}
              <span className={`block text-[10px] mt-0.5 ${plan.highlight ? 'text-gray-500' : 'text-gray-400'}`}>{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-5 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-1.5">
                  <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${plan.highlight ? 'text-kora-400' : 'text-kora-500'}`} />
                  <span className={`text-xs ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>{f}</span>
                </li>
              ))}
            </ul>
            <button
              disabled={plan.current}
              className={`w-full py-2 text-xs font-medium rounded-lg transition-colors ${
                plan.current
                  ? 'bg-gray-100 text-gray-400 cursor-default'
                  : plan.highlight
                  ? 'bg-kora-500 hover:bg-kora-600 text-white shadow-glow'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {plan.current ? 'Current Plan' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Method</h3>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-gray-600 shadow-sm">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">MoMo •••• 4567</p>
              <p className="text-xs text-gray-500">MTN Mobile Money</p>
            </div>
          </div>
          <button className="w-full mt-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium rounded-lg transition-colors">
            Update Payment Method
          </button>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Invoice History</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{inv.id}</p>
                  <p className="text-xs text-gray-500">{inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">{inv.amount}</span>
                  <span className="text-[10px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{inv.status}</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors" aria-label={`Download ${inv.id}`}>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
