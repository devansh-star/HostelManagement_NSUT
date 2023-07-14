const schedule = require('node-schedule');
const Vonage = require('@vonage/server-sdk');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Laundry = require('../../models/laundModel');
const User = require('../../models/userModel');
// const factory = require('../handlerFactory');

const vonage = new Vonage({
  apiKey: process.env.SMS_API_KEY,
  apiSecret: process.env.SMS_API_SECRET,
});

// for laundry incharge
exports.createReceipt = catchAsync(async (req, res, next) => {
  const existingReceipts = await Laundry.find({ phone: req.body.phone });

  // 405 is method not allowed
  if (existingReceipts.length !== 0) {
    return next(
      new AppError(
        'You have an existing Laundry Receipt, clear that before you register a new one',
        405
      )
    );
  }

  const uid = await User.find({ phoneNum: req.body.phone }, '_id');
  // console.log(uid[0]._id);

  const newReceipt = await Laundry.create({
    user: uid[0]._id,
    laundNum: req.body.laundNum,
    phone: req.body.phone,
    nod: req.body.nod,
    amount: req.body.clothes.length,
    clothes: req.body.clothes,
  });

  const retDate = new Date();
  retDate.setDate(retDate.getDate() + +req.body.nod);

  schedule.scheduleJob(retDate, async () => {
    // console.log('i had no problem executing');
    const from = 'Vonage APIs';
    const to = req.body.phone;
    const URL = `${req.protocol}://${req.get('host')}/hms/laundry`;
    const text = `Collect your laundry today, refer your account to mark your receipt : ${URL}`;

    await vonage.message.sendSms(from, to, text);
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: newReceipt,
    },
  });
});

// for student
exports.getMyLaundry = catchAsync(async (req, res, next) => {
  const myReceipt = await Laundry.find({ user: req.user._id });

  if (!myReceipt) {
    return next(new AppError('You currently have no laundry receipts', 404));
  }

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: myReceipt.length,
    data: {
      data: myReceipt,
    },
  });
});

// for laundry incharge
exports.checkStudLaundryStatus = catchAsync(async (req, res, next) => {
  const laundReceipt = await Laundry.findOne({ phone: req.body.phone });

  if (laundReceipt.length === 0) {
    return next(new AppError('Student currently has no laundry receipts', 404));
  }

  // console.log(laundReceipt);
  laundReceipt.lStatus = true;
  const newReceipt = await laundReceipt.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      data: newReceipt,
    },
  });
});

// for student
exports.laundryCollected = catchAsync(async (req, res, next) => {
  const myReceipt = await Laundry.findOne({ user: req.user._id });

  if (!myReceipt) {
    return next(new AppError('You currently have no laundry receipts', 404));
  }

  myReceipt.sStatus = true;

  if (myReceipt.lStatus === true && myReceipt.sStatus === true) {
    await Laundry.findOneAndDelete(myReceipt._id);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
