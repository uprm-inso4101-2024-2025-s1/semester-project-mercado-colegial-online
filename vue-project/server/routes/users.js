// routes/users.js
import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
} from '../backend/controllers/userController.js';  // Adjust path if necessary

const router = express.Router();
router.use(express.json());

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
