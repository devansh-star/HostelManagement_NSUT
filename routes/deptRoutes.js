const express = require('express');
const authController = require('../controllers/authController');
const deptController = require('../controllers/management/depController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, deptController.getMyDeparture)
  .post(authController.protect, deptController.newDeparture);

router
  .route('/:id')
  .patch(authController.protect, deptController.updateMyDepartures)
  .delete(authController.protect, deptController.deleteMyDepartures);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo(
      'caretaker warden mess-incharge laundry-incharge'
    ),
    deptController.getAdminDepartures
  );

module.exports = router;
