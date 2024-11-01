import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser,getUserId } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware'; 

const router = Router();

router.post('/user', createUser);

router.get('/users', authMiddleware, getUsers);

router.get('/:id', authMiddleware, getUserId);

router.put('/:id', authMiddleware, updateUser);

router.delete('/:id', authMiddleware, deleteUser);

export default router;
