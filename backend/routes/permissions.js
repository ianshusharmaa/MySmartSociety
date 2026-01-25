const express = require('express');
const router = express.Router();
const {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
  getPermissionStats
} = require('../controllers/permissionController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getPermissions)
  .post(protect, authorize('resident'), createPermission);

router.get('/stats', protect, authorize('admin'), getPermissionStats);

router.route('/:id')
  .get(protect, getPermission)
  .put(protect, authorize('admin'), updatePermission)
  .delete(protect, deletePermission);

module.exports = router;
