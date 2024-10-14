var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var wordRouter = require('./routes/word');

var app = express();

// view engine setup
app.use("/",express.static("./node_modules/bootstrap/dist/"));
app.use("/",express.static("./node_modules/jquery/dist/"));
app.use("/",express.static("./node_modules/ag-grid-community/dist/"));
app.set('views',
  [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/shared')
  ]);

app.use(expressLayouts);
app.set('view engine', 'ejs');
const { connect } = require('./services/db.js')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



connect()
.then((connection)=>{
  console.log("Connected to the database")
})

app.use('/', indexRouter);
app.use('/word', wordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
