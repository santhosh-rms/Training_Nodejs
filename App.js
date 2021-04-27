var express = require('express');
var app = express();
const cookieParser = require("cookie-parser");
const routes = require('./src/router/router');
require('./src/db/connector');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(middleWare);
//Router
app.use('/', routes.router);

function middleWare(req, res, next) {
  console.log('check Middleware');
  next();
}
app.listen(process.env.PORT, function () {
  console.log('app listening on port ' + process.env.PORT);
});
