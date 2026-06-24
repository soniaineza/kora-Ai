import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Download, CreditCard, Zap } from 'lucide-react';
interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
  current?: boolean;
}
const plans: Plan[] = [
{
  name: 'Free',
  price: '0',
  period: 'forever',
  description: 'For getting started online.',
  features: [
  '1 QR Menu',
  'Basic website',
  '5 AI posters / month',
  'Community support']

},
{
  name: 'Business',
  price: '15,000',
  period: 'per month',
  description: 'For growing local businesses.',
  features: [
  'Everything in Free',
  'Unlimited QR menus',
  'WhatsApp catalog',
  '50 AI posters / month',
  '10 promo videos / month',
  'Email support'],

  current: true
},
{
  name: 'Premium',
  price: '35,000',
  period: 'per month',
  description: 'For businesses scaling fast.',
  features: [
  'Everything in Business',
  'Unlimited AI generations',
  'Growth Center campaigns',
  'Advanced analytics',
  'Social scheduler',
  'Priority support'],

  highlight: true
},
{
  name: 'Enterprise',
  price: 'Custom',
  period: 'contact us',
  description: 'For multi-location brands.',
  features: [
  'Everything in Premium',
  'Multiple locations',
  'Team roles & permissions',
  'Dedicated manager',
  'Custom integrations',
  'SLA & onboarding']

}];

const invoices = [
{
  id: 'INV-2026-006',
  date: 'Jun 1, 2026',
  amount: '15,000 RWF',
  status: 'Paid'
},
{
  id: 'INV-2026-005',
  date: 'May 1, 2026',
  amount: '15,000 RWF',
  status: 'Paid'
},
{
  id: 'INV-2026-004',
  date: 'Apr 1, 2026',
  amount: '15,000 RWF',
  status: 'Paid'
},
{
  id: 'INV-2026-003',
  date: 'Mar 1, 2026',
  amount: '15,000 RWF',
  status: 'Paid'
}];

export function Billing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Billing & Plans
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your subscription and choose the plan that fits your business.
        </p>
      </div>

      {/* Current plan banner */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-kora-50 dark:bg-kora-500/10 flex items-center justify-center text-kora-600 dark:text-kora-500">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current Plan
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Business · 15,000 RWF / month
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Renews on{' '}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            Jul 1, 2026
          </span>
        </div>
      </div>

      {/* Billing cycle toggle */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${billingCycle === 'monthly' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>
            
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>
            
            Yearly
            <span className="text-xs bg-kora-100 dark:bg-kora-500/20 text-kora-600 dark:text-kora-400 px-1.5 py-0.5 rounded-full">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan, i) =>
        <motion.div
          key={plan.name}
          initial={{
            opacity: 0,
            y: 16
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.06
          }}
          className={`relative rounded-2xl p-6 flex flex-col border transition-shadow ${plan.highlight ? 'bg-gray-900 dark:bg-gray-800 border-gray-900 dark:border-kora-500/40 text-white shadow-soft-lg ring-2 ring-kora-500' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 shadow-soft'}`}>
          
            {plan.highlight &&
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 bg-kora-500 text-white text-xs font-semibold rounded-full shadow-glow">
                <Sparkles className="w-3 h-3" /> Most Popular
              </span>
          }
            <h3
            className={`text-lg font-bold ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
            
              {plan.name}
            </h3>
            <p
            className={`text-sm mt-1 mb-4 ${plan.highlight ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
            
              {plan.description}
            </p>
            <div className="mb-6">
              <span
              className={`text-3xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
              
                {plan.price === 'Custom' ? 'Custom' : `${plan.price}`}
              </span>
              {plan.price !== 'Custom' && plan.price !== '0' &&
            <span
              className={`text-sm ml-1 ${plan.highlight ? 'text-gray-400' : 'text-gray-500'}`}>
              
                  RWF
                </span>
            }
              <span
              className={`block text-xs mt-1 ${plan.highlight ? 'text-gray-400' : 'text-gray-400'}`}>
              
                {plan.period}
              </span>
            </div>
            <ul className="space-y-3 mb-6 flex-1">
              {plan.features.map((f) =>
            <li key={f} className="flex items-start gap-2 text-sm">
                  <Check
                className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-kora-400' : 'text-kora-500'}`} />
              
                  <span
                className={
                plan.highlight ?
                'text-gray-200' :
                'text-gray-600 dark:text-gray-300'
                }>
                
                    {f}
                  </span>
                </li>
            )}
            </ul>
            <button
            disabled={plan.current}
            className={`w-full py-2.5 font-medium rounded-xl transition-colors text-sm ${plan.current ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-default' : plan.highlight ? 'bg-kora-500 hover:bg-kora-600 text-white shadow-glow' : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90'}`}>
            
              {plan.current ?
            'Current Plan' :
            plan.name === 'Enterprise' ?
            'Contact Sales' :
            'Upgrade'}
            </button>
          </motion.div>
        )}
      </div>

      {/* Payment method + invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Payment Method
          </h3>
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                MoMo •••• 4567
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MTN Mobile Money
              </p>
            </div>
          </div>
          <button className="w-full mt-4 py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-xl transition-colors">
            Update Payment Method
          </button>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Invoice History
            </h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {invoices.map((inv) =>
            <div
              key={inv.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {inv.id}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {inv.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {inv.amount}
                  </span>
                  <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-full">
                    {inv.status}
                  </span>
                  <button
                  className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label={`Download ${inv.id}`}>
                  
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}