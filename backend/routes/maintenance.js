const express = require('express');
const router = express.Router();
const {
  getMaintenanceRecords,
  getMaintenanceRecord,
  createMaintenanceRecord,
  createOrder,
  verifyPayment,
  getPaymentHistory,
  getMaintenanceStats
} = require('../controllers/maintenanceController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getMaintenanceRecords)
  .post(protect, authorize('admin'), createMaintenanceRecord);

router.get('/history', protect, getPaymentHistory);
router.get('/stats', protect, authorize('admin'), getMaintenanceStats);

router.get('/:id', protect, getMaintenanceRecord);
router.post('/:id/create-order', protect, createOrder);
router.post('/:id/verify-payment', protect, verifyPayment);

module.exports = router;
