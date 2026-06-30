import { Router } from 'express';
import { db } from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/metrics', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  const todayData = db.get('analytics_daily', (a) => a.company_id === companyId && a.date === today);
  const yesterdayData = db.get('analytics_daily', (a) => a.company_id === companyId && a.date === yesterday);

  const tv = todayData?.visits || 0;
  const tq = todayData?.qr_scans || 0;
  const tl = todayData?.leads || 0;
  const tr = todayData?.revenue || 0;
  const yv = yesterdayData?.visits || 0;
  const yq = yesterdayData?.qr_scans || 0;
  const yl = yesterdayData?.leads || 0;
  const yr = yesterdayData?.revenue || 0;

  function trend(current, previous) {
    if (previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  }

  res.json({
    todayVisitors: tv, qrScans: tq, whatsappLeads: tl, revenueToday: tr,
    visitorsTrend: trend(tv, yv), qrTrend: trend(tq, yq),
    leadsTrend: trend(tl, yl), revenueTrend: trend(tr, yr),
  });
});

router.get('/health', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const items = db.all('health_items', (h) => h.company_id === companyId);
  const score = items.length > 0
    ? Math.round((items.filter(i => i.status === 'good').length / items.length) * 100)
    : 85;

  res.json({ score, items, suggestions: [] });
});

router.get('/activity', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const rows = db.all('activity_log', (a) => a.company_id === companyId)
    .reverse()
    .slice(0, 10)
    .map(r => ({ title: r.title, time: r.time, icon: r.icon, color: r.color }));
  res.json(rows);
});

router.get('/campaigns', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const rows = db.all('campaigns', (c) => c.company_id === companyId)
    .reverse()
    .slice(0, 5)
    .map(r => ({ name: r.name, reach: r.reach, conversions: r.conversions, status: r.status }));
  res.json(rows);
});

router.get('/recommendations', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const rows = db.all('recommendations', (r) => r.company_id === companyId)
    .map(r => ({ title: r.title, description: r.description }));
  res.json(rows);
});

export default router;
