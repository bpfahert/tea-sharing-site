const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const upload = multer({dest: './public/images/'});
const mongoose = require('mongoose');

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
  .populate("favorite_teas")
  .populate("teas_added")
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
  upload.single('userimg'),
  body("username", "Please enter a username").trim().isLength({min: 2}).escape(),
  body("password").trim().isLength({min: 2}).escape(),
  body("favoritetea"),
  body("email"),
  body("about"),
  (req, res, next) => {
    const uploadedImage = {
      userImage: req.file ? {
        data: fs.readFileSync(path.join(__dirname + "/../public/images/" + req.file.filename)),
      contentType: "image/png"
      } : ""
    }
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      favorite_tea_type: req.body.favoritetea,
      about: req.body.about,
      img: uploadedImage.userImage,
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