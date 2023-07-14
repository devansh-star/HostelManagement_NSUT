const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A complaint should have a author'],
  },
  to: {
    type: String,
    required: [true, 'Every problem should be directed to a person'],
    enum: ['caretaker', 'mess-incharge', 'laundry-incharge', 'warden'],
  },
  problem: {
    type: String,
    required: [true, 'title to your problem is missing'],
  },
  des: {
    type: String,
    required: [true, 'Every post should have a description'],
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'solved'],
  },
  hostel: {
    type: String,
  },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
