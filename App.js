var express = require('express');
var app = express();
var Employee = require('./src/model/employee');
require('./src/db/mongoose')
var port = 8080;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('happy to be here');
});

app.get('/employees', function(req, res) {
  console.log('getting all employees');
  Employee.find({})
    .exec(function(err, employees) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(employees);
        res.json(employees);
      }
    });
});

app.get('/employees/:id', function(req, res) {
  console.log('getting all employees');
  Employee.findOne({
    _id: req.params.id
    })
    .exec(function(err, employees) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(employees);
        res.json(employees);
      }
    });
});

app.post('/employee', function(req, res) {
  var newEmployee = new Employee();

  newEmployee.name = req.body.name;
  newEmployee.role = req.body.role;
  newEmployee.phoneNumber = req.body.phoneNumber;

  newEmployee.save(function(err, employee) {
    if(err) {
      res.send('error saving employee');
    } else {
      console.log(employee);
      res.send(employee);
    }
  });
});

app.post('/employee2', function(req, res) {
  Employee.create(req.body, function(err, employee) {
    if(err) {
      res.send('error saving employee');
    } else {
      console.log(employee);
      res.send(employee);
    }
  });
});

app.put('/employee/:id', function(req, res) {
  Employee.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { name: req.body.name }
  }, {upsert: true}, function(err, newEmployee) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newEmployee);
      res.send(newEmployee);
    }
  });
});

app.delete('/employee/:id', function(req, res) {
  Employee.findOneAndRemove({
    _id: req.params.id
  }, function(err, employee) {
    if(err) {
      res.send('error removing')
    } else {
      console.log(employee);
      res.status(204);
    }
  });
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
// var http =require('http');
// http.createServer(function(req,res){
//     res.writeHead(200,{'Content-type':'text/plain'});
//     res.write("Welcome All");
//     res.end("Thank You")
// }).listen(5000);

// const express = require('express')
// const app = express()
// const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
// // const http = require('http');

// // const server = http.createServer((req, res) => {
// //   console.log('INCOMING REQUEST');
// //   console.log(req.method, req.url);

// //   if (req.method === 'POST') {
// //     let body = '';
// //     req.on('end', () => {
// //       const userName = body.split('=')[1];
// //       res.end('<h1>' + userName + '</h1>');
// //     });

// //     req.on('data', (chunk) => {
// //       body += chunk;
// //     });
// //   } else {
// //     res.setHeader('Content-Type', 'text/html');
// //     res.end(
// //       '<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
// //     );
// //   }
// // });

// // server.listen(5000);
// const express = require('express');

// const app = express();

// app.use((req, res, next) => {
//   let body = '';
//   req.on('end', () => {
//     req.body = { name: body };
//     next();
//   });
//   req.on('data', (chunk) => {
//     body += chunk;
//   });
// });

// app.use((req, res, next) => {
//   if (req.body) {
//     return res.send('<h1>' + req.body.name + '</h1>');
//   }
//   res.send(
//     '<form method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
//   );
// });

// server.listen(5000);


// var mongo = require('mongodb').MongoClient;
// var url ='mongodb://localhost:27017';
// mongo.connect(url,function(err,db){
//   if(err) throw err;
//   var dbmy =db.db('employee');
//   var mydata = [{empName:'raj',webSite:'www.sample1.com'},{empName:'akash',webSite:'www.sample2.com'}];
//   dbmy.collection('empDetails').insertMany(mydata,function(err,res){
//     if(err) throw err;
//     console.log("doc inserted")
//     db.close();
//   });
// });