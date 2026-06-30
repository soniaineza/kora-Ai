import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Store, Sparkles, ArrowRight, Building2, Phone, MapPin, Globe, FileText, Palette, Check, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

const businessTypes = [
  'Cafe', 'Restaurant', 'Retail Shop', 'Salon & Spa', 'Bakery',
  'Bar & Lounge', 'Hotel', 'Gym & Fitness', 'Service Business', 'Other',
];

const brandColors = ['#111111', '#D4AF37', '#EF4444', '#8B5CF6', '#3B82F6', '#10B981'];

const industryOptions = [
  'Food & Beverage', 'Retail', 'Hospitality', 'Health & Beauty',
  'Fitness', 'Technology', 'Services', 'Entertainment', 'Other',
];

export function CompanyRegistration() {
  const { registerCompany, company } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    type: '',
    industry: '',
    description: '',
    phone: '',
    address: '',
    website: '',
    logo: '',
    brandColor: '#D4AF37',
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.type) {
      toast('Please fill in the business name and type.', 'error');
      return;
    }
    registerCompany(form);
    toast('Business registered successfully!', 'success');
    navigate('/');
  }

  if (company) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[520px]"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-charcoal mb-3">
            <Store className="w-6 h-6 text-gold-500" />
          </div>
          <h1 className="text-xl font-bold text-charcoal tracking-tight">Register Your Business</h1>
          <p className="text-sm text-silver mt-0.5">Set up your company profile to get started</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-2xl flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s ? 'bg-charcoal text-white' : 'bg-border text-muted'
              }`}>
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
              <span className={`text-xs ${step >= s ? 'text-charcoal font-medium' : 'text-muted'}`}>
                {s === 1 ? 'Business Info' : 'Details'}
              </span>
              {s < 2 && <ChevronRight className="w-3.5 h-3.5 text-muted" />}
            </div>
          ))}
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div>
                  <label className="label">Business Name <span className="text-muted">*</span></label>
                  <div className="relative">
                    <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="e.g. Sunny Cafe"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Business Type <span className="text-muted">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    {businessTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update('type', t)}
                        className={`px-3.5 py-2.5 rounded-2xl text-xs font-medium border transition-all text-left ${
                          form.type === t
                            ? 'bg-charcoal text-white border-charcoal'
                            : 'bg-white text-silver border-border hover:border-silver hover:text-charcoal'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="label">Industry</label>
                  <select
                    value={form.industry}
                    onChange={(e) => update('industry', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select industry...</option>
                    {industryOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Description</label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3 w-4 h-4 text-muted" />
                    <textarea
                      value={form.description}
                      onChange={(e) => update('description', e.target.value)}
                      placeholder="Tell us about your business..."
                      rows={3}
                      className="input-field pl-10 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-charcoal text-white text-sm font-medium rounded-2xl hover:bg-charcoal/80 transition-all flex items-center justify-center gap-2"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div>
                  <label className="label">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+250 788 123 456"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => update('address', e.target.value)}
                      placeholder="Kigali, Rwanda"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => update('website', e.target.value)}
                      placeholder="https://sunnycafe.com"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Brand Color</label>
                  <div className="flex gap-2">
                    {brandColors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => update('brandColor', c)}
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                          form.brandColor === c ? 'ring-2 ring-offset-2 ring-charcoal scale-110' : ''
                        }`}
                        style={{ backgroundColor: c }}
                      >
                        {form.brandColor === c && <Check className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 bg-white border border-border text-silver text-sm font-medium rounded-2xl hover:bg-hover transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-charcoal text-white text-sm font-medium rounded-2xl hover:bg-charcoal/80 transition-all flex items-center justify-center gap-2"
                  >
                    Complete Setup <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}
