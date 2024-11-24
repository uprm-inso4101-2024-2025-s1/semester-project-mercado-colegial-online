import Sell from '../models/sell.js';

// Create a new sell
export const createSell = async (req, res) => {
  try {
    const newSell = new Sell(req.body);
    await newSell.save();
    res.status(201).json(newSell);
  } catch (error) {
    console.error('Error creating sell:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get all sells
export const getAllSells = async (req, res) => {
  try {
    const sells = await Sell.find().populate('user_id').populate('item_id');
    res.status(200).json(sells);
  } catch (error) {
    console.error('Error fetching all sells:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a sell by ID
export const getSellById = async (req, res) => {
  try {
    const sell = await Sell.findById(req.params.id).populate('user_id').populate('item_id');
    if (!sell) {
      return res.status(404).json({ error: 'Sell not found' });
    }
    res.status(200).json(sell);
  } catch (error) {
    console.error('Error fetching sell by ID:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update a sell by ID
export const updateSellById = async (req, res) => {
  try {
    const updatedSell = await Sell.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the data before updating
    });
    if (!updatedSell) {
      return res.status(404).json({ error: 'Sell not found' });
    }
    res.status(200).json(updatedSell);
  } catch (error) {
    console.error('Error updating sell by ID:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a sell by ID
export const deleteSellById = async (req, res) => {
  try {
    const deletedSell = await Sell.findByIdAndDelete(req.params.id);
    if (!deletedSell) {
      return res.status(404).json({ error: 'Sell not found' });
    }
    res.status(200).json({ message: 'Sell deleted successfully' });
  } catch (error) {
    console.error('Error deleting sell by ID:', error);
    res.status(500).json({ error: error.message });
  }
};