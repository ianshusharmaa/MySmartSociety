const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  getAllUsers,
  toggleUserStatus
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.post('/users', protect, authorize('admin'), register);
router.put('/users/:id/toggle', protect, authorize('admin'), toggleUserStatus);

module.exports = router;
