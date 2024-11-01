import { Router } from 'express';
import * as ProductManagerController from '../controllers/productManagerController';
import authMiddleware from '../middlewares/authMiddleware';
import multer from 'multer';

const router = Router();
const upload = multer();

// Rotas de entradas de produtos
router.post('/entry', authMiddleware, ProductManagerController.createEntry);
router.get('/entry', authMiddleware, ProductManagerController.getEntries);

// Rotas de saídas de produtos
router.post('/exit', authMiddleware, ProductManagerController.createExit);
router.get('/exit', authMiddleware, ProductManagerController.getExits);

export default router;
