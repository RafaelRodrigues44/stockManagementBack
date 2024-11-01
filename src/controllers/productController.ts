import { Request, Response } from 'express';
import Product from '../models/Product';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const createProduct = async (req: MulterRequest, res: Response) => {
  try {
    const { name, description, manufacturer } = req.body; 
    const image = req.file ? req.file.buffer : null;
    const product = await Product.create({ name, description, manufacturer, image }); 
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

export const updateProduct = async (req: MulterRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, manufacturer } = req.body; 
    const image = req.file ? req.file.buffer : null;
    const product = await Product.findByPk(id);

    if (product) {
      await product.update({ name, description, manufacturer, image }); 
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (product) {
      await product.destroy();
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error });
  }
};
