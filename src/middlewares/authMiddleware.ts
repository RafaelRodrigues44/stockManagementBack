import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return; 
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET!); 
        next(); 
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
        return; 
    }
};

export default authMiddleware;
