import { Router, Request, Response } from 'express';
import { calculateTotalStock } from '../services/stockService';
import { inventoryData } from '../services/stockService';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {

    try {
        const totalStockInfo = await calculateTotalStock();
        res.status(200).json(totalStockInfo);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});

router.get('/inventory', async (req, res) => {
    try {
        const inventoryTableData = await inventoryData(); 
        res.json(inventoryTableData); 
    } catch (error) {
        res.status(500).send('Error retrieving inventory data');
    }
});

export default router;
