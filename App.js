var express = require('express');
var app = express();

const routes = require('./src/router/Router');
require('./src/db/mongoose');
var port = 8080;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Router

app.use('/', routes.router);

app.listen(port, function () {
  console.log('app listening on port ' + port);
});
