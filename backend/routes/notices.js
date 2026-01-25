const express = require('express');
const router = express.Router();
const {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice
} = require('../controllers/noticeController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getNotices)
  .post(protect, authorize('admin'), createNotice);

router.route('/:id')
  .get(protect, getNotice)
  .put(protect, authorize('admin'), updateNotice)
  .delete(protect, authorize('admin'), deleteNotice);

module.exports = router;
