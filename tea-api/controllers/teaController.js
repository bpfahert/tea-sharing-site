const Tea = require("../models/tea");
const { body, validationResult} = require("express-validator");
const async = require("async");
const User = require("../models/user");
const mongoose = require("mongoose");


exports.index = (req, res) => {
    res.render("index", {title: "Tea sharing home page!"});
};

exports.tea_list = (req, res, next) => {
  async.parallel(
    {
      list_teas(callback) {
        Tea.find({}, "tea_name type brand rating notes").sort({tea_name: 1}).exec(callback);
      },

      recently_added_teas(callback) {
        Tea.find({}, "created_on tea_name type brand rating notes").sort({created_on: -1}).limit(5).exec(callback);
      },
    },
      (err, results) => {
        if (err) {
          return next(err);
        }
        res.render("tea_list", {title: "Tea List", tea_list: results.list_teas, new_tea_list: results.recently_added_teas});
      });
};

//TODO: Fix bug where username is undefined (added by:)
exports.tea_info = (req, res, next) => {

  Tea.findById(req.params.id)
  .populate("tea_name")
  .populate("created_by")
  .exec((err, tea) => {
    if (err) {
      return next(err)
    }
    if (tea === null) {
      const err = new Error ("Tea does not exist!");
      err.status = 404;
      return next(err);
    }
    res.render("tea_info", {
      title: `${tea.tea_name}`,
      tea,
      added_by: tea.created_by.username,
      user_url : tea.created_by.url,
    })
  })
};

exports.tea_create_get = (req, res, next) => {
  res.render("tea_form", {title: "Add New Tea"});  
  };


exports.tea_create_post = [
  body("tea_name").trim().isLength({min: 2}).escape().withMessage("Please enter a tea name"),
  body("type"),
  body("brand").trim().isLength({min: 1}).escape(),
  body("rating"),
  body("notes").trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const tea = new Tea({
      tea_name: req.body.teaname,
      type: req.body.type,
      brand: req.body.brand,
      rating: req.body.rating,
      notes: req.body.notes,
      created_on: new Date(),
      created_by: req.user._id,
    });

    User.findById(tea.created_by)
    .exec((err, creator) => {
      if (err) {
        return next(err);
      }
      if (creator === null) {
        const err = new Error ("User does not exist!");
        err.status = 404;
        return next(err);
      }
      creator.teas_added.push(tea);
      creator.save((err) => {
        if(err) {
          return next(err);
        }
      })
    })

    //needs to be async?
    tea.save((err) => {
      if(err) {
        return next(err);
      }
      res.redirect(tea.url);
    })
  }
];
  
  exports.tea_delete_get = (req, res, next) => {
    Tea.findById(req.params.id).exec((err, tea) => {
      if(err) {
        return next(err);
      }
      if (tea === null) {
        const err = new Error ("Tea does not exist or has already been deleted!");
        err.status = 404;
        return next(err);
      }
      res.render("tea_delete", {title: "Delete this tea", tea}) 
    })
  };
  
  exports.tea_delete_post = (req, res, next) => {
    Tea.findByIdAndRemove(req.body.teadeleteid, (err) => {
      if(err) {
        return next(err);
      }
      res.redirect("/teas");
    })
  };
  
  exports.tea_update_get = (req, res) => {
    res.send("a ");
  };
  
  exports.tea_update_post = (req, res) => {
    res.send("a ");
  };