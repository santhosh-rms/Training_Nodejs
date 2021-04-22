"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../api/employee.api'),
    getEmployeeDetails = _require.getEmployeeDetails,
    getEmployeeDetailsPassingID = _require.getEmployeeDetailsPassingID,
    postEmployeeDetails = _require.postEmployeeDetails,
    updateEmployeeDetails = _require.updateEmployeeDetails,
    deleteEmployeeDetails = _require.deleteEmployeeDetails;

router.route('/').get(function (req, res) {
  res.send('happy to be here');
});
router.route('/employees').get(getEmployeeDetails);
router.route('/employees/:id').get(getEmployeeDetailsPassingID);
router.route('/employee').post(postEmployeeDetails);
router.route('/employee/:id').put(updateEmployeeDetails);
router.route('/employees/:id')["delete"](deleteEmployeeDetails);
module.exports = {
  router: router
};