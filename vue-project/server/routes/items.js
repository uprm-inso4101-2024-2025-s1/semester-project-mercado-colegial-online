// routes/items.js
import express from 'express';
import {
  createItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById
} from '../backend/controllers/itemController.js';  

const router = express.Router();
router.use(express.json());

router.post('/', createItem);
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.put('/:id', updateItemById);
router.delete('/:id', deleteItemById);

export default router;
