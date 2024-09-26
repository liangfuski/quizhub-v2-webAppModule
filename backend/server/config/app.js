var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');

// modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLoad = require("passport-local");
let localStrategy = passportLoad.Strategy;
let flash = require('connect-flash');

// database setup
let mongoose = require("mongoose")
let DB = require("./db");

// point mongoose to the DB URI
mongoose.set('strictQuery', true);
mongoose.connect(DB.URI, {useNewUrlParser: true})

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"))
mongoDB.once('open', () => {
  console.log("Connected to MongoDB....")
});

/* TO DO IMPORT ROUTER */
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let qNqRouter = require('../routes/quizNquest');

var app = express();

// view engine setup

// /* set view */
// app.set('views', path.join(__dirname, '../views')); // tell express where the view is 
// app.set('view engine', 'ejs');
// /*  set view done*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public'))); // exposing the ./public folder for the express server. As such, when we set the file paths inside views, the default base path is set.
app.use(express.static(path.join(__dirname, '../../node_modules'))) // week3 router video 15:40
app.use(express.static("./frontend/build"))  // the path inside the docker container; please refer to the Dockerfile
app.use(cors());

// setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}))

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

// import the User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

/* TO DO IMPORT QUIZ AND QUESTION MODEL */

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser()); // remember we configured the User module to use passport @ user.js
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payLoad, done) => {
  User.findById(jwt_payLoad.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);

// implement a User Authentication Strategy 
// week 6 video2 44:43
passport.use(User.createStrategy());

/* TO DO CONNECT ROUTER */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api',qNqRouter);


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
  res.render('error', {title: 'Error'});
});

module.exports = app;



