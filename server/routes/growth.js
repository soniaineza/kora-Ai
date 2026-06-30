import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/generate', authenticate, (req, res) => {
  const { goal, budget, businessType } = req.body;

  const plan = {
    goal: goal || 'Increase sales',
    budget: budget || '50,000',
    businessType: businessType || 'General',
    posters: [
      'Weekend Special - 20% Off',
      'New Menu Items',
      'Customer Loyalty Program',
    ],
    whatsappMessage: `Hi there! Thanks for being a valued customer. We have some exciting new offers this week. Check them out here: [link]`,
    weeklyPlan: [
      { day: 'Monday', title: 'Social Media Boost', description: 'Run targeted ads on Instagram and Facebook' },
      { day: 'Tuesday', title: 'WhatsApp Broadcast', description: 'Send promotional message to your contacts' },
      { day: 'Wednesday', title: 'Poster Campaign', description: 'Display new promotional posters in-store' },
      { day: 'Thursday', title: 'Email Newsletter', description: 'Send weekly digest to subscribers' },
      { day: 'Friday', title: 'Weekend Push', description: 'Highlight weekend specials across all channels' },
      { day: 'Saturday', title: 'Engagement Posts', description: 'Share customer photos and testimonials' },
      { day: 'Sunday', title: 'Review & Plan', description: 'Analyze weekly performance and plan next week' },
    ],
  };

  res.json(plan);
});

export default router;
