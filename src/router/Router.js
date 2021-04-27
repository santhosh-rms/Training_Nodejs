const express = require('express');
const app = express();
const authVerify = require("../helpers/authVerify");
const router = express.Router();
const {
  getEmployeeDetails,
  getEmployeeDetailsPassingID,
  postEmployeeDetails,
  updateEmployeeDetails,
  signupUser,
  signinuser,
  adminUser,
  deleteEmployeeDetails,
} = require('../api/employee.api');

router.route('/').post((req, res) => {
  console.log('After Middleware');
  res.send('happy to be here');
});

router.get('/protected',authVerify,(req, res) => {
  try {
    res.send('Admin user Only');
  } catch {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
});

router.route('/Signup').post(signupUser);
router.route('/signin').post(signinuser);
router.route('/employees').get(getEmployeeDetails);
router.route('/employees/:id').get(getEmployeeDetailsPassingID);
router.route('/employee').post(postEmployeeDetails);
router.route('/employee/:id').put(updateEmployeeDetails);
router.route('/employees/:id').delete(deleteEmployeeDetails);
module.exports = { router };
