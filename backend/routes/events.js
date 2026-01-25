const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  createContributionOrder,
  contributeToEvent,
  getMyContributions
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getEvents)
  .post(protect, authorize('admin'), createEvent);

router.get('/my-contributions', protect, getMyContributions);

router.route('/:id')
  .get(protect, getEvent)
  .put(protect, authorize('admin'), updateEvent)
  .delete(protect, authorize('admin'), deleteEvent);

router.post('/:id/create-order', protect, createContributionOrder);
router.post('/:id/contribute', protect, contributeToEvent);

module.exports = router;
