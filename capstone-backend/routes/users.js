var express = require("express");
// const { response } = require("../app");
var Customer = require("../models/customer-model");
var appConfig = require("../config/app-config");
var router = express.Router();

var authHandler = require("../middlewares/authentication");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const mongoose = require("mongoose");
  mongoose.connect(appConfig.dbUrl, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  });

  // find all athletes who play tennis, selecting the 'name' and 'age' fields
  Customer.find({ user: req.params.userId }, "-password", (err, users) => {
    if (err) return handleError(err);
    // 'athletes' contains the list of athletes that match the criteria.
    res.json(users);
  });

  // res.json(users);
  // next()

  // res.send("respond with a resource");
});

router.get("/:userId", function (req, res, next) {
  // mongodb code//

  const mongoose = require("mongoose");
  mongoose.connect(appConfig.dbUrl, {});

  Customer.findOne({ _id: req.params.userId }, "-password", (err, user) => {
    if (err) return console.error(err);

    res.json(user);
  });
});

//for deleting user//

router.delete("/:userId", authHandler);
router.delete("/:userId", function (req, res, next) {
  console.log("----", req.params.userId);
  const mongoose = require("mongoose");
  mongoose.connect(appConfig.dbUrl, {});

  Customer.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) return console.error(err);

    res.json({ id: req.params.userId });
  });
});

//For updating User//

router.put("/:userId", authHandler);
router.put("/:userId", function (req, res, next) {
  const mongoose = require("mongoose");
  mongoose.connect(appConfig.dbUrl, {});

  console.log("user", req.params.userId, req.body);

  Customer.updateOne({ _id: req.params.userId }, req.body, (err, user) => {
    if (err) return console.error(err);

    console.log("DB user record", Object.keys(user), user);

    if (!user.acknowledged || !user.matchedCount === 1) {
      res.statusCode = 404;
      res.send("Invalid userId");
      return;
    }

    res.json({});
  });
});

//To change Password//

router.put("/updatePassword/:userId", authHandler);
router.put("/updatePassword/:userId", function (req, res, next) {
  const mongoose = require("mongoose");
  mongoose.connect(appConfig.dbUrl, {});

  console.log("user", req.params.userId, req.body);

  Customer.updateOne(
    { _id: req.params.userId },
    { password: req.body.newpassword },
    (err, user) => {
      if (err) return console.error(err);

      console.log("DB user record", Object.keys(user), user);

      if (!user.acknowledged || !user.matchedCount === 1) {
        res.statusCode = 404;
        res.send("Invalid userId");
        return;
      }

      res.json({});
    }
  );
});

module.exports = router;
