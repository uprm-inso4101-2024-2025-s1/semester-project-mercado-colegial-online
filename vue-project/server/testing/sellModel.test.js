import Sell from '../backend/models/sell.js';
import User from '../backend/models/user.js';
import Item from '../backend/models/item.js';
import { connect } from '../db.js';
import mongoose from 'mongoose';

beforeAll(async () => {
  await connect(); // Connect to the database before tests
});

afterAll(async () => {
  await mongoose.disconnect(); // Disconnect after tests
});

describe('Sell Model DELETE Operations', () => {
  let userId;
  let itemId;
  let sellId;

  // Create test data for referenced user and item
  beforeAll(async () => {
    // Create a user for testing
    const user = new User({
      username: 'testUser',
      email: 'test@example.com',
      password: 'securepassword',
      student_num: 123456789,
      role: 'student',
      card_num: '4111111111111111',
      card_name: 'Test User',
      cvv: '123',
      card_zip: '12345',
      shipping_zip: '12345',
      addr_line_1: '123 Sample St',
      city: 'Sample City',
    });
    const savedUser = await user.save();
    userId = savedUser._id;

    // Create an item for testing
    const item = new Item({
      item_name: 'Sample Item',
      price: 19.99,
      stock: 50,
      description: 'A sample item for testing purposes.',
    });
    const savedItem = await item.save();
    itemId = savedItem._id;
  });

  // Cleanup the test data
  afterAll(async () => {
    await User.findByIdAndDelete(userId);
    await Item.findByIdAndDelete(itemId);
  });

//   // Test: Create a valid sell
//   it('should create a valid sell', async () => {
//     const sellData = {
//       user_id: userId,
//       item_id: itemId,
//       quantity: 3,
//       price: 59.97,
//     };

//     const sell = new Sell(sellData);
//     const savedSell = await sell.save();
//     sellId = savedSell._id;

//     // Verify that the sell was created correctly
//     expect(savedSell.user_id.toString()).toBe(userId.toString());
//     expect(savedSell.item_id.toString()).toBe(itemId.toString());
//     expect(savedSell.quantity).toBe(sellData.quantity);
//     expect(savedSell.price).toBe(sellData.price);
//   });

//   Test: Delete a sell by ID
  it('should delete a sell by ID', async () => {
    await Sell.findByIdAndDelete(sellId);
    const sell = await Sell.findById(sellId);

    // Verify that the sell was deleted
    expect(sell).toBeNull();
  });
});
