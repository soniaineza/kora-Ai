export const mockDashboardMetrics = {
  todayVisitors: 124, qrScans: 45, whatsappLeads: 12, revenueToday: 450000,
  revenueTrend: 8, visitorsTrend: 12, qrTrend: 5, leadsTrend: 20,
};

export const mockBusinessHealth = {
  score: 85,
  items: [
    { label: 'Website Status', status: 'good' as const },
    { label: 'Google Presence', status: 'warning' as const },
    { label: 'Social Activity', status: 'good' as const },
    { label: 'QR Usage', status: 'good' as const },
  ],
  suggestions: ['Complete Google profile', 'Post 3 times this week'],
};

export const mockActivity = [
  { title: 'Poster generated', time: '2 hours ago', icon: 'Image', color: 'bg-purple-100 text-purple-600' },
  { title: 'QR menu updated', time: '5 hours ago', icon: 'QrCode', color: 'bg-blue-100 text-blue-600' },
  { title: 'Campaign launched', time: 'Yesterday', icon: 'Megaphone', color: 'bg-kora-100 text-kora-600' },
  { title: 'Website published', time: '2 days ago', icon: 'Globe', color: 'bg-green-100 text-green-600' },
];

export const mockCampaignSummaries = [
  { name: 'Weekend Special', reach: '2.4k', conversions: '124', status: 'Active' as const },
  { name: 'New Menu Launch', reach: '1.1k', conversions: '56', status: 'Active' as const },
  { name: 'Holiday Promo', reach: '5.8k', conversions: '312', status: 'Completed' as const },
];

export const mockRecommendations = [
  { title: 'Launch Weekend Promotion', description: 'Boost sales this Saturday' },
  { title: 'Generate New Posters', description: 'Refresh your storefront' },
  { title: 'Improve Website SEO', description: 'Get found on Google' },
  { title: 'WhatsApp Broadcast', description: 'Reach 150+ customers' },
];

export const mockCustomers = [
  { id: 1, name: 'Aline Uwase', phone: '+250 788 123 456', lastInteraction: '2 hours ago', source: 'WhatsApp' as const, status: 'Active' as const },
  { id: 2, name: 'Jean-Paul Habimana', phone: '+250 722 998 211', lastInteraction: 'Yesterday', source: 'QR' as const, status: 'Lead' as const },
  { id: 3, name: 'Grace Mukamana', phone: '+250 788 442 109', lastInteraction: '3 days ago', source: 'Website' as const, status: 'Active' as const },
  { id: 4, name: 'Eric Niyonzima', phone: '+250 733 567 800', lastInteraction: '5 hours ago', source: 'Walk-in' as const, status: 'Active' as const },
  { id: 5, name: 'Divine Ingabire', phone: '+250 788 010 234', lastInteraction: '1 week ago', source: 'WhatsApp' as const, status: 'Inactive' as const },
  { id: 6, name: 'Samuel Okello', phone: '+256 701 223 119', lastInteraction: 'Today', source: 'QR' as const, status: 'Lead' as const },
  { id: 7, name: 'Fatou Diallo', phone: '+221 77 556 1290', lastInteraction: '4 days ago', source: 'Website' as const, status: 'Active' as const },
  { id: 8, name: 'Kwame Mensah', phone: '+233 24 778 4421', lastInteraction: '2 days ago', source: 'WhatsApp' as const, status: 'Active' as const },
  { id: 9, name: 'Chioma Adeyemi', phone: '+234 803 119 7765', lastInteraction: '6 hours ago', source: 'Walk-in' as const, status: 'Lead' as const },
  { id: 10, name: 'Brian Otieno', phone: '+254 712 445 980', lastInteraction: '1 week ago', source: 'QR' as const, status: 'Inactive' as const },
  { id: 11, name: 'Sandrine Keza', phone: '+250 788 661 002', lastInteraction: 'Yesterday', source: 'WhatsApp' as const, status: 'Active' as const },
  { id: 12, name: 'Patrick Bizimana', phone: '+250 722 330 778', lastInteraction: '3 hours ago', source: 'Website' as const, status: 'Lead' as const },
  { id: 13, name: 'Lucia Nakato', phone: '+256 772 884 110', lastInteraction: '5 days ago', source: 'Walk-in' as const, status: 'Active' as const },
  { id: 14, name: 'Thomas Rugamba', phone: '+250 788 220 554', lastInteraction: '2 weeks ago', source: 'QR' as const, status: 'Inactive' as const },
  { id: 15, name: 'Esperance Mutoni', phone: '+250 733 909 121', lastInteraction: 'Today', source: 'WhatsApp' as const, status: 'Lead' as const },
];

export const mockCampaigns = [
  { id: 1, name: 'Weekend Special', goal: 'Increase Sales', reach: '2.4k', clicks: '342', conversions: '124', status: 'Active' as const, color: 'bg-green-50 text-green-700' },
  { id: 2, name: 'New Menu Launch', goal: 'Awareness', reach: '1.1k', clicks: '156', conversions: '56', status: 'Active' as const, color: 'bg-green-50 text-green-700' },
  { id: 3, name: 'Holiday Promo', goal: 'Increase Sales', reach: '5.8k', clicks: '890', conversions: '312', status: 'Completed' as const, color: 'bg-gray-100 text-gray-600' },
  { id: 4, name: 'Loyalty Program', goal: 'Retention', reach: '-', clicks: '-', conversions: '-', status: 'Draft' as const, color: 'bg-amber-50 text-amber-700' },
];

export const mockAnalyticsStats = { totalRevenue: 1250000, websiteVisits: 3456, qrScans: 892, newLeads: 156 };

export const mockTraffic = [
  { day: 'Mon', visits: 400 }, { day: 'Tue', visits: 600 }, { day: 'Wed', visits: 450 },
  { day: 'Thu', visits: 800 }, { day: 'Fri', visits: 550 }, { day: 'Sat', visits: 900 },
  { day: 'Sun', visits: 750 },
];

export const mockConversionSources = [
  { label: 'WhatsApp', value: 45, color: 'bg-emerald-500' },
  { label: 'Website', value: 30, color: 'bg-blue-500' },
  { label: 'QR Menu', value: 15, color: 'bg-purple-500' },
  { label: 'Social Media', value: 10, color: 'bg-pink-500' },
];

export const mockIntegrations = [
  { name: 'WhatsApp Business', description: 'Sync your catalog and send broadcasts.', icon: 'MessageCircle', color: 'text-emerald-600 bg-emerald-50', connected: true, category: 'Messaging' },
  { name: 'Instagram', description: 'Auto-publish posters and reels.', icon: 'Instagram', color: 'text-pink-600 bg-pink-50', connected: true, category: 'Social' },
  { name: 'Facebook Pages', description: 'Schedule posts and run promotions.', icon: 'Facebook', color: 'text-blue-600 bg-blue-50', connected: true, category: 'Social' },
  { name: 'MTN Mobile Money', description: 'Accept payments and subscriptions.', icon: 'CreditCard', color: 'text-amber-600 bg-amber-50', connected: false, category: 'Payments' },
  { name: 'Google Business', description: 'Manage your Google profile & reviews.', icon: 'Globe', color: 'text-indigo-600 bg-indigo-50', connected: false, category: 'Presence' },
  { name: 'Email (Mailchimp)', description: 'Send email campaigns to customers.', icon: 'Mail', color: 'text-orange-600 bg-orange-50', connected: false, category: 'Messaging' },
  { name: 'SMS Gateway', description: 'Send bulk SMS campaigns and alerts.', icon: 'MessageSquare', color: 'text-sky-600 bg-sky-50', connected: false, category: 'Messaging' },
  { name: 'TikTok', description: 'Publish short-form video content.', icon: 'Globe', color: 'text-gray-900 bg-gray-100', connected: false, category: 'Social' },
];

export const mockPlans = [
  { name: 'Free', price: '0', period: 'forever', description: 'For getting started online.', features: ['1 QR Menu', 'Basic website', '5 AI posters / month', 'Community support'] },
  { name: 'Business', price: '15,000', period: 'per month', description: 'For growing local businesses.', features: ['Everything in Free', 'Unlimited QR menus', 'WhatsApp catalog', '50 AI posters / month', '10 promo videos / month', 'Email support'], current: true },
  { name: 'Premium', price: '35,000', period: 'per month', description: 'For businesses scaling fast.', features: ['Everything in Business', 'Unlimited AI generations', 'Growth Center campaigns', 'Advanced analytics', 'Social scheduler', 'Priority support'], highlight: true },
  { name: 'Enterprise', price: 'Custom', period: 'contact us', description: 'For multi-location brands.', features: ['Everything in Premium', 'Multiple locations', 'Team roles & permissions', 'Dedicated manager', 'Custom integrations', 'SLA & onboarding'] },
];

export const mockInvoices = [
  { id: 'INV-2026-006', date: 'Jun 1, 2026', amount: '15,000 RWF', status: 'Paid' },
  { id: 'INV-2026-005', date: 'May 1, 2026', amount: '15,000 RWF', status: 'Paid' },
  { id: 'INV-2026-004', date: 'Apr 1, 2026', amount: '15,000 RWF', status: 'Paid' },
  { id: 'INV-2026-003', date: 'Mar 1, 2026', amount: '15,000 RWF', status: 'Paid' },
];

export const mockGrowthPlan = {
  goal: 'Get More Customers',
  budget: '10,000',
  businessType: 'Cafe',
  posters: [
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80',
  ],
  whatsappMessage: "☕ *Hey Coffee Lovers!* 👋 Need a mid-week boost? We've got you covered! Show this message at Sunny Cafe today and get *20% OFF* any pastry when you buy a large coffee. 🥐☕ Tap here to see our menu: 👉 kora.ai/sunnycafe See you soon! ✨",
  weeklyPlan: [
    { day: 'Mon', title: 'Launch Teaser on Instagram', description: 'Post the first AI generated poster to build anticipation for the weekend offer.' },
    { day: 'Wed', title: 'Send WhatsApp Broadcast', description: 'Send the generated message to your top 100 customers with the special link.' },
    { day: 'Fri', title: 'Run Facebook Ad (Budget: 10k RWF)', description: 'Boost the promotional video targeting people within 5km of your location.' },
  ],
};
