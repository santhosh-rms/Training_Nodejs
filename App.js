var express = require('express');
var app = express();

const routes = require('./src/router/router');
require('./src/db/connector');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Router
app.use('/', routes.router);
app.listen(process.env.PORT, function () {
  console.log('app listening on port ' + process.env.PORT);
});
