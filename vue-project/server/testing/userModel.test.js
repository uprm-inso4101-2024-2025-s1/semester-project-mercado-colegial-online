import User from '../backend/models/user.js';
import { connect } from '../db.js';
import mongoose from 'mongoose';

beforeAll(async () => {
  await connect();  // Connect to the database before tests run
});

afterAll(async () => {
  await mongoose.disconnect();  // Disconnect after all tests complete
});


describe('User Model CRUD Operations and Validations', () => {
  let userId;

  // Test data template
  const userData = {
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
  };

  // Test: Creating a valid user
  it('should create a valid user', async () => {
    const user = new User(userData);
    const savedUser = await user.save();
    userId = savedUser._id;
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
  });

  // Test: Duplicate email and student_num validation
  it('should throw an error for duplicate email or student_num', async () => {
    const duplicateUser = new User(userData); // Using same data as above
    await expect(duplicateUser.save()).rejects.toThrow(/duplicate key error/);
  });

  // Test: Required field validation
  it('should throw a validation error if required fields are missing', async () => {
    const invalidUser = new User({ email: 'new@example.com' }); // Missing many required fields
    await expect(invalidUser.save()).rejects.toThrow(/is required/);
  });

  // Test: Field length constraints
  it('should throw a validation error if fields do not meet length constraints', async () => {
    const invalidUser = new User({
      ...userData,
      password: 'short',            // Too short
      cvv: '12',                    // Too short
      card_num: '12345678901234567' // Too long
    });
    await expect(invalidUser.save()).rejects.toThrow(/is shorter than the minimum allowed length|is longer than the maximum allowed length/);
  });

  // Test: Retrieval by ID
  it('should retrieve a user by ID', async () => {
    const user = await User.findById(userId);
    expect(user).not.toBeNull();
    expect(user.username).toBe(userData.username);
  });

  // Test: Update user data
  it('should update a user by ID', async () => {
    const updatedUser = await User.findByIdAndUpdate(userId, { username: 'updatedUser' }, { new: true });
    expect(updatedUser).not.toBeNull();
    expect(updatedUser.username).toBe('updatedUser');
  });

  // Test: Deletion by ID
  it('should delete a user by ID', async () => {
    await User.findByIdAndDelete(userId);
    const user = await User.findById(userId);
    expect(user).toBeNull();
  });
});