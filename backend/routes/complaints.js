const express = require('express');
const router = express.Router();
const {
  getComplaints,
  getComplaint,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaintStats
} = require('../controllers/complaintController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getComplaints)
  .post(protect, authorize('resident'), createComplaint);

router.get('/stats', protect, authorize('admin'), getComplaintStats);

router.route('/:id')
  .get(protect, getComplaint)
  .put(protect, authorize('admin', 'staff'), updateComplaint)
  .delete(protect, authorize('admin'), deleteComplaint);

module.exports = router;
