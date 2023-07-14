const express = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/management/postController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, postController.getMyPosts)
  .post(
    authController.protect,
    postController.uploadPost,
    postController.createPost
  );

router
  .route('/:id')
  .get(authController.protect, postController.getMyPost)
  .delete(authController.protect, postController.deleteMyPost);

module.exports = router;
