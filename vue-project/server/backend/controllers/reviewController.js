import Review from '../models/review.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { user_id, item_id, rating, comment, title } = req.body;

    const newReview = new Review({
      user_id,
      item_id,
      rating,
      comment,
      title,
    });

    await newReview.save();
    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(400).json({ message: 'Error creating review', error: error.message });
  }
};

// Get all reviews or filter by item_id/user_id
export const getReviews = async (req, res) => {
  try {
    const { item_id, user_id } = req.query;
    const query = {};

    if (item_id) query.item_id = item_id;
    if (user_id) query.user_id = user_id;

    const reviews = await Review.find(query).populate('user_id', 'name').populate('item_id', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id).populate('user_id', 'name').populate('item_id', 'name');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(404).json({ message: 'Error fetching review', error: error.message });
  }
};

// Update a review by ID
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    res.status(400).json({ message: 'Error updating review', error: error.message });
  }
};

// Delete a review by ID
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting review', error: error.message });
  }
};
