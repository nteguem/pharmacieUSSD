const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function createUser(userData) {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return { success: true, message: 'Utilisateur créé avec succès' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function updateUser(userId, updatedData) {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user) {
      return { success: false, error: 'Utilisateur non trouvé' };
    }
    return { success: true, message: 'Utilisateur mis à jour avec succès', user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function deleteUser(userId) {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return { success: false, error: 'Utilisateur non trouvé' };
    }
    return { success: true, message: 'Utilisateur supprimé avec succès' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function listUsers() {
  try {
    const users = await User.find();
    return { success: true, users };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function authenticateUser(username, password) {
  try {
    const user = await User.findOne({ username });
    const isMatch = await user.comparePassword(password);

    if (!user || !isMatch) {
      return { success: false, error: 'Nom d\'utilisateur ou mot de passe incorrect' };
    }
    const token = generateToken(user);
    return { success: true, token };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function generateToken(user) {
  const token = jwt.sign({ userId: user._id }, 'pharmacie_rca', { expiresIn: '24h' });
  return token;
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  listUsers,
  authenticateUser
};
