// // var http =require('http');
// // http.createServer(function(req,res){
// //     res.writeHead(200,{'Content-type':'text/plain'});
// //     res.write("Welcome All");
// //     res.end("Thank You")
// // }).listen(5000);

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

// server.listen(1010);


var mongo = require('mongodb').MongoClient;
var url ='mongodb://localhost:27017';
mongo.connect(url,function(err,db){
  if(err) throw err;
  var dbmy =db.db('employee');
  var mydata = [{empName:'vijay',webSite:'www.sample1.com'},{empName:'ravi',webSite:'www.sample2.com'}];
  dbmy.collection('empDetails').insertMany(mydata,function(err,res){
    if(err) throw err;
    console.log("doc inserted")
    db.close();
  });
});