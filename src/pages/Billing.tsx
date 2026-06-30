import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Download, CreditCard, Zap, Loader2 } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { billingApi } from '../api/billing';
import { useToast } from '../hooks/useToast';

export function Billing() {
  const { data: plansData, loading } = useApi(() => billingApi.getPlans());
  const { data: invoicesData } = useApi(() => billingApi.getInvoices());
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { toast } = useToast();

  if (loading) {
    return <div className="flex items-center justify-center py-32"><Loader2 className="w-5 h-5 text-silver animate-spin" /></div>;
  }

  const plans = plansData || [];
  const invoices = invoicesData || [];

  return (
    <div className="pb-12">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-charcoal tracking-tight">Billing & Plans</h1>
        <p className="text-sm text-silver mt-0.5">Manage your subscription and choose the plan that fits your business.</p>
      </div>

      <div className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cream flex items-center justify-center text-charcoal">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-silver">Current Plan</p>
            <p className="text-sm font-bold text-charcoal">Business · 15,000 RWF / month</p>
          </div>
        </div>
        <div className="text-xs text-muted">
          Renews on <span className="font-medium text-charcoal">Jul 1, 2026</span>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-cream p-0.5 rounded-2xl">
          <button onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 text-xs font-medium rounded-2xl transition-colors ${billingCycle === 'monthly' ? 'bg-white text-charcoal shadow-premium-sm' : 'text-silver'}`}>Monthly</button>
          <button onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-1.5 text-xs font-medium rounded-2xl transition-colors flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'bg-white text-charcoal shadow-premium-sm' : 'text-silver'}`}>
            Yearly
            <span className="badge bg-cream text-charcoal">-20%</span>
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
            className={`card p-5 flex flex-col relative ${
              plan.highlight ? 'ring-1 ring-gold-500 shadow-premium-lg' : ''
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-charcoal text-white gap-1 shadow-premium-sm">
                <Sparkles className="w-2.5 h-2.5 text-gold-500" /> Most Popular
              </span>
            )}
            <h3 className={`text-sm font-bold ${plan.highlight ? 'text-charcoal' : 'text-charcoal'}`}>{plan.name}</h3>
            <p className={`text-xs mt-1 mb-3 text-silver`}>{plan.description}</p>
            <div className="mb-4">
              <span className={`text-2xl font-bold text-charcoal`}>
                {plan.price === 'Custom' ? 'Custom' : `${plan.price}`}
              </span>
              {plan.price !== 'Custom' && plan.price !== '0' && (
                <span className={`text-xs ml-0.5 text-silver`}>RWF</span>
              )}
              <span className={`block text-[10px] mt-0.5 text-muted`}>{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-5 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-1.5">
                  <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 text-gold-500`} />
                  <span className={`text-xs text-silver`}>{f}</span>
                </li>
              ))}
            </ul>
            <button
              disabled={plan.current}
              onClick={() => { if (!plan.current) toast(`Upgraded to ${plan.name} plan`, 'success'); }}
              className={`w-full py-2.5 text-xs font-medium rounded-2xl transition-all ${
                plan.current ? 'bg-cream text-muted cursor-default' :
                plan.highlight ? 'btn-primary' :
                'btn-secondary'
              }`}>
              {plan.current ? 'Current Plan' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-charcoal mb-3">Payment Method</h3>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-cream">
            <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center text-silver shadow-premium-sm">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-charcoal">MoMo •••• 4567</p>
              <p className="text-xs text-muted">MTN Mobile Money</p>
            </div>
          </div>
          <button onClick={() => toast('Payment method update form opened', 'success')} className="w-full mt-3 py-2 bg-cream hover:bg-hover text-silver text-xs font-medium rounded-2xl transition-colors">
            Update Payment Method
          </button>
        </div>

        <div className="lg:col-span-2 card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-charcoal">Invoice History</h3>
          </div>
          <div className="divide-y divide-border">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-4 py-3 hover:bg-cream transition-colors">
                <div>
                  <p className="text-sm font-medium text-charcoal">{inv.id}</p>
                  <p className="text-xs text-muted">{inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-charcoal">{inv.amount}</span>
                  <span className="badge bg-green-50 text-green-700">{inv.status}</span>
                  <button className="p-1 text-muted hover:text-charcoal rounded-xl hover:bg-hover transition-colors">
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
