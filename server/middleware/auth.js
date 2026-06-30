import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'kora-ai-dev-secret-change-in-production';

export function generateToken(userId, companyId) {
  return jwt.sign({ userId, companyId }, JWT_SECRET, { expiresIn: '7d' });
}

export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.companyId = decoded.companyId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
