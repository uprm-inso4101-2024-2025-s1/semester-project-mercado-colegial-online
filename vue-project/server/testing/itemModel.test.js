import Item from '../backend/models/item.js';
import { connect } from '../db.js';
import mongoose from 'mongoose';

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Item Model CRUD Operations and Validations', () => {
  let itemId;

  // Test data template
  const itemData = {
    item_name: 'Sample Item',
    price: 19.99,
    stock: 100,
    description: 'A sample item for testing purposes.',
    category: 'Electronics',
    size: 'Medium',
  };

  // Test: Creating a valid item
  it('should create a valid item', async () => {
    const item = new Item(itemData);
    const savedItem = await item.save();
    itemId = savedItem._id;
    expect(savedItem.item_name).toBe(itemData.item_name);
    expect(savedItem.price).toBe(itemData.price);
  });

  // Test: Required fields validation
  it('should throw a validation error if required fields are missing', async () => {
    const invalidItem = new Item({ description: 'Only description provided' });
    await expect(invalidItem.save()).rejects.toThrow(/is required/);
  });

  // Test: Field length constraints
  it('should throw a validation error if fields exceed length constraints', async () => {
    const invalidItem = new Item({
      ...itemData,
      item_name: 'A'.repeat(256),    // Exceeds max length of 255
      description: 'A'.repeat(1001), // Exceeds max length of 1000
    });
    await expect(invalidItem.save()).rejects.toThrow(/is longer than the maximum allowed length/);
  });

  // Test: Price and stock non-negative constraint
  it('should throw a validation error if price or stock is negative', async () => {
    const invalidItem = new Item({
      ...itemData,
      price: -10,   // Invalid negative price
      stock: -5,    // Invalid negative stock
    });
    await expect(invalidItem.save()).rejects.toThrowError();
  });

  // Test: Retrieval by ID
  it('should retrieve an item by ID', async () => {
    const item = await Item.findById(itemId);
    expect(item).not.toBeNull();
    expect(item.item_name).toBe(itemData.item_name);
  });

  // Test: Update item data
  it('should update an item by ID', async () => {
    const updatedItem = await Item.findByIdAndUpdate(itemId, { stock: 50 }, { new: true });
    expect(updatedItem).not.toBeNull();
    expect(updatedItem.stock).toBe(50);
  });

  // Test: Deletion by ID
  it('should delete an item by ID', async () => {
    await Item.findByIdAndDelete(itemId);
    const item = await Item.findById(itemId);
    expect(item).toBeNull();
  });
});
