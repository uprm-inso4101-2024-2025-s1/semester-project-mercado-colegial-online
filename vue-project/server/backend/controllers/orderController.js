import Order from '../models/order.js';  // Import Order model

// Create an Order
export const createOrder = async (req, res) => {
  try {
    // Convert user_id to ObjectId
    const { user_id, total_price } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: 'Invalid user_id format' });
    }

    const newOrder = new Order({
      user_id: mongoose.Types.ObjectId(user_id), // Ensure user_id is an ObjectId
      total_price,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get all Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get an Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update an Order by ID
export const updateOrderById = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,  // Return the updated document
      runValidators: true,  // Validate the data before updating
    });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order by ID:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete an Order by ID
export const deleteOrderById = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order by ID:', error);
    res.status(500).json({ error: error.message });
  }
};
