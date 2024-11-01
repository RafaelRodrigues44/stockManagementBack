import { ProductEntry, ProductExit } from '../models/ProductManager';

export const calculateTotalStock = async () => {
    try {
        const entries = await ProductEntry.findAll();
        const exits = await ProductExit.findAll();

        const totalEntryQuantity = entries.reduce((acc, entry) => acc + entry.quantity, 0);
        const totalExitQuantity = exits.reduce((acc, exit) => acc + exit.quantity, 0);

        const totalEntryValue = entries.reduce((acc, entry) => acc + (entry.quantity * entry.price), 0);
        const totalExitValue = exits.reduce((acc, exit) => acc + (exit.quantity * exit.price), 0);

        const totalStockQuantity = totalEntryQuantity - totalExitQuantity;

        return {
            totalStockQuantity,
            totalEntryValue,
            totalExitValue,
            currentStockValue: totalEntryValue - totalExitValue,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error calculating total stock: ' + error.message);
        } else {
            throw new Error('Error calculating total stock: An unknown error occurred');
        }
    }
};
