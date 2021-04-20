var Employee = require('../model/employee');

const getEmployeeDetails = async (req, res) => {
  try {
    Employee.find({}).exec(function (err, employees) {
      if (err) {
        res.send('error occured');
      } else {
        console.log(employees);
        res.json(employees);
      }
    });
    res.status(200);
  } catch (err) {
    res.status(500);
  }
};

const getEmployeeDetailsPassingID = async (req, res) => {
  try {
    console.log('getting all employees');
    Employee.findOne({
      _id: req.params.id,
    }).exec(function (err, employees) {
      if (err) {
        res.send('error occured');
      } else {
        console.log(employees);
        res.json(employees);
        res.status(200);
      }
    });
  } catch (err) {
    res.status(500);
  }
};

const postEmployeeDetails = async (req, res) => {
  try {
    var newEmployee = new Employee();
    newEmployee.name = req.body.name;
    newEmployee.role = req.body.role;
    newEmployee.phoneNumber = req.body.phoneNumber;
    newEmployee.save(function (err, employee) {
      if (err) {
        res.send('error saving employee');
      } else {
        console.log(employee);
        res.send(employee);
        res.status(201);
      }
    });
  } catch (err) {
    res.status(500);
  }
};

const updateEmployeeDetails = async (req, res) => {
  try {
    Employee.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { name: req.body.name } },
      { upsert: true },
      function (err, newEmployee) {
        if (err) {
          res.send('error updating ');
        } else {
          console.log(newEmployee);
          res.send(newEmployee);
          res.status(201);
        }
      }
    );
  } catch (err) {
    res.status(500);
  }
};

const deleteEmployeeDetails = async (req, res) => {
  try {
    Employee.findOneAndRemove(
      {
        _id: req.params.id,
      },
      function (err, employee) {
        if (err) {
          res.send('error removing');
        } else {
          console.log(employee);
          res.status(200);
        }
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
