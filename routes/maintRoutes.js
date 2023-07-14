const express = require('express');
const authController = require('../controllers/authController');
const maintController = require('../controllers/management/maintController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('caretaker', 'warden'),
    maintController.getAllMaintenance
  )
  .post(
    authController.protect,
    authController.restrictTo('caretaker', 'warden'),
    maintController.newMaintenance
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('caretaker', 'warden'),
    maintController.getMaintenance
  )
  .patch(
    authController.protect,
    authController.restrictTo('caretaker', 'warden'),
    maintController.updateMaintenance
  )
  .delete(
    authController.protect,
    authController.restrictTo('caretaker', 'warden'),
    maintController.deleteMaintenance
  );

module.exports = router;
