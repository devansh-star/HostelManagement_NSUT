const mongoose = require('mongoose');

const departureSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  room: {
    type: String,
    required: [true, 'specify your room'],
  },
  nod: {
    type: Number,
  },
  gone: {
    type: Date,
    default: Date.now,
  },
  rsn: {
    type: String,
  },
  place: {
    type: String,
    required: [true, 'It is necessary to inform where are you going'],
  },
  hostel: {
    type: String,
  },
});

const Departure = mongoose.model('Departure', departureSchema);

module.exports = Departure;
