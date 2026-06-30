import { Router } from 'express';
import { db } from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/stats', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const rows = db.all('analytics_daily', (a) => a.company_id === companyId);
  const total = {
    revenue: rows.reduce((s, r) => s + (r.revenue || 0), 0),
    visits: rows.reduce((s, r) => s + (r.visits || 0), 0),
    qr: rows.reduce((s, r) => s + (r.qr_scans || 0), 0),
    leads: rows.reduce((s, r) => s + (r.leads || 0), 0),
  };

  res.json({
    totalRevenue: total.revenue,
    websiteVisits: total.visits,
    qrScans: total.qr,
    newLeads: total.leads,
  });
});

router.get('/traffic', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const rows = db.all('analytics_daily', (a) => a.company_id === companyId)
    .sort((a, b) => a.date < b.date ? -1 : 1)
    .slice(-7)
    .map(r => ({ day: r.date, visits: r.visits }));
  res.json(rows);
});

router.get('/conversions', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const rows = db.all('analytics_daily', (a) => a.company_id === companyId);
  const v = rows.reduce((s, r) => s + (r.visits || 0), 0);
  const q = rows.reduce((s, r) => s + (r.qr_scans || 0), 0);
  const l = rows.reduce((s, r) => s + (r.leads || 0), 0);
  const total = v + q + l || 1;

  res.json([
    { label: 'Website Visits', value: Math.round((v / total) * 100), color: '#F97316' },
    { label: 'QR Scans', value: Math.round((q / total) * 100), color: '#8B5CF6' },
    { label: 'New Leads', value: Math.round((l / total) * 100), color: '#10B981' },
  ]);
});

export default router;
