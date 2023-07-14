const mongoose = require('mongoose');

const messMenuSchema = new mongoose.Schema({
  hostel: {
    type: String,
    required: true,
  },
  messMenu: String,
});

const Mess = mongoose.model('Mess', messMenuSchema);
module.exports = Mess;
