const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: 1
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'cash', 'cheque'],
    default: 'razorpay'
  },
  transactionId: {
    type: String
  },
  razorpayPaymentId: {
    type: String
  },
  razorpayOrderId: {
    type: String
  },
  razorpaySignature: {
    type: String
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contribution', contributionSchema);
