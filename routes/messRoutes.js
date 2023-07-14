const express = require('express');
const authController = require('../controllers/authController');
const messController = require('../controllers/management/messController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('mess-incharge'),
    messController.uploadMess,
    messController.newMessMenu
  )
  .get(authController.protect, messController.getCurrentMenu)
  .delete(
    authController.protect,
    authController.restrictTo('mess-incharge'),
    messController.deleteCurrentMenu
  );

router
  .route('/menu')
  .get(
    authController.protect,
    authController.restrictTo('warden owner'),
    messController.getAllMenu
  );

module.exports = router;
