import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

const posterTemplates = [
  { title: 'Weekend Special - 20% Off', desc: 'Bold offer with percentage highlight' },
  { title: 'New Arrivals This Week', desc: 'Showcase latest products' },
  { title: 'Customer Loyalty Program', desc: 'Reward repeat customers' },
  { title: 'Flash Sale - Today Only', desc: 'Urgency-driven promotion' },
  { title: 'Seasonal Promotion', desc: 'Holiday or seasonal themed' },
  { title: 'Buy One Get One Free', desc: 'Classic BOGO offer' },
  { title: 'Limited Time Bundle Deal', desc: 'Bundle multiple items at discount' },
  { title: 'Refer a Friend - Get 10% Off', desc: 'Referral program promotion' },
  { title: 'Grand Opening Celebration', desc: 'New location or relaunch' },
  { title: 'Happy Hour Specials', desc: 'Time-specific discount' },
  { title: 'Free Delivery This Week', desc: 'Waive delivery fees' },
  { title: 'VIP Early Access', desc: 'Exclusive preview for loyal customers' },
];

router.post('/generate', authenticate, (req, res) => {
  const { goal, budget, businessType } = req.body;

  const posters = posterTemplates
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .map((p, i) => ({
      title: p.title,
      imageUrl: `https://picsum.photos/seed/${encodeURIComponent(p.title)}/400/500`,
    }));

  const plan = {
    goal: goal || 'Increase sales',
    budget: budget || '50,000',
    businessType: businessType || 'General',
    posters,
    whatsappMessage: `Hi there! Thanks for being a valued customer at our ${businessType || 'business'}! We have some exciting new offers to help you ${(goal || 'save more').toLowerCase()}. Check them out here: [link]`,
    weeklyPlan: [
      { day: 'Monday', title: 'Social Media Boost', description: `Run targeted ads on Instagram and Facebook for your ${businessType || 'business'}` },
      { day: 'Tuesday', title: 'WhatsApp Broadcast', description: 'Send promotional message to your contacts' },
      { day: 'Wednesday', title: 'Poster Campaign', description: 'Display new promotional posters in-store and online' },
      { day: 'Thursday', title: 'Email Newsletter', description: 'Send weekly digest to subscribers' },
      { day: 'Friday', title: 'Weekend Push', description: 'Highlight weekend specials across all channels' },
      { day: 'Saturday', title: 'Engagement Posts', description: 'Share customer photos and testimonials' },
      { day: 'Sunday', title: 'Review & Plan', description: 'Analyze weekly performance and plan next week' },
    ],
  };

  res.json(plan);
});

export default router;
