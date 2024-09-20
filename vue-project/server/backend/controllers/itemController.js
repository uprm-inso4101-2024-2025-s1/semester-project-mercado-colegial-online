const Item = require('../models/item');  // Import item model

// Create item
exports.createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);  
    res.status(400).json({ error: error.message });
  }
};

// Get all Items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching all items:', error); 
    res.status(500).json({ error: error.message });
  }
};

// Get Item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item by ID:', error);  
    res.status(500).json({ error: error.message });
  }
};

// Update an Item by ID
exports.updateItemById = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,  // Return the updated document
      runValidators: true,  // Validate the data before updating
    });
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item by ID:', error);  // Log the error details
    res.status(400).json({ error: error.message });
  }
};

// Delete an Item by ID
exports.deleteItemById = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item by ID:', error);  // Log the error details
    res.status(500).json({ error: error.message });
  }
};