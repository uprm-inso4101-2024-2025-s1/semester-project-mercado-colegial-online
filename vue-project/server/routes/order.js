// routes/order.js
import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
}from '../backend/controllers/orderController.js';

const router = express.Router();
router.use(express.json());

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrderById);
router.delete('/:id', deleteOrderById);

export default router;
