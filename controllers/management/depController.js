const schedule = require('node-schedule');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Departure = require('../../models/depModel');
const factory = require('../handlerFactory');
const sendEmail = require('../../utils/email');

let deptJob;
exports.newDeparture = catchAsync(async (req, res, next) => {
  const existingDepts = await Departure.find();
  if (existingDepts.length !== 0) {
    return next(
      new AppError(
        'You have an existing Departure, clear that before you register a new one',
        500
      )
    );
  }

  const dept = await Departure.create({
    room: req.body.room,
    nod: req.body.nod,
    rsn: req.body.reason,
    place: req.body.place,
    user: req.user._id,
    hostel: req.user.hostel,
  });

  // schedule the job
  const retDate = new Date();
  retDate.setDate(retDate.getDate() + +req.body.nod);

  const URL = `${req.protocol}://${req.get('host')}/hms/departure`;

  const message = `Your departure was suppose to end today i.e. ${req.body.nod} days. Either extend your stay or if have completed your departure then use this link to mark your entry ${URL}
  . Refer to this url if you want to extend your leave.`;

  deptJob = schedule.scheduleJob(retDate, async () => {
    try {
      await sendEmail({
        email: req.user.email,
        subject: 'Departure complete notice',
        message,
      });
    } catch (err) {
      // console.log(err);
      return next(
        new AppError(
          'There was an error sending an email, try sending later',
          500
        )
      );
    }
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: dept,
    },
  });
});

exports.getMyDeparture = factory.getAll(Departure);

exports.deleteMyDepartures = factory.deleteOne(Departure);

exports.updateMyDepartures = catchAsync(async (req, res, next) => {
  const updateDep = await Departure.findById(req.params.id);

  if (!updateDep) {
    return next(new AppError('No departures found', 404));
  }

  updateDep.nod = req.body.nod;
  updateDep.reason = req.body.reason;
  updateDep.place = req.body.place;

  // schedule the job
  const retDate = new Date();
  // we added the + before req.body.nod to change it to number
  retDate.setSeconds(retDate.getSeconds() + +req.body.nod);

  const URL = `${req.protocol}://${req.get('host')}/hms/departure`;

  const message = `Your extended departure was suppose to end today i.e. ${updateDep.nod} days. Either extend your stay or if have completed your departure then use this link to mark your entry ${URL}
    . Refer to this url if you want to extend your leave.`;

  schedule.scheduleJob(retDate, async () => {
    try {
      deptJob.cancel();
      await sendEmail({
        email: req.user.email,
        subject: 'Departure complete notice',
        message,
      });
    } catch (err) {
      // console.log(err);
      return next(
        new AppError(
          'There was an error sending an email, try sending later',
          500
        )
      );
    }
  });

  await updateDep.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      data: updateDep,
    },
  });
});

exports.getAdminDepartures = catchAsync(async (req, res, next) => {
  const dept = await Departure.find({
    hostel: req.user.hostel,
  });

  if (!dept) {
    return next(new AppError('No departures found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: dept,
    },
  });
});
