var Employee = require('../model/employee');
var { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status-codes');

const getEmployeeDetails = async (req, res) => {
  try {
    await Employee.find({}).exec((err, employees) => {
      return res.send(OK, employees);
    });
  } catch (err) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

const getEmployeeDetailsPassingID = async (req, res) => {
  try {
    await Employee.findOne({
      _id: req.params.id,
    }).exec((err, employees) => {
      return res.send(OK, employees);
    });
  } catch (err) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

const postEmployeeDetails = async (req, res) => {
  try {
    var newEmployee = await new Employee();
    newEmployee.name = req.body.name;
    newEmployee.role = req.body.role;
    newEmployee.phoneNumber = req.body.phoneNumber;
    await newEmployee.save((err, employee) => {
      return res.send(OK, employee);
    });
  } catch (err) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

const updateEmployeeDetails = async (req, res) => {
  try {
    await Employee.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { name: req.body.name } },
      { upsert: true },
      (err, newEmployee) => {
        return res.send(OK, newEmployee);
      }
    );
  } catch (err) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

const deleteEmployeeDetails = async (req, res) => {
  try {
    await Employee.findOneAndRemove(
      {
        _id: req.params.id,
      },
      (err, employee) => {
        res.status(OK);
      }
    );
  } catch (err) {
    res.status(500);
  }
};

module.exports = {
  getEmployeeDetails,
  getEmployeeDetailsPassingID,
  postEmployeeDetails,
  updateEmployeeDetails,
  deleteEmployeeDetails,
};
