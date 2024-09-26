let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.epic = (req, res, next) => {
    res.json({message: "Hi World"});
}

module.exports.processLoginPage = (req, res, next) => {
    // explanation week6 video 2 13:56 
    passport.authenticate('local', 
    (err, user, info) => {
          // server error? 

          if(err)
          {
            return next(err);
          }
          // is there a user login error?
          if(!user)
          {
            req.flash('loginMessage', 'Authentication Error');
            return res.json({success: false, msg: 'Login fail'});
          }

          req.login(user, (err)=> {
              // server error?
              if(err)
              {
                return next(err);
              }

              const payload = 
              {
                id: user._id,
                displayName: user.username,
                username: user.username,
                email: user.email
              }

              const authToken = jwt.sign(payload, DB.Secret, {
                  expiresIn: 604800 // 1 week
              });

            //  TODO - Getting Ready to convert to API
            return  res.json({success: true, msg: 'User Logged in Successfully!', user: {
                  id: user._id,
                  displayName: user.displayName,
                  username: user.username,
                  email: user.email
              }, token: authToken});

              // return res.redirect('/book-list')
          });
    }
    )(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in 
  if(!req.user){
    res.render('auth/register',{
      title: "Register",
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ""
    });
  }
  else
  {
    return res.redirect('/');
  }
}

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.username
  });

  // I think passport help to encrypt the password
  User.register(newUser, req.body.password, (err) => {
    if(err)
    {
      if(err.name == "UserExistsError")
      {
        req.flash(
          'registerMessage',
          'Registeration Error: User Already Exists!'
        );
        console.log('Error: User Already Exists');
      }
      return res.json({success: false, msg: err})
    }
    else 
    {
 
      // TODO - Getting Ready to convert to API
      return  res.json({success: true, msg: 'User Registered Successfully!'});
    }
  });
}


module.exports.performLogout = (req, res, next) => {
  req.logout(
    function(err) {
       if (err) { return next(err); }
       res.json({success: true, msg: "User Successfully logged out!"});
    }
  );
}

