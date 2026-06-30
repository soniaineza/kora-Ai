import { Router } from 'express';
import { db } from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, (req, res) => {
  const { companyId } = req;
  if (!companyId) return res.status(400).json({ error: 'No company' });

  const rows = db.all('integrations', (i) => i.company_id === companyId)
    .map(r => ({ name: r.name, connected: !!r.connected }));
  res.json(rows);
});

export default router;
