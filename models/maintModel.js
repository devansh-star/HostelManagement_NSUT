const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  problem: {
    type: String,
    required: [true, 'title to your problem is missing'],
  },
  description: {
    type: String,
    required: [true, 'Every post should have a description'],
  },
  exp: {
    type: String,
  },
  hostel: {
    type: String,
  },
});

/*
maintenanceSchema.pre('save', function (next) {
  this.exp = `${this.exp} days`;
  next();
});
*/

// exp: expected date
const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
