const mongoose = require('mongoose');
// const User = require('./userModel');

const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  roomInfo: {
    type: String,
  },
  laundNum: {
    type: String,
    required: true,
    unique: true,
  },
  rollNum: {
    type: String,
    unique: true,
    minlength: 9,
    maxlength: 9,
  },
  blood: {
    type: String,
    required: [true, "EveryOne's blood group info is necessary"],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  year: {
    type: String,
    enum: ['1', '2', '3', '4', 'post-graduate', 'phd'],
  },
});

profileSchema.pre(/^find/, function () {
  this.populate({
    path: 'user',
    select: 'name email',
  });
});

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;
