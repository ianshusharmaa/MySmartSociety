const Complaint = require('../models/Complaint');

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private
exports.getComplaints = async (req, res) => {
  try {
    let query = {};

    // If resident, only show their complaints
    if (req.user.role === 'resident') {
      query.resident = req.user._id;
    }

    const complaints = await Complaint.find(query)
      .populate('resident', 'name email flatNumber building phone')
      .sort('-createdAt');

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private
exports.getComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('resident', 'name email flatNumber building phone');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check if user is authorized to view this complaint
    if (req.user.role === 'resident' && complaint.resident._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private (Resident)
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description, priority } = req.body;

    const complaint = await Complaint.create({
      title,
      category,
      description,
      priority: priority || 'medium',
      resident: req.user._id
    });

    const populatedComplaint = await Complaint.findById(complaint._id)
      .populate('resident', 'name email flatNumber building phone');

    res.status(201).json(populatedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update complaint
// @route   PUT /api/complaints/:id
// @access  Private (Admin/Staff)
exports.updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    const { status, priority, remarks, category, assignedName, assignedNumber } = req.body;

    if (status) complaint.status = status;
    if (priority) complaint.priority = priority;
    if (remarks) complaint.remarks = remarks;
    if (category) complaint.category = category;
    if (assignedName) complaint.assignedName = assignedName;
    if (assignedNumber) complaint.assignedNumber = assignedNumber;

    await complaint.save();

    const updatedComplaint = await Complaint.findById(complaint._id)
      .populate('resident', 'name email flatNumber building phone');

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private (Admin)
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    await complaint.deleteOne();
    res.json({ message: 'Complaint removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get complaint statistics
// @route   GET /api/complaints/stats
// @access  Private (Admin)
exports.getComplaintStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: 'pending' });
    const inProgress = await Complaint.countDocuments({ status: 'in-progress' });
    const resolved = await Complaint.countDocuments({ status: 'resolved' });

    const byCategory = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      total,
      pending,
      inProgress,
      resolved,
      byCategory
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
