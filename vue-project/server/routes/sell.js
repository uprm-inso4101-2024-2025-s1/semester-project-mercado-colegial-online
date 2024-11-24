// routes/sell.js
import express from 'express';
import sellController from '../backend/controllers/sellController';

const router = express.Router();
router.use(express.json());

router.post('/', sellController.addSell);
router.get('/', sellController.getAllSells);
router.get('/:id', sellController.getSellById);
router.put('/:id', sellController.updateSell);
router.delete('/:id', sellController.deleteSell);

export default router;