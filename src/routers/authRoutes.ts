import { Router, Request, Response } from 'express';
import { validateLogin, login } from '../controllers/authController';

const router = Router();

router.post('/login', validateLogin, async (req: Request, res: Response) => {
  try {
    await login(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
