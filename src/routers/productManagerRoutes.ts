import { Router } from 'express';
import * as ProductManagerController from '../controllers/productManagerController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/entry', authMiddleware, ProductManagerController.validateCreateEntry, ProductManagerController.createEntry);
router.get('/entry', authMiddleware, ProductManagerController.getEntries);

router.post('/exit', authMiddleware, ProductManagerController.validateCreateExit, ProductManagerController.createExit);
router.get('/exit', authMiddleware, ProductManagerController.getExits);

export default router;
