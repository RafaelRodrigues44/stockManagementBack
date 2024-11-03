import { ProductEntry, ProductExit } from '../models/ProductManager';
import Product from '../models/Product';

export const calculateTotalStock = async () => {
    try {
        const entries = await ProductEntry.findAll({ include: Product });
        const exits = await ProductExit.findAll({ include: Product });

        const stockData: Record<string, {
            totalEntryQuantity: number;
            totalExitQuantity: number;
            entryDetails: any[];
            exitDetails: any[]; 
        }> = {};

        entries.forEach(entry => {
            const productId = entry.Product?.id?.toString();
            if (productId) {
                if (!stockData[productId]) {
                    stockData[productId] = { totalEntryQuantity: 0, totalExitQuantity: 0, entryDetails: [], exitDetails: [] };
                }
                stockData[productId].totalEntryQuantity += entry.quantity;
                stockData[productId].entryDetails.push({
                    entryId: entry.id || null,
                    name: entry.Product ? entry.Product.name : 'Unknown',
                    quantity: entry.quantity || 'Unknown',
                    date: entry.date || 'Unknown',
                    price: entry.price || 'Unknown'
                });
            }
        });

        exits.forEach(exit => {
            const productId = exit.Product?.id?.toString();
            if (productId) {
                if (!stockData[productId]) {
                    stockData[productId] = { totalEntryQuantity: 0, totalExitQuantity: 0, entryDetails: [], exitDetails: [] };
                }
                stockData[productId].totalExitQuantity += exit.quantity;
                stockData[productId].exitDetails.push({ 
                    exitId: exit.id || null,
                    name: exit.Product ? exit.Product.name : 'Unknown',
                    quantity: exit.quantity || 'Unknown',
                    date: exit.date || 'Unknown',
                    price: exit.price || 'Unknown'
                });
            }
        });

        const totalStockInfo = Object.keys(stockData).map(productId => ({
            productId: Number(productId),
            totalStockQuantity: stockData[productId].totalEntryQuantity - stockData[productId].totalExitQuantity,
            totalEntryQuantity: stockData[productId].totalEntryQuantity,
            totalExitQuantity: stockData[productId].totalExitQuantity,
            entryDetails: stockData[productId].entryDetails,
            exitDetails: stockData[productId].exitDetails 
        }));

        return totalStockInfo;

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
            entryDetails: entries.map(entry => ({
                entryId: entry.id || null,
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

export const inventoryData = async () => {
    const totalStockInfo = await calculateTotalStock();

    const inventoryTableData = totalStockInfo.map(product => {
        const totalValueInStock = product.entryDetails.reduce((acc: number, entry: any) => {
            return acc + (entry.price * entry.quantity); 
        }, 0);

        return {
            id: product.productId,
            name: product.entryDetails.length > 0 ? product.entryDetails[0].name : 'Unknown',
            quantityInStock: product.totalStockQuantity,
            totalValueInStock: totalValueInStock.toFixed(2) 
        };
    });

    return inventoryTableData;
};

