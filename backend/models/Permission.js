const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Permission type is required'],
    enum: ['event', 'party', 'renovation', 'guest-stay', 'parking', 'loud-music', 'moving', 'other']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  remarks: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  }
});

permissionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if ((this.status === 'approved' || this.status === 'rejected') && !this.reviewedAt) {
    this.reviewedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Permission', permissionSchema);
