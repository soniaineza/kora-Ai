import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db.js';
import { generateToken } from '../middleware/auth.js';

const router = Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = db.get('users', (u) => u.email === email);
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists' });
  }

  const id = db.nextId().toString();
  const hashed = bcrypt.hashSync(password, 10);
  db.run('users', { id, name, email, password: hashed, company_id: null, created_at: new Date().toISOString() });

  const token = generateToken(id, null);
  res.status(201).json({ user: { id, name, email, companyId: null }, token });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = db.get('users', (u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'No account found with that email' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = generateToken(user.id, user.company_id);
  res.json({
    user: { id: user.id, name: user.name, email: user.email, companyId: user.company_id },
    token,
  });
});

export default router;
