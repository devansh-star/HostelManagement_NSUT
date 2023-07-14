const express = require('express');
const profileController = require('../controllers/management/profileController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.protect, profileController.getMyProfile);

router.patch(
  '/update-me',
  authController.protect,
  profileController.updateMyProfile
);

router.get(
  '/get-all-profiles',
  authController.protect,
  authController.restrictTo('caretaker warden'),
  profileController.getMyProfile
);

module.exports = router;
