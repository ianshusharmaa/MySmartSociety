const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  period: {
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    year: {
      type: Number,
      required: true
    }
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  },
  paymentDate: {
    type: Date
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'cash', 'cheque', 'bank-transfer'],
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
  receiptUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for unique maintenance per resident per month
maintenanceSchema.index({ resident: 1, 'period.month': 1, 'period.year': 1 }, { unique: true });

module.exports = mongoose.model('Maintenance', maintenanceSchema);
