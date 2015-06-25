var mongoose = require('mongoose');

exports.User = mongoose.model('User', require('./user.model'));
exports.Instance = mongoose.model('Instance', require('./instance.model'));
exports.Tariff = mongoose.model('Tariff', require('./tariff.model'));
exports.Payments = mongoose.model('Payments', require('./payments.model'));