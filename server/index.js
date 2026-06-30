import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import authRoutes from './routes/auth.js';
import companyRoutes from './routes/company.js';
import dashboardRoutes from './routes/dashboard.js';
import customersRoutes from './routes/customers.js';
import campaignsRoutes from './routes/campaigns.js';
import analyticsRoutes from './routes/analytics.js';
import integrationsRoutes from './routes/integrations.js';
import billingRoutes from './routes/billing.js';
import growthRoutes from './routes/growth.js';
import { authenticate } from './middleware/auth.js';
import { db } from './db.js';

import('./seed.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/campaigns', campaignsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/integrations', integrationsRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/growth', growthRoutes);

app.get('/api/me', authenticate, (req, res) => {
  const user = db.get('users', (u) => u.id === req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  let company = null;
  if (user.company_id) {
    const c = db.get('companies', (co) => co.id === user.company_id);
    if (c) {
      company = {
        id: c.id, name: c.name, type: c.type, industry: c.industry,
        description: c.description, phone: c.phone, address: c.address,
        website: c.website, logo: c.logo, brandColor: c.brand_color,
      };
    }
  }

  res.json({
    user: { id: user.id, name: user.name, email: user.email, companyId: user.company_id },
    company,
  });
});

const distPath = join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Kora AI server running on port ${PORT}`);
});
