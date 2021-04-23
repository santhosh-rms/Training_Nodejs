"use strict";

var express = require('express');

var app = express();

var authVerify = require("../helpers/authVerify");

var router = express.Router();

var _require = require('../api/employee.api'),
    getEmployeeDetails = _require.getEmployeeDetails,
    getEmployeeDetailsPassingID = _require.getEmployeeDetailsPassingID,
    postEmployeeDetails = _require.postEmployeeDetails,
    updateEmployeeDetails = _require.updateEmployeeDetails,
    signupUser = _require.signupUser,
    signinuser = _require.signinuser,
    adminUser = _require.adminUser,
    deleteEmployeeDetails = _require.deleteEmployeeDetails;

router.route('/').post(function (req, res) {
  console.log('After Middleware');
  res.send('happy to be here');
}); // router.route('/Signup').get((req, res) => {
//   console.log('After Middleware');
//   res.send('happy to be here');
// });

router.route('/Signup').post(signupUser);
router.route('/signin').post(signinuser);
router.route('/protected').get(authVerify, adminUser);
router.route('/employees').get(getEmployeeDetails);
router.route('/employees/:id').get(getEmployeeDetailsPassingID);
router.route('/employee').post(postEmployeeDetails);
router.route('/employee/:id').put(updateEmployeeDetails);
router.route('/employees/:id')["delete"](deleteEmployeeDetails);
module.exports = {
  router: router
};