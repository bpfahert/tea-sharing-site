const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require("../models/user");

exports.user_list = (req, res) => {
  User.find({}, "username")
  .sort({username: 1})
  .exec(function (err, list_users) {
    if (err) {
      return next(err);
    }
    res.render("user_list", {title: "User List", user_list: list_users});
  });
};

exports.user_info = (req, res, next) => {
  User.findById(req.params.id)
  .populate("username")
  .exec((err, user) => {
    if (err) {
      return next(err)
    }
    if (user === null) {
      const err = new Error ("User does not exist!!");
      err.status = 404;
      return next(err);
    }
    res.render("user_info", {
      title: `${user.username}`,
      user,
    })
  })
};

exports.user_create_get = (req, res, next) => {
    res.render("user_form", {title: "New User Signup"});
  };

exports.user_create_post = [
  body("username", "Please enter a username").trim().isLength({min: 2}).escape(),
  body("password").trim().isLength({min: 2}).escape(),
  body("favoritetea"),
  (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      favorite_tea_type: req.body.favoritetea,
    });

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      user.password = hashedPassword;
      user.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(user.url);
      })
    })
  }
]

exports.user_login_get = (req, res) => {
  res.render("user_login", {title: "Log In", user: req.user});
}

exports.user_delete_get = (req, res) => {
    res.send("b ");
  };
  
exports.user_delete_post = (req, res) => {
    res.send("b ");
  };
  
exports.user_update_get = (req, res) => {
    res.send(" b");
  };
  
exports.user_update_post = (req, res) => {
    res.send("b ");
  };