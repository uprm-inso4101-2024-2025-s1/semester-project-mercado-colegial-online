import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/EmailConfirmation.js';


// Create User
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    await sendEmail(newUser.email, newUser._id); // Envia el email de confirmación
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: error.message });
  }
};

// Get all Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update a User by ID
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,  // Return the updated document
      runValidators: true,  // Validate the data before updating
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a User by ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    res.status(500).json({ error: error.message });
  }
};


export const confirmUser = async (req, res) => {
  const { token } = req.params;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario en la base de datos por su ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    // Actualizar el estado del usuario a confirmado
    user.isConfirmed = true;
    await user.save(); // Guardar los cambios

    // Redireccionar al usuario a la página de login
    res.redirect('http://localhost:5173/login?confirmed=true'); // Actualizar para producción
  } catch (error) {
    res.status(400).send('Enlace de confirmación inválido o expirado');
  }
};