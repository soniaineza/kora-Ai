import { Router } from 'express';
import { db } from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/plans', authenticate, (_req, res) => {
  res.json([
    { name: 'Free', price: '0', period: 'month', description: 'For small businesses just getting started', features: ['Up to 100 contacts', '1 user', 'Basic analytics'], highlight: false },
    { name: 'Starter', price: '5,000', period: 'month', description: 'Essential tools to grow your business', features: ['Up to 1,000 contacts', '3 users', 'Campaign management', 'WhatsApp integration'], highlight: false },
    { name: 'Business', price: '15,000', period: 'month', description: 'Complete growth platform for growing businesses', features: ['Unlimited contacts', '5 users', 'All integrations', 'AI Assistant', 'Priority support'], highlight: true, current: true },
    { name: 'Premium', price: '35,000', period: 'month', description: 'For businesses ready to scale', features: ['Unlimited everything', 'Unlimited users', 'Dedicated account manager', 'Custom integrations', 'SMS marketing'], highlight: false },
  ]);
});

router.get('/invoices', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const rows = db.all('invoices', (i) => i.company_id === companyId)
    .sort((a, b) => a.date < b.date ? 1 : -1)
    .map(r => ({ id: r.id, date: r.date, amount: r.amount, status: r.status }));
  res.json(rows);
});

export default router;
