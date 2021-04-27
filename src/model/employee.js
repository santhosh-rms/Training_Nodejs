var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  name: String,
  role: String,
  phoneNumber: Number
});

module.exports = mongoose.model('Employee', EmployeeSchema);