var Employee = require('../model/employee');
var { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');

const getEmployeeDetails = async (req, res) => {
  try {
    const getEmployee = await Employee.find();
    return res.send(OK, getEmployee);
  } catch (err) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

const getEmployeeDetailsPassingID = async (req, res) => {
  try {
    const getSpecificEmployee = await Employee.findOne({
      _id: req.params.id,
    });
    return res.send(OK, getSpecificEmployee);
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
    const getEmployee = await newEmployee.save();
    return res.send(OK, getEmployee);
  } catch (err) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

const updateEmployeeDetails = async (req, res) => {
  try {
    const getEmployee = await Employee.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { name: req.body.name } },
      { upsert: true }
    );
    return res.send(OK, getEmployee);
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
