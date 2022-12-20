const Tea = require("../models/tea");
const { body, validationResult} = require("express-validator");


exports.index = (req, res) => {
    res.render("index", {title: "Tea sharing home page!"});
};

exports.tea_list = (req, res, next) => {
  Tea.find({}, "tea_name type brand rating")
  .sort({tea_name: 1})
  .exec(function (err, list_teas) {
    if (err) {
      return next(err);
    }
    res.render("tea_list", {title: "Tea List", tea_list: list_teas});
  });
};

exports.tea_info = (req, res, next) => {
  Tea.findById(req.params.id)
  .populate("tea_name")
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
      tea
    })
  })
};

exports.tea_create_get = (req, res, next) => {
  res.render("tea_form", {title: "Add New Tea"});  
  };

exports.tea_create_post = [
  body("tea_name").trim().isLength({min: 2}).escape().withMessage("Please enter a tea name"),
  body("type").trim(),
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
    });

    tea.save((err) => {
      if(err) {
        return next(err);
      };
      res.redirect(tea.url);
    })
  }
];
  
  exports.tea_delete_get = (req, res) => {
    res.send(" a");
  };
  
  exports.tea_delete_post = (req, res) => {
    res.send("a ");
  };
  
  exports.tea_update_get = (req, res) => {
    res.send("a ");
  };
  
  exports.tea_update_post = (req, res) => {
    res.send("a ");
  };