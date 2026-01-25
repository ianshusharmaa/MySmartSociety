const Notice = require('../models/Notice');

// @desc    Get all notices
// @route   GET /api/notices
// @access  Private
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ isActive: true })
      .populate('createdBy', 'name email')
      .sort('-createdAt');

    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single notice
// @route   GET /api/notices/:id
// @access  Private
exports.getNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new notice
// @route   POST /api/notices
// @access  Private (Admin)
exports.createNotice = async (req, res) => {
  try {
    const { title, content, category, priority, expiryDate } = req.body;

    const notice = await Notice.create({
      title,
      content,
      category,
      priority: priority || 'medium',
      expiryDate,
      createdBy: req.user._id
    });

    const populatedNotice = await Notice.findById(notice._id)
      .populate('createdBy', 'name email');

    res.status(201).json(populatedNotice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update notice
// @route   PUT /api/notices/:id
// @access  Private (Admin)
exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    const { title, content, category, priority, isActive, expiryDate } = req.body;

    if (title) notice.title = title;
    if (content) notice.content = content;
    if (category) notice.category = category;
    if (priority) notice.priority = priority;
    if (typeof isActive !== 'undefined') notice.isActive = isActive;
    if (expiryDate) notice.expiryDate = expiryDate;

    await notice.save();

    const updatedNotice = await Notice.findById(notice._id)
      .populate('createdBy', 'name email');

    res.json(updatedNotice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete notice
// @route   DELETE /api/notices/:id
// @access  Private (Admin)
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await notice.deleteOne();
    res.json({ message: 'Notice removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
