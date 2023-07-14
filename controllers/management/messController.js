/* eslint-disable camelcase */
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const cloudinary = require('../../utils/cloudinaryUpload');
const Mess = require('../../models/messModel');
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
    folder: 'mess',
    // allowedFormats: ['jpg', 'jpeg', 'png'],
    // transformation: [{ width: 960, height: 960, crop: "limit" }],
    // filename: (req, file, callback) => {
    // const name = `${req.file.fieldname}-${Date.now()}${path.extname(req.file.originalname)}`;
    // callback(undefined, name);
    // }
  },
});

exports.uploadMess = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: multerFilter,
}).single('mess');

exports.newMessMenu = catchAsync(async (req, res, next) => {
  const menu = await Mess.create({
    hostel: req.body.hostel,
    messMenu: req.file.path,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: menu,
    },
  });
});

exports.deleteCurrentMenu = catchAsync(async (req, res, next) => {
  const menu = await Mess.findOneAndDelete({
    hostel: req.user.hostel,
  });

  if (!menu) {
    return next(new AppError('No menu found with that data', 404));
  }

  const truncateBefore = function (str, pattern) {
    return str.slice(str.indexOf(pattern) + pattern.length);
  };

  // public id is name of the image
  const public_id = truncateBefore(menu.messMenu, 'mess/').split('.')[0];
  // console.log(public_id);

  cloudinary.uploader.destroy(`mess/${public_id}`, function (error, result) {
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

exports.getCurrentMenu = catchAsync(async (req, res, next) => {
  const menu = await Mess.findOne({ hostel: req.user.hostel });

  if (!menu) {
    return next(new AppError('No menu found with that data', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: menu,
    },
  });
});

exports.getAllMenu = factory.getAll(Mess);
