var Employee = require('../model/employee');
var User = require('../model/user');
const { hashGenerate } = require('../helpers/hashing');
const { hashValidator } = require('../helpers/hashing');
const { tokenGenerator } = require('../helpers/token');

var { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');

const signinuser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      res.send('Email is Invalid');
    } else {
      const checkUser = await hashValidator(
        req.body.password,
        existingUser.password
      );
      if (!checkUser) {
        res.send('Password is invalid');
      } else {
        const token = await tokenGenerator(existingUser.email);
        res.cookie('jwt', token);
        res.send(token);
        // res.send('Login successful');
      }
    }
  } catch {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

const signupUser = async (req, res) => {
  try {
    const hashPassword = await hashGenerate(req.body.password);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const savedUser = await user.save();
    return res.send(savedUser);
  } catch {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};

// const adminUser = async (req, res) => {
//   try {
//     res.send('Admin user Only');
//   } catch {
//     res.sendStatus(INTERNAL_SERVER_ERROR);
//   }
// };

// const getEmployeeDetails = (req, res) => {
//   const empDetails = new Promise((resolve, reject) => {
//     resolve(Employee.find());
//   });
//   empDetails.then((response) => {
//     return res.send(OK, response);
//   });
// };

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
    var newEmployee = new Employee();
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
  signupUser,
  signinuser,
  // adminUser
};
