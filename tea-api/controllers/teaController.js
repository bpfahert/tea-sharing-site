const Tea = require("../models/tea");
const { body, validationResult} = require("express-validator");
const async = require("async");
const path = require('path');
const fs = require('fs');
const User = require("../models/user");
const multer = require('multer');

const upload = multer({dest: './public/images/'});
const mongoose = require("mongoose");


exports.index = (req, res, next) => {
  async.parallel(
    //TODO: Combine some of these if possible
    {
      user_teas(callback) {
        Tea.find({created_by: req.user}, "tea_name type brand rating notes created_on created_by img updated_on").sort({created_on: -1}).exec(callback);
      },

      top_teas(callback) {
        Tea.find({}, "tea_name type brand rating notes").sort({rating: -1}).limit(5).exec(callback);
      },

      recent_teas(callback) {
        Tea.find({}, "tea_name type rating created_by").populate("created_by").sort({created_on: -1}).limit(10).exec(callback);
      },

      //index page throws username is not defined error if not logged in
      //TODO: figure out why recommended teas is an array inside of an array
      tea_recommendations(callback) {
        User.find({username: req.user.username}).populate("recommended_teas.tea_rec").populate("recommended_teas.recommended_by").exec(callback);
      },

      saved_teas(callback) {
        User.find({username: req.user.username}).populate("saved_teas").exec(callback);
      },

      favorite_teas(callback) {
        User.find({username: req.user.username}).populate("favorite_teas").exec(callback);
      },
    },
    (err, results) => {
      if(err) {
        return next(err);
      }
      res.render("index", {title: "Tea sharing home page!", 
      user_tea_list: results.user_teas, 
      top_list: results.top_teas, 
      recent_tea_list: results.recent_teas, 
      teas_recommended_list: results.tea_recommendations,
      saved_teas_list: results.saved_teas,
      favorite_teas_list: results.favorite_teas
    });
    });
};

exports.tea_list = (req, res, next) => {
  async.parallel(
    {
      list_teas(callback) {
        Tea.find({}, "tea_name type brand rating notes").sort({tea_name: 1}).exec(callback);
      },

      recently_added_teas(callback) {
        Tea.find({}, "created_on created_by tea_name type brand rating notes img").populate("created_by").sort({created_on: -1}).limit(5).exec(callback);
      },

      green_teas(callback) {
        Tea.find({ type: "Green"}, "created_on created_by tea_name type brand rating notes").populate("created_by").sort({created_on: -1}).exec(callback);
      },

      black_teas(callback) {
        Tea.find({ type: "Black"}, "created_on created_by tea_name type brand rating notes").populate("created_by").sort({created_on: -1}).limit(5).exec(callback);
      },

      oolong_teas(callback) {
        Tea.find({ type: "Oolong"}, "created_on created_by tea_name type brand rating notes").populate("created_by").sort({created_on: -1}).limit(5).exec(callback);
      },

      herbal_teas(callback) {
        Tea.find({ type: "Herbal"}, "created_on created_by tea_name type brand rating notes").populate("created_by").sort({created_on: -1}).limit(5).exec(callback);
      },

      white_teas(callback) {
        Tea.find({ type: "White"}, "created_on created_by tea_name type brand rating notes").populate("created_by").sort({created_on: -1}).limit(5).exec(callback);
      }
    },
      (err, results) => {
        if (err) {
          return next(err);
        }
        res.render("tea_list", {title: "Tea List", tea_list: results.list_teas, new_tea_list: results.recently_added_teas, green_tea_list: results.green_teas, black_tea_list: results.black_teas, oolong_tea_list: results.oolong_teas, herbal_tea_list: results.herbal_teas, white_tea_list: results.white_teas});
      });
};

exports.tea_info = (req, res, next) => {
  async.parallel(
    {
      tea_details(callback) {
        Tea.findById(req.params.id).populate("tea_name").populate("created_by").exec(callback);
      },
      
      list_users(callback) {
        User.find({}, "username").sort({username : 1}).exec(callback);
      }
    },
      (err, results) => {
        if (err) {
          return next(err);
        }
        res.render("tea_info", {title: `${results.tea_details.tea_name}`, user_url: results.tea_details.created_by.url, tea_id: req.params.id, tea: results.tea_details, user_list: results.list_users})
      }
    )
};

exports.tea_create_get = (req, res, next) => {
  res.render("tea_form", {title: "Add New Tea"});  
  };


exports.tea_create_post = [
  upload.single('teaimg'),
  body("tea_name").trim().isLength({min: 2}).escape().withMessage("Please enter a tea name"),
  body("brand").trim().isLength({min: 2}),
  body("type"),
  body("rating"),
  body("notes").trim(),
  (req, res, next) => {
    const uploadedImage = {
      teaImage: req.file ? {
        data: fs.readFileSync(path.join(__dirname + "/../public/images/" + req.file.filename)),
      contentType: "image/png"
      } : ""
    }

    const errors = validationResult(req);

    const tea = new Tea({
      tea_name: req.body.teaname,
      type: req.body.type,
      brand: req.body.brand,
      rating: req.body.rating,
      notes: req.body.notes,
      created_on: new Date(),
      created_by: req.user._id,
      img: uploadedImage.teaImage,
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
      creator.teas_added.push(tea._id);
      creator.save((err) => {
        if(err) {
          return next(err);
        }
      })
    })

    tea.save((err) => {
      if(err) {
        return next(err);
      }
      res.redirect(tea.url);
    })
  }
];
  
exports.tea_delete_get = (req, res, next) => {
  Tea.findById(req.params.id).populate("created_by").exec((err, tea) => {
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

exports.tea_update_get = (req, res, next) => {
  Tea.findById(req.params.id).populate("created_by").exec((err, tea) => {
    if(err) {
      return next(err);
    }
    if (tea === null) {
      const err = new Error ("Tea does not exist or has been deleted!");
      err.status = 404;
      return next(err);
    }
    res.render("tea_update", {title: "Update this tea", tea});
  })
};

exports.tea_update_post = [
  upload.single('teaimg'),
  body("tea_name").trim().isLength({min: 2}).escape().withMessage("Please enter a tea name"),
  body("type"),
  body("brand").trim().isLength({min: 1}).escape(),
  body("rating"),
  body("notes").trim().escape(),
  (req, res, next) => {
    const uploadedImage = {
      teaImage: req.file ? {
        data: fs.readFileSync(path.join(__dirname + "/../public/images/" + req.file.filename)),
      contentType: "image/png"
      } : ""
    }

    const errors = validationResult(req);

    const tea = new Tea({
      tea_name: req.body.teaname,
      type: req.body.type,
      brand: req.body.brand,
      rating: req.body.rating,
      notes: req.body.notes,
      created_by: req.user._id,
      updated_on: new Date(),
      img: uploadedImage.teaImage,
      _id: req.params.id,
    });
    Tea.findByIdAndUpdate(req.params.id, tea, {}, (err, updatedtea) => {
      if(err) {
        return next(err);
      }
    })      
    res.redirect("/teas/tealist");
    }
];

exports.tea_recommend_get = (req, res, next) => {
  async.parallel(
    {
      tea_info(callback) {
        Tea.findById(req.params.id).populate("created_by").exec(callback);
      },
      
      user_info(callback) {
        User.find({}, "username").sort({username : 1}).exec(callback);
      }
    }, 
      (err, results) => {
        if (err) {
          return next(err);
        }
      res.render("recommend_form", {title: "Recommend this tea to a friend!", user_list: results.user_info, recommended_tea: results.tea_info});
    });
  };

exports.tea_recommend_post = [
  body("recommendedtea"),
  body("recommender"),
  body("user"),
  body("recmessage"),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    User.findById(req.body.user).exec((err, friend) => {
      if(err) {
        return next(err);
      }
      let tea_obj = {
        tea_rec: req.body.recommendedtea,
        recommended_by: req.body.recommender,
        message: req.body.recmessage,
      };
      console.log(tea_obj);
      friend.recommended_teas.push(tea_obj);

      friend.save((err) => {
        if(err) {
          return next(err);
        }
      })
  })
  res.redirect(`/teas/${req.params.id}`)
  }
];

exports.tea_recommend_delete = (req, res, next) => {
  User.findOneAndUpdate({username: req.user.username}, {$pull : {recommended_teas: { tea_rec: req.params.id}}}).exec((err, self) => {
    if(err) {
      return next(err);
    }
    res.redirect("/teas");
  })
};

exports.tea_save_get = (req, res, next) => {
  Tea.findById(req.params.id).exec((err, tea) => {
    if(err) {
      return next(err);
    }
    if (tea === null) {
      const err = new Error ("Tea does not exist!");
      err.status = 404;
      return next(err);
    }
    User.find({username: req.user.username}).exec((err, self) => {
      if(err) {
        return next(err);
      }
      self[0].saved_teas.push(tea);

      self[0].save((err) => {
        if(err) {
          return next(err);
        }
      })
      
    })
    res.redirect("/teas");
  })
  };

  exports.tea_saved_delete = (req, res, next) => {
    User.findOneAndUpdate({username: req.user.username}, {$pull : {saved_teas: req.params.id}}).exec((err, self) => {
      if(err) {
        return next(err);
      }
      res.redirect("/teas");
    })
  };
    
exports.tea_favorite_get = (req, res, next) => {
  Tea.findById(req.params.id).exec((err, tea) => {
    if(err) {
      return next(err);
    }
    if (tea === null) {
      const err = new Error ("Tea does not exist!");
      err.status = 404;
      return next(err);
    }
    User.find({username: req.user.username}).exec((err, self) => {
      if(err) {
        return next(err);
      }
      self[0].favorite_teas.push(tea);

      self[0].save((err) => {
        if(err) {
          return next(err);
        }
      })
      
    })
    res.redirect("/teas");
  })
  };

  exports.tea_favorite_delete = (req, res, next) => {
    User.findOneAndUpdate({username: req.user.username}, {$pull : {favorite_teas: req.params.id}}).exec((err, self) => {
      if(err) {
        return next(err);
      }
      res.redirect("/teas");
    })
  };