import { Router, Request, Response, NextFunction } from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController';
import authMiddleware from '../middlewares/authMiddleware';
import multer from 'multer';

const router = Router();
const upload = multer(); 

router.post('/', authMiddleware, upload.single('image'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await createProduct(req, res); 
    } catch (error) {
        next(error); 
    }
});

router.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await getProducts(req, res); 
    } catch (error) {
        next(error);
    }
});

router.put('/:id', authMiddleware, upload.single('image'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updateProduct(req, res); 
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await deleteProduct(req, res); 
    } catch (error) {
        next(error);
    }
});

export default router;
