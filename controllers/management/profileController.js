const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Profile = require('../../models/profModel');
const User = require('../../models/userModel');
const factory = require('../handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  // ... operator takes all arguments and makes a array out of them
  // object.keys takes all the key feilds of the object and creates an array out of them
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMyProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.find({ user: req.user._id });
  if (!profile) {
    return next(new AppError('No profile found for the logged in user.', 404));
  }

  res.status(200).json({
    status: 'success',
    results: profile.length,
    data: {
      data: profile,
    },
  });
});

exports.updateMyProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOneAndUpdate(
    { user: req.user._id },
    {
      roomInfo: req.body.roomInfo,
      laundNum: req.body.laundNum,
      rollNum: req.body.rollNum,
      blood: req.body.blood,
      year: req.body.year,
    }
  );

  if (!profile) {
    return next(new AppError('No profile found for user', 404));
  }

  //update user data
  const filterObject = filterObj(req.body, 'name', 'email', 'phone');

  await User.findByIdAndUpdate(req.user.id, filterObject, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: profile,
    },
  });
});

exports.getAllProfiles = factory.getAll(Profile);
