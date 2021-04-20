'use strict';
const express = require('express');
const router = express.Router();
const {
  getEmployeeDetails,
  getEmployeeDetailsPassingID,
  postEmployeeDetails,
  updateEmployeeDetails,
  deleteEmployeeDetails,
} = require('../api/employee.api');

router.route('/').get((req, res) => {
  res.send('happy to be here');
});

router.route('/employees').get(getEmployeeDetails);
router.route('/employees/:id').get(getEmployeeDetailsPassingID);
router.route('/employee').post(postEmployeeDetails);
router.route('/employee').put(updateEmployeeDetails);
router.route('/employees/:id').delete(deleteEmployeeDetails);
module.exports = { router };
