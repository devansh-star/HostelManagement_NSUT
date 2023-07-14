const mongoose = require('mongoose');

const laundrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  laundNum: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  entry: {
    type: Date,
    default: Date.now,
  },
  nod: {
    type: Number,
    default: 2,
    //required: [true, 'Every receipt should have a due date'],
  },
  amount: {
    type: Number,
    default: 0,
    required: [true, 'Every receipt should have a clothes amount'],
  },
  lStatus: {
    type: Boolean,
    default: false,
  },
  sStatus: {
    type: Boolean,
    default: false,
  },
  clothes: [
    {
      type: Map,
      of: new mongoose.Schema({
        type: String,
        amnt: Number,
        torn: Boolean,
      }),
    },
  ],
});

const Laundry = mongoose.model('Laundry', laundrySchema);

module.exports = Laundry;
