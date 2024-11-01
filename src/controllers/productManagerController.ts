import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { ProductEntry, ProductExit } from '../models/ProductManager';
import { calculateTotalStock, calculateStockByProductId } from '../services/stockService'; 

export const validateCreateEntry = [
    body('productId').isInt().withMessage('Product ID must be an integer.'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer.'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0.'),
    body('batch').isString().notEmpty().withMessage('Batch is required.'),
];

export const validateCreateExit = [
    body('productId').isInt().withMessage('Product ID must be an integer.'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer.'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0.'),
    body('batch').isString().notEmpty().withMessage('Batch is required.'),
];

export const createEntry = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { productId, quantity, price, batch } = req.body;

    try {
        const entry = await ProductEntry.create({ productId, quantity, price, batch, date: new Date() });
        res.status(201).json(entry);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ message: 'Error creating entry', error: errorMessage });
    }
};

export const createExit = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { productId, quantity, price, batch } = req.body;

    try {

        const { totalStockQuantity } = await calculateStockByProductId(productId);

        if (quantity > totalStockQuantity) {
            res.status(400).json({ message: `Insufficient stock for product ID ${productId}. Available: ${totalStockQuantity}` });
            return;
        }

        const exit = await ProductExit.create({ productId, quantity, price, batch, date: new Date() });
        res.status(201).json(exit);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ message: 'Error creating exit', error: errorMessage });
    }
};

export const getEntries = async (req: Request, res: Response): Promise<void> => {
    try {
        const entries = await ProductEntry.findAll();
        res.status(200).json(entries);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ message: 'Error fetching entries', error: errorMessage });
    }
};

export const getExits = async (req: Request, res: Response): Promise<void> => {
    try {
        const exits = await ProductExit.findAll();
        res.status(200).json(exits);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ message: 'Error fetching exits', error: errorMessage });
    }
};

export const getTotalStock = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalStock = await calculateTotalStock();
        res.status(200).json(totalStock);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ message: 'Error fetching total stock', error: errorMessage });
    }
};
