import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { ProductEntry, ProductExit } from '../models/ProductManager';

const validateEntry = [
    body('productId').isInt().withMessage('Product ID must be an integer.'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer.'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0.'),
    body('batch').isString().notEmpty().withMessage('Batch is required.'),
];

const validateExit = [
    body('productId').isInt().withMessage('Product ID must be an integer.'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer.'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0.'),
    body('batch').isString().notEmpty().withMessage('Batch is required.'),
];

export const createEntry = [
    ...validateEntry,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { productId, quantity, price, batch } = req.body;

        try {
            const entry = await ProductEntry.create({ productId, quantity, price, batch, date: new Date() });
            res.status(201).json(entry);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({ message: 'Error creating entry', error: errorMessage });
        }
    }
];

export const getEntries = async (req: Request, res: Response) => {
    try {
        const entries = await ProductEntry.findAll();
        res.status(200).json(entries);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ message: 'Error fetching entries', error: errorMessage });
    }
};

export const createExit = [
    ...validateExit,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { productId, quantity, price, batch } = req.body;

        try {
            const exit = await ProductExit.create({ productId, quantity, price, batch, date: new Date() });
            res.status(201).json(exit);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({ message: 'Error creating exit', error: errorMessage });
        }
    }
];

export const getExits = async (req: Request, res: Response) => {
    try {
        const exits = await ProductExit.findAll();
        res.status(200).json(exits);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(500).json({ message: 'Error fetching exits', error: errorMessage });
    }
};