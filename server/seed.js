import { db } from './db.js';

function seed() {
  const existing = db.get('companies', () => true);
  if (existing) {
    console.log('Database already seeded.');
    return;
  }

  const companyId = '1';

  const customers = [
    { id: 1, company_id: companyId, name: 'Alice Mugisha', phone: '+250 781 111 111', last_interaction: '2 hours ago', source: 'WhatsApp', status: 'Active', created_at: new Date().toISOString() },
    { id: 2, company_id: companyId, name: 'Bob Habimana', phone: '+250 782 222 222', last_interaction: 'Yesterday', source: 'QR', status: 'Active', created_at: new Date().toISOString() },
    { id: 3, company_id: companyId, name: 'Celine Uwimana', phone: '+250 783 333 333', last_interaction: '3 days ago', source: 'Walk-in', status: 'Active', created_at: new Date().toISOString() },
    { id: 4, company_id: companyId, name: 'David Niyonzima', phone: '+250 784 444 444', last_interaction: '1 week ago', source: 'Website', status: 'Lead', created_at: new Date().toISOString() },
    { id: 5, company_id: companyId, name: 'Eve Mukamana', phone: '+250 785 555 555', last_interaction: '2 weeks ago', source: 'WhatsApp', status: 'Inactive', created_at: new Date().toISOString() },
  ];

  const campaigns = [
    { id: 1, company_id: companyId, name: 'Summer Promo', goal: 'Boost summer sales', reach: '2,450', clicks: '189', conversions: '45', status: 'Active' },
    { id: 2, company_id: companyId, name: 'New Menu Launch', goal: 'Promote new menu items', reach: '3,100', clicks: '312', conversions: '78', status: 'Active' },
    { id: 3, company_id: companyId, name: 'Holiday Special', goal: 'End of year campaign', reach: '1,800', clicks: '95', conversions: '23', status: 'Completed' },
  ];

  const today = new Date().toISOString().slice(0, 10);
  const analytics = [
    { id: 1, company_id: companyId, date: today, visits: 142, qr_scans: 38, leads: 12, revenue: 184500 },
  ];

  for (let i = 1; i <= 6; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    analytics.push({
      id: 1 + i,
      company_id: companyId,
      date: d.toISOString().slice(0, 10),
      visits: Math.floor(Math.random() * 100) + 50,
      qr_scans: Math.floor(Math.random() * 30) + 10,
      leads: Math.floor(Math.random() * 15) + 3,
      revenue: Math.floor(Math.random() * 100000) + 50000,
    });
  }

  const activities = [
    { id: 1, company_id: companyId, title: 'New customer registered via WhatsApp', time: '2 min ago', icon: 'Users', color: 'text-emerald-600 bg-emerald-50' },
    { id: 2, company_id: companyId, title: 'QR Menu scanned 15 times today', time: '15 min ago', icon: 'QrCode', color: 'text-purple-600 bg-purple-50' },
    { id: 3, company_id: companyId, title: 'Website visitor from Instagram ad', time: '1 hour ago', icon: 'Globe', color: 'text-blue-600 bg-blue-50' },
    { id: 4, company_id: companyId, title: 'Campaign "Summer Promo" reached 2K', time: '3 hours ago', icon: 'Megaphone', color: 'text-kora-600 bg-kora-50' },
    { id: 5, company_id: companyId, title: 'New AI poster generated', time: '5 hours ago', icon: 'Image', color: 'text-pink-600 bg-pink-50' },
  ];

  const integrations = [
    { id: 1, company_id: companyId, name: 'WhatsApp Business', connected: 1 },
    { id: 2, company_id: companyId, name: 'Instagram', connected: 1 },
    { id: 3, company_id: companyId, name: 'Facebook Pages', connected: 1 },
    { id: 4, company_id: companyId, name: 'MTN Mobile Money', connected: 0 },
    { id: 5, company_id: companyId, name: 'Google Business Profile', connected: 0 },
    { id: 6, company_id: companyId, name: 'Mailchimp Email', connected: 0 },
    { id: 7, company_id: companyId, name: 'SMS Gateway', connected: 0 },
    { id: 8, company_id: companyId, name: 'TikTok', connected: 0 },
  ];

  const healthItems = [
    { id: 1, company_id: companyId, label: 'Website Active', status: 'good' },
    { id: 2, company_id: companyId, label: 'QR Menu Updated', status: 'good' },
    { id: 3, company_id: companyId, label: 'WhatsApp Connected', status: 'good' },
    { id: 4, company_id: companyId, label: 'Social Media Active', status: 'good' },
    { id: 5, company_id: companyId, label: 'Google Business', status: 'warning' },
  ];

  const recs = [
    { id: 1, company_id: companyId, title: 'Launch a WhatsApp Campaign', description: 'Reach customers directly on their most-used app with targeted promotions and updates.' },
    { id: 2, company_id: companyId, title: 'Create Seasonal Posters', description: 'Generate eye-catching promotional posters for the upcoming holiday season.' },
    { id: 3, company_id: companyId, title: 'Set Up Customer Loyalty', description: 'Build a digital loyalty program to increase repeat visits and customer retention.' },
  ];

  const invoices = [
    { id: 'INV-001', company_id: companyId, date: '2026-06-01', amount: '15,000 RWF', status: 'paid' },
    { id: 'INV-002', company_id: companyId, date: '2026-05-01', amount: '15,000 RWF', status: 'paid' },
    { id: 'INV-003', company_id: companyId, date: '2026-04-01', amount: '15,000 RWF', status: 'paid' },
  ];

  db.run('companies', { id: companyId, name: 'Sunny Cafe', type: 'Cafe', industry: 'Food & Beverage', description: 'A cozy cafe in the heart of Kigali serving fresh coffee, pastries, and light meals.', phone: '+250 788 123 456', address: 'KG 123 St, Kigali, Rwanda', website: 'https://sunnycafe.rw', logo: '', brand_color: '#F97316', created_at: new Date().toISOString() });

  for (const c of customers) db.run('customers', c);
  for (const c of campaigns) db.run('campaigns', c);
  for (const a of analytics) db.run('analytics_daily', a);
  for (const a of activities) db.run('activity_log', a);
  for (const i of integrations) db.run('integrations', i);
  for (const h of healthItems) db.run('health_items', h);
  for (const r of recs) db.run('recommendations', r);
  for (const i of invoices) db.run('invoices', i);

  console.log('Database seeded with demo data.');
}

seed();
