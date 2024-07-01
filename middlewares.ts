import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  if (username === 'user' && password === 'password') {
    const token = 'your-token-here';
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
