const Maintenance = require('../models/Maintenance');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Get all maintenance records
// @route   GET /api/maintenance
// @access  Private
exports.getMaintenanceRecords = async (req, res) => {
  try {
    let query = {};

    // If resident, only show their records
    if (req.user.role === 'resident') {
      query.resident = req.user._id;
    }

    const records = await Maintenance.find(query)
      .populate('resident', 'name email flatNumber building phone')
      .sort('-period.year -period.month');

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single maintenance record
// @route   GET /api/maintenance/:id
// @access  Private
exports.getMaintenanceRecord = async (req, res) => {
  try {
    const record = await Maintenance.findById(req.params.id)
      .populate('resident', 'name email flatNumber building phone');

    if (!record) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }

    // Check authorization
    if (req.user.role === 'resident' && record.resident._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create maintenance record
// @route   POST /api/maintenance
// @access  Private (Admin)
exports.createMaintenanceRecord = async (req, res) => {
  try {
    const { resident, amount, month, year, dueDate } = req.body;

    const record = await Maintenance.create({
      resident,
      amount,
      period: { month, year },
      dueDate
    });

    const populatedRecord = await Maintenance.findById(record._id)
      .populate('resident', 'name email flatNumber building phone');

    res.status(201).json(populatedRecord);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Maintenance record already exists for this period' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Razorpay order
// @route   POST /api/maintenance/:id/create-order
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const record = await Maintenance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }

    if (record.status === 'paid') {
      return res.status(400).json({ message: 'Maintenance already paid' });
    }

    // Check authorization
    if (req.user.role === 'resident' && record.resident.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const options = {
      amount: record.amount * 100, // amount in paise
      currency: 'INR',
      receipt: `maint_${record._id}`,
      notes: {
        maintenanceId: record._id.toString(),
        residentId: req.user._id.toString()
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: record.amount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify payment and update record
// @route   POST /api/maintenance/:id/verify-payment
// @access  Private
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const record = await Maintenance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Maintenance record not found' });
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      record.status = 'paid';
      record.paymentDate = Date.now();
      record.razorpayPaymentId = razorpay_payment_id;
      record.razorpayOrderId = razorpay_order_id;
      record.razorpaySignature = razorpay_signature;
      record.transactionId = razorpay_payment_id;

      await record.save();

      const populatedRecord = await Maintenance.findById(record._id)
        .populate('resident', 'name email flatNumber building phone');

      res.json({
        success: true,
        message: 'Payment verified successfully',
        record: populatedRecord
      });
    } else {
      res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment history
// @route   GET /api/maintenance/history
// @access  Private
exports.getPaymentHistory = async (req, res) => {
  try {
    const history = await Maintenance.find({
      resident: req.user._id,
      status: 'paid'
    })
      .sort('-paymentDate')
      .populate('resident', 'name email flatNumber building');

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get maintenance statistics
// @route   GET /api/maintenance/stats
// @access  Private (Admin)
exports.getMaintenanceStats = async (req, res) => {
  try {
    const total = await Maintenance.countDocuments();
    const paid = await Maintenance.countDocuments({ status: 'paid' });
    const pending = await Maintenance.countDocuments({ status: 'pending' });
    const overdue = await Maintenance.countDocuments({ status: 'overdue' });

    const totalAmount = await Maintenance.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const collectedAmount = await Maintenance.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      total,
      paid,
      pending,
      overdue,
      totalAmount: totalAmount[0]?.total || 0,
      collectedAmount: collectedAmount[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
