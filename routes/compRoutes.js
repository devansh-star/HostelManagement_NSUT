const express = require('express');
const authController = require('../controllers/authController');
const compController = require('../controllers/management/compController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, compController.getMyComplaints)
  .post(authController.protect, compController.newComplaint);

router
  .route('/:id')
  .delete(authController.protect, compController.deleteMyComplaints);

router
  .route('/sol')
  .get(
    authController.protect,
    authController.restrictTo('mess-incharge', 'caretaker', 'laundry-incharge'),
    compController.getAdminComplaints
  );
router
  .route('/sol/:id')
  .patch(
    authController.protect,
    authController.restrictTo('mess-incharge', 'caretaker', 'laundry-incharge'),
    compController.resolveComplaints
  );

module.exports = router;
