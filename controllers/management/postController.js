/* eslint-disable camelcase */
const multer = require('multer');
const schedule = require('node-schedule');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const cloudinary = require('../../utils/cloudinaryUpload');
const Post = require('../../models/postModel');
const factory = require('../handlerFactory');

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(
      new AppError('Not an image! Please upload only images.', 400),
      false
    );
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req, file) =>
      `${file.originalname.split('.')[0]}-${Date.now()}`,
    folder: 'posts',
  },
});

exports.uploadPost = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: multerFilter,
}).single('post');

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create({
    user: req.user._id,
    to: req.body.to,
    image: req.file.path,
    title: req.body.title,
    des: req.body.des,
    org: req.body.org,
  });

  // console.log(req.user.hostel);

  const today = new Date();
  today.setDate(today.getDate() + 5);

  schedule.scheduleJob(today, async () => {
    const truncateBefore = function (str, pattern) {
      return str.slice(str.indexOf(pattern) + pattern.length);
    };

    // public id is name of the image
    const public_id = truncateBefore(req.file.path, 'posts/').split('.')[0];
    // console.log(public_id);

    cloudinary.uploader.destroy(`posts/${public_id}`, function (error, result) {
      if (error) {
        return next(
          new AppError(`Error during cloudinary Destroy: ${error.message}`, 401)
        );
      }
      // console.log(result);
    });

    await Post.findByIdAndDelete(post._id);
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: post,
    },
  });
});

exports.getMyPosts = factory.getAll(Post);

exports.deleteMyPost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError('No post found with that data', 404));
  }
  const truncateBefore = function (str, pattern) {
    return str.slice(str.indexOf(pattern) + pattern.length);
  };

  // public id is name of the image
  const public_id = truncateBefore(post.image, 'posts/').split('.')[0];
  // console.log(public_id);

  cloudinary.uploader.destroy(`posts/${public_id}`, function (error, result) {
    if (error) {
      return next(
        new AppError(`Error during cloudinary Destroy: ${error.message}`, 401)
      );
    }
    // console.log(result);
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMyPost = factory.getOne(Post);
