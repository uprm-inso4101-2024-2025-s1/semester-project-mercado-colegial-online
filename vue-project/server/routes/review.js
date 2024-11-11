//route/review.js
import express from 'express';
import{
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview
}from '../backend/controllers/reviewController.js'; 

const router = express.Router();
router.use(express.json());

router.post('/', createReview);
router.get('/', getReviews);
router.get('/:id', getReviewById);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
