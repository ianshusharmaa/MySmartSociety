const Permission = require('../models/Permission');

// @desc    Get all permissions
// @route   GET /api/permissions
// @access  Private
exports.getPermissions = async (req, res) => {
  try {
    let query = {};

    // If resident, only show their permissions
    if (req.user.role === 'resident') {
      query.resident = req.user._id;
    }

    const permissions = await Permission.find(query)
      .populate('resident', 'name email flatNumber building phone')
      .populate('approvedBy', 'name email')
      .sort('-createdAt');

    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single permission
// @route   GET /api/permissions/:id
// @access  Private
exports.getPermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id)
      .populate('resident', 'name email flatNumber building phone')
      .populate('approvedBy', 'name email');

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    // Check if user is authorized
    if (req.user.role === 'resident' && permission.resident._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create permission request
// @route   POST /api/permissions
// @access  Private (Resident)
exports.createPermission = async (req, res) => {
  try {
    const { type, title, description, startDate, endDate } = req.body;

    const permission = await Permission.create({
      type,
      title,
      description,
      startDate,
      endDate,
      resident: req.user._id
    });

    const populatedPermission = await Permission.findById(permission._id)
      .populate('resident', 'name email flatNumber building phone');

    res.status(201).json(populatedPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update permission (Approve/Reject)
// @route   PUT /api/permissions/:id
// @access  Private (Admin)
exports.updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    const { status, remarks } = req.body;

    if (status) {
      permission.status = status;
      permission.approvedBy = req.user._id;
      permission.reviewedAt = Date.now();
    }
    if (remarks) permission.remarks = remarks;

    await permission.save();

    const updatedPermission = await Permission.findById(permission._id)
      .populate('resident', 'name email flatNumber building phone')
      .populate('approvedBy', 'name email');

    res.json(updatedPermission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete permission
// @route   DELETE /api/permissions/:id
// @access  Private (Admin or Own)
exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({ message: 'Permission not found' });
    }

    // Check authorization
    if (req.user.role !== 'admin' && permission.resident.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await permission.deleteOne();
    res.json({ message: 'Permission removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get permission statistics
// @route   GET /api/permissions/stats
// @access  Private (Admin)
exports.getPermissionStats = async (req, res) => {
  try {
    const total = await Permission.countDocuments();
    const pending = await Permission.countDocuments({ status: 'pending' });
    const approved = await Permission.countDocuments({ status: 'approved' });
    const rejected = await Permission.countDocuments({ status: 'rejected' });

    const byType = await Permission.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    res.json({
      total,
      pending,
      approved,
      rejected,
      byType
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
