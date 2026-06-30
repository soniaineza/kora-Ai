import { Router } from 'express';
import { db } from '../db.js';
import { authenticate, generateToken } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticate, (req, res) => {
  const { name, type, industry, description, phone, address, website, logo, brandColor } = req.body;
  if (!name || !type) {
    return res.status(400).json({ error: 'Business name and type are required' });
  }

  const id = db.nextId().toString();
  db.run('companies', {
    id, name, type, industry: industry || '', description: description || '',
    phone: phone || '', address: address || '', website: website || '',
    logo: logo || '', brand_color: brandColor || '#F97316',
    created_at: new Date().toISOString(),
  });

  db.update('users', (u) => u.id === req.userId, { company_id: id });

  const company = db.get('companies', (c) => c.id === id);
  const newToken = generateToken(req.userId, id);

  res.status(201).json({ company: formatCompany(company), token: newToken });
});

router.get('/', authenticate, (req, res) => {
  if (!req.companyId) return res.json({ company: null });
  const company = db.get('companies', (c) => c.id === req.companyId);
  res.json({ company: company ? formatCompany(company) : null });
});

router.put('/', authenticate, (req, res) => {
  if (!req.companyId) return res.status(400).json({ error: 'No company registered' });

  const { name, type, industry, description, phone, address, website, logo, brandColor } = req.body;
  db.update('companies', (c) => c.id === req.companyId, {
    name, type: type || '', industry: industry || '', description: description || '',
    phone: phone || '', address: address || '', website: website || '',
    logo: logo || '', brand_color: brandColor || '#F97316',
  });

  const company = db.get('companies', (c) => c.id === req.companyId);
  res.json({ company: formatCompany(company) });
});

function formatCompany(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    industry: row.industry,
    description: row.description,
    phone: row.phone,
    address: row.address,
    website: row.website,
    logo: row.logo,
    brandColor: row.brand_color,
  };
}

export default router;
