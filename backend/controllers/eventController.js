const Event = require('../models/Event');
const Contribution = require('../models/Contribution');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Get all events
// @route   GET /api/events
// @access  Private
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'name email')
      .sort('-createdAt');

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Private
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Get contributors
    const contributors = await Contribution.find({ event: req.params.id })
      .populate('resident', 'name flatNumber building')
      .sort('-createdAt');

    res.json({ event, contributors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, targetAmount, startDate, endDate } = req.body;

    const event = await Event.create({
      title,
      description,
      category,
      targetAmount,
      startDate,
      endDate,
      createdBy: req.user._id
    });

    const populatedEvent = await Event.findById(event._id)
      .populate('createdBy', 'name email');

    res.status(201).json(populatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { title, description, targetAmount, startDate, endDate, status } = req.body;

    if (title) event.title = title;
    if (description) event.description = description;
    if (targetAmount) event.targetAmount = targetAmount;
    if (startDate) event.startDate = startDate;
    if (endDate) event.endDate = endDate;
    if (status) event.status = status;

    await event.save();

    const updatedEvent = await Event.findById(event._id)
      .populate('createdBy', 'name email');

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await event.deleteOne();
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Razorpay order for contribution
// @route   POST /api/events/:id/create-order
// @access  Private
exports.createContributionOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!amount || Number.isNaN(Number(amount)) || Number(amount) < 1) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: 'Payment gateway not configured. Contact admin.' });
    }

    // Razorpay requires receipt <= 40 chars; use short id + short timestamp
    const shortId = event._id.toString().slice(-8);
    const ts = Date.now().toString().slice(-6);
    const receipt = `ev_${shortId}_${ts}`;

    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt,
      notes: {
        eventId: event._id.toString(),
        residentId: req.user._id.toString()
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: amount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    const errMsg = error?.error?.description || error.message || 'Failed to create order';
    res.status(500).json({ message: errMsg });
  }
};

// @desc    Verify payment and create contribution
// @route   POST /api/events/:id/contribute
// @access  Private
exports.contributeToEvent = async (req, res) => {
  try {
    const { amount, razorpay_payment_id, razorpay_order_id, razorpay_signature, message } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const contribution = await Contribution.create({
        event: event._id,
        resident: req.user._id,
        amount,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature,
        transactionId: razorpay_payment_id,
        message
      });

      // Update event collected amount
      event.collectedAmount += amount;
      await event.save();

      const populatedContribution = await Contribution.findById(contribution._id)
        .populate('resident', 'name email flatNumber building')
        .populate('event', 'title category');

      res.status(201).json({
        success: true,
        message: 'Contribution successful',
        contribution: populatedContribution
      });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    const errMsg = error?.error?.description || error.message || 'Contribution failed';
    res.status(500).json({ message: errMsg });
  }
};

// @desc    Get user's contributions
// @route   GET /api/events/my-contributions
// @access  Private
exports.getMyContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find({ resident: req.user._id })
      .populate('event', 'title category targetAmount')
      .sort('-createdAt');

    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
