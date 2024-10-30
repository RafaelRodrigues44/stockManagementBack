import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { syncDatabase } from '../src/config/database';  
import authRoutes from './routers/authRoutes';
import productRoutes from './routers/productRoutes';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const startServer = async () => {
  try {
    await syncDatabase();
    app.listen(6041, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

export default app;

startServer();
