"use strict";

var Employee = require('../model/employee');

var User = require('../model/user');

var _require = require('../helpers/hashing'),
    hashGenerate = _require.hashGenerate;

var _require2 = require('../helpers/hashing'),
    hashValidator = _require2.hashValidator;

var _require3 = require('../helpers/token'),
    tokenGenerator = _require3.tokenGenerator;

var _require4 = require('http-status-codes'),
    OK = _require4.OK,
    INTERNAL_SERVER_ERROR = _require4.INTERNAL_SERVER_ERROR;

var signinuser = function signinuser(req, res) {
  var existingUser, checkUser, token;
  return regeneratorRuntime.async(function signinuser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 3:
          existingUser = _context.sent;

          if (existingUser) {
            _context.next = 8;
            break;
          }

          res.send('Email is Invalid');
          _context.next = 20;
          break;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(hashValidator(req.body.password, existingUser.password));

        case 10:
          checkUser = _context.sent;

          if (checkUser) {
            _context.next = 15;
            break;
          }

          res.send('Password is invalid');
          _context.next = 20;
          break;

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(tokenGenerator(existingUser.email));

        case 17:
          token = _context.sent;
          res.cookie('jwt', token);
          res.send(token); //res.send('Login successful');

        case 20:
          _context.next = 25;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          res.sendStatus(INTERNAL_SERVER_ERROR);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
};

var signupUser = function signupUser(req, res) {
  var hashPassword, user, savedUser;
  return regeneratorRuntime.async(function signupUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(hashGenerate(req.body.password));

        case 3:
          hashPassword = _context2.sent;
          user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
          });
          _context2.next = 7;
          return regeneratorRuntime.awrap(user.save());

        case 7:
          savedUser = _context2.sent;
          return _context2.abrupt("return", res.send(savedUser));

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          res.sendStatus(INTERNAL_SERVER_ERROR);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var adminUser = function adminUser(req, res) {
  return regeneratorRuntime.async(function adminUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            res.send('Admin user Only');
          } catch (_unused3) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getEmployeeDetails = function getEmployeeDetails(req, res) {
  var empDetails = new Promise(function (resolve, reject) {
    resolve(Employee.find());
  });
  empDetails.then(function (response) {
    return res.send(OK, response);
  });
};

var getEmployeeDetailsPassingID = function getEmployeeDetailsPassingID(req, res) {
  var getSpecificEmployee;
  return regeneratorRuntime.async(function getEmployeeDetailsPassingID$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Employee.findOne({
            _id: req.params.id
          }));

        case 3:
          getSpecificEmployee = _context4.sent;
          return _context4.abrupt("return", res.send(OK, getSpecificEmployee));

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

var postEmployeeDetails = function postEmployeeDetails(req, res) {
  var newEmployee, getEmployee;
  return regeneratorRuntime.async(function postEmployeeDetails$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          newEmployee = new Employee();
          newEmployee.name = req.body.name;
          newEmployee.role = req.body.role;
          newEmployee.phoneNumber = req.body.phoneNumber;
          _context5.next = 7;
          return regeneratorRuntime.awrap(newEmployee.save());

        case 7:
          getEmployee = _context5.sent;
          return _context5.abrupt("return", res.send(OK, getEmployee));

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          res.sendStatus(INTERNAL_SERVER_ERROR);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var updateEmployeeDetails = function updateEmployeeDetails(req, res) {
  var getEmployee;
  return regeneratorRuntime.async(function updateEmployeeDetails$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
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
          getEmployee = _context6.sent;
          return _context6.abrupt("return", res.send(OK, getEmployee));

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.sendStatus(INTERNAL_SERVER_ERROR);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var deleteEmployeeDetails = function deleteEmployeeDetails(req, res) {
  return regeneratorRuntime.async(function deleteEmployeeDetails$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Employee.findOneAndRemove({
            _id: req.params.id
          }, function (err, employee) {
            res.status(OK);
          }));

        case 3:
          _context7.next = 8;
          break;

        case 5:
          _context7.prev = 5;
          _context7.t0 = _context7["catch"](0);
          res.status(500);

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

module.exports = {
  getEmployeeDetails: getEmployeeDetails,
  getEmployeeDetailsPassingID: getEmployeeDetailsPassingID,
  postEmployeeDetails: postEmployeeDetails,
  updateEmployeeDetails: updateEmployeeDetails,
  deleteEmployeeDetails: deleteEmployeeDetails,
  signupUser: signupUser,
  signinuser: signinuser,
  adminUser: adminUser
};