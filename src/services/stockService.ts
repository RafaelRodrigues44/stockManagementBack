import { ProductEntry, ProductExit } from '../models/ProductManager';
import Product from '../models/Product';

export const calculateTotalStock = async () => {
    try {
        const entries = await ProductEntry.findAll({ include: Product });
        const exits = await ProductExit.findAll({ include: Product });

        const totalEntryQuantity = entries.reduce((acc, entry) => acc + entry.quantity, 0);
        const totalExitQuantity = exits.reduce((acc, exit) => acc + exit.quantity, 0);
        const totalStockQuantity = totalEntryQuantity - totalExitQuantity;

        return {
            totalStockQuantity,
            totalEntryQuantity,
            totalExitQuantity,
            productDetails: entries.map(entry => ({
                id: entry.id || null,
                name: entry.Product ? entry.Product.name : 'Unknown',
                quantity: entry.quantity || 'Unknown',
                date: entry.date || 'Unknown',
                price: entry.price || 'Unknown'
            })),
        };
    } catch (error: unknown) {
        throw new Error('Error calculating total stock: ' + (error instanceof Error ? error.message : 'Unknown error occurred'));
    }
};

export const calculateStockByProductId = async (productId: number) => {
    try {
        const entries = await ProductEntry.findAll({ where: { productId }, include: Product });
        const exits = await ProductExit.findAll({ where: { productId }, include: Product });

        const totalEntryQuantity = entries.reduce((acc, entry) => acc + entry.quantity, 0);
        const totalExitQuantity = exits.reduce((acc, exit) => acc + exit.quantity, 0);
        const totalStockQuantity = totalEntryQuantity - totalExitQuantity;

        return {
            productId,
            totalStockQuantity,
            totalEntryQuantity,
            totalExitQuantity,
            productDetails: entries.map(entry => ({
                id: entry.id || null,
                name: entry.Product ? entry.Product.name : 'Unknown',
                quantity: entry.quantity || 'Unknown',
                date: entry.date || 'Unknown',
                price: entry.price || 'Unknown'
            })),
        };
    } catch (error: unknown) {
        throw new Error('Error calculating stock for product: ' + (error instanceof Error ? error.message : 'Unknown error occurred'));
    }
};
