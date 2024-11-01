import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { syncDatabase } from '../src/config/database';  
import authRoutes from './routers/authRoutes';
import productRoutes from './routers/productRoutes';
import userRoutes from './routers/userRoutes';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await syncDatabase();
    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000'); 
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

export default app;

startServer();
