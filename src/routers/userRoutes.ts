import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware'; 

const router = Router();

router.post('/', createUser);

router.get('/', authMiddleware, getUsers);

router.put('/:id', authMiddleware, updateUser);

router.delete('/:id', authMiddleware, deleteUser);

export default router;
