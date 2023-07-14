const express = require('express');
const laundryController = require('../controllers/management/laundryController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.protect, laundryController.getMyLaundry);
router.post(
  '/new-receipt',
  authController.protect,
  authController.restrictTo('laundry-incharge'),
  laundryController.createReceipt
);

router.patch(
  '/check-laundry',
  authController.protect,
  authController.restrictTo('laundry-incharge'),
  laundryController.checkStudLaundryStatus
);

router.delete(
  '/collected',
  authController.protect,
  laundryController.laundryCollected
);

module.exports = router;
