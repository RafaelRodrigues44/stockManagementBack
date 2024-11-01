// userController.ts

import { Request, Response } from 'express';
import User, { UserAttributes } from '../models/User';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return; 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData: Omit<UserAttributes, 'id'> = { name, email, password: hashedPassword };
    const user = await User.create(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const updatedData: Partial<Omit<UserAttributes, 'id'>> = { name, email };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    await user.update(updatedData);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
