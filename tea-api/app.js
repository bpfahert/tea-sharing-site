var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
const teasRouter = require('./routes/teas')
const userRouter = require('./routes/user');

const app = express();
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://admin:vPHzWtj3LP1CK2u6@tea-cluster.t1mwtol.mongodb.net/tea_db?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewURLParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({username: username}, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {message: "Username does not exist"});
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        }
        else {
          return done(null, false, {message: "Incorrect password!"});
        }
      })
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(session({secret: "dogs", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
}); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testapi', testAPIRouter);
app.use('/teas', teasRouter);
app.use('/user', userRouter);

app.post(
  "/userlogin",
  passport.authenticate("local", {
    successRedirect: "/teas/tealist",
    failureRedirect: "/users/userlist"
  })
  );

app.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/teas/");
  });
});

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
