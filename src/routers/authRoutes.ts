import { Router, Request, Response } from 'express';
import { login } from '../controllers/authController';

const router = Router();

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await login(req, res);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router
