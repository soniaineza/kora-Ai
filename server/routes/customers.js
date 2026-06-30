import { Router } from 'express';
import { db } from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const rows = db.all('customers', (c) => c.company_id === companyId)
    .map(r => ({ id: r.id, name: r.name, phone: r.phone, lastInteraction: r.last_interaction, source: r.source, status: r.status }));
  res.json(rows);
});

router.get('/stats', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString();
  const customers = db.all('customers', (c) => c.company_id === companyId);

  res.json({
    total: customers.length,
    newThisWeek: customers.filter(c => c.created_at >= sevenDaysAgo).length,
    activeLeads: customers.filter(c => c.status === 'Lead').length,
    whatsappContacts: customers.filter(c => c.source === 'WhatsApp').length,
  });
});

export default router;
