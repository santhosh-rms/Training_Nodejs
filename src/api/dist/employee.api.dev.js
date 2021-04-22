"use strict";

var Employee = require('../model/employee');

var _require = require('http-status-codes'),
    OK = _require.OK,
    INTERNAL_SERVER_ERROR = _require.INTERNAL_SERVER_ERROR;

var getEmployeeDetails = function getEmployeeDetails(req, res) {
  var getEmployee;
  return regeneratorRuntime.async(function getEmployeeDetails$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Employee.find());

        case 3:
          getEmployee = _context.sent;
          return _context.abrupt("return", res.send(OK, getEmployee));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.sendStatus(INTERNAL_SERVER_ERROR);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getEmployeeDetailsPassingID = function getEmployeeDetailsPassingID(req, res) {
  var getSpecificEmployee;
  return regeneratorRuntime.async(function getEmployeeDetailsPassingID$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Employee.findOne({
            _id: req.params.id
          }));

        case 3:
          getSpecificEmployee = _context2.sent;
          return _context2.abrupt("return", res.send(OK, getSpecificEmployee));

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.sendStatus(INTERNAL_SERVER_ERROR);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var postEmployeeDetails = function postEmployeeDetails(req, res) {
  var newEmployee, getEmployee;
  return regeneratorRuntime.async(function postEmployeeDetails$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(new Employee());

        case 3:
          newEmployee = _context3.sent;
          newEmployee.name = req.body.name;
          newEmployee.role = req.body.role;
          newEmployee.phoneNumber = req.body.phoneNumber;
          _context3.next = 9;
          return regeneratorRuntime.awrap(newEmployee.save());

        case 9:
          getEmployee = _context3.sent;
          return _context3.abrupt("return", res.send(OK, getEmployee));

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.sendStatus(INTERNAL_SERVER_ERROR);

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

var updateEmployeeDetails = function updateEmployeeDetails(req, res) {
  var getEmployee;
  return regeneratorRuntime.async(function updateEmployeeDetails$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Employee.findOneAndUpdate({
            _id: req.params.id
          }, {
            $set: {
              name: req.body.name
            }
          }, {
            upsert: true
          }));

        case 3:
          getEmployee = _context4.sent;
          return _context4.abrupt("return", res.send(OK, getEmployee));

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.sendStatus(INTERNAL_SERVER_ERROR);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var deleteEmployeeDetails = function deleteEmployeeDetails(req, res) {
  return regeneratorRuntime.async(function deleteEmployeeDetails$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Employee.findOneAndRemove({
            _id: req.params.id
          }, function (err, employee) {
            res.status(OK);
          }));

        case 3:
          _context5.next = 8;
          break;

        case 5:
          _context5.prev = 5;
          _context5.t0 = _context5["catch"](0);
          res.status(500);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

module.exports = {
  getEmployeeDetails: getEmployeeDetails,
  getEmployeeDetailsPassingID: getEmployeeDetailsPassingID,
  postEmployeeDetails: postEmployeeDetails,
  updateEmployeeDetails: updateEmployeeDetails,
  deleteEmployeeDetails: deleteEmployeeDetails
};