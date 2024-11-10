const Sell = require('../models/sell');
const Item = require('../models/item');
const User = require('../models/user');

class SellController {

  // Create a new sell record
  async addSell(req, res) {
    try {
      const { user_id, item_id, quantity, price } = req.body;

      // Validate input data
      if (!user_id || !item_id || !price) {
        return res.status(400).json({ message: 'User, Item, and Price are required' });
      }

      // Check if user exists
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if item exists
      const item = await Item.findById(item_id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      // Create new sell record
      const newSell = new Sell({ user_id, item_id, quantity, price });
      await newSell.save();
      return res.status(201).json(newSell);

    } catch (error) {
      return res.status(500).json({ message: 'Error creating sell record', error });
    }
  }

  // Retrieve all sell records
  async getAllSells(req, res) {
    try {
      const sells = await Sell.find().populate('user_id', 'name').populate('item_id', 'name');
      return res.status(200).json(sells);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving sell records', error });
    }
  }

  // Retrieve a single sell record by ID
  async getSellById(req, res) {
    try {
      const { id } = req.params;
      const sell = await Sell.findById(id).populate('user_id', 'name').populate('item_id', 'name');
      if (!sell) {
        return res.status(404).json({ message: 'Sell record not found' });
      }
      return res.status(200).json(sell);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving sell record', error });
    }
  }

  // Update a specific sell record
  async updateSell(req, res) {
    try {
      const { id } = req.params;
      const { user_id, item_id, quantity, price } = req.body;

      // Validate input data
      if (!user_id || !item_id || !price) {
        return res.status(400).json({ message: 'User, Item, and Price are required' });
      }

      // Check if sell record exists
      const sell = await Sell.findById(id);
      if (!sell) {
        return res.status(404).json({ message: 'Sell record not found' });
      }

      // Update sell record
      sell.user_id = user_id;
      sell.item_id = item_id;
      sell.quantity = quantity;
      sell.price = price;

      await sell.save();
      return res.status(200).json(sell);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating sell record', error });
    }
  }

  // Delete a specific sell record
  async deleteSell(req, res) {
    try {
      const { id } = req.params;

      // Find and delete the sell record
      const sell = await Sell.findByIdAndDelete(id);

      if (!sell) {
        return res.status(404).json({ message: 'Sell record not found' });
      }

      return res.status(200).json({ message: 'Sell record deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting sell record', error });
    }
  }
}

module.exports = new SellController();
