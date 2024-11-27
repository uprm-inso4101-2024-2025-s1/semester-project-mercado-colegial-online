import express from 'express';
import {
  createSell,
  getAllSells,
  getSellById,
  updateSellById,
  deleteSellById,
} from '../backend/controllers/sellController.js';

const router = express.Router();
router.use(express.json());

router.post('/', createSell);
router.get('/', getAllSells);
router.get('/:id', getSellById);
router.put('/:id', updateSellById);
router.delete('/:id', deleteSellById);

export default router;
