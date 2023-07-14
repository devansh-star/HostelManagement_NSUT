const Maintenance = require('../../models/maintModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('../handlerFactory');

exports.newMaintenance = factory.createOne(Maintenance);
exports.updateMaintenance = factory.updateOne(Maintenance);
exports.deleteMaintenance = factory.deleteOne(Maintenance);
exports.getAllMaintenance = factory.getAll(Maintenance);
exports.getMaintenance = factory.getOne(Maintenance);
