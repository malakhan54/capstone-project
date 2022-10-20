var express = require("express");
// const { response } = require("../app");
var Customer = require("../models/customer-model");
var appConfig = require("../config/app-config");
var router = express.Router();
var authHandler = require("../middlewares/authentication");

/* GET users listing. */
router.post("/login", authHandler);
router.post("/login", function (req, res, next) {
  const mongoose = require("mongoose");
  mongoose.connect(appConfig.dbUrl, {});

  console.log("user", req.body.username, req.body);

  Customer.findOne(
    { username: req.body.username, password: req.body.password },
    "-password",
    (err, user) => {
      if (err) return console.error(err);

      console.log("DB user record", Object.keys(user), user);

      if (!user) {
        res.json({});
        return;
      }

      res.json({
        ...user.toObject(),
        validation: true,
      });
    }
  );

  // res.json(users);
  // next()

  // res.send("respond with a resource");
});

router.get("/:userId", authHandler);
router.get("/:userId", function (req, res, next) {
  // mongodb code//

  // const mongoose = require("mongoose");
  // mongoose.connect(appConfig.dbUrl, {

  // });

  const Customer = mongoose.model("Customer", CustomerSchema);

  // find all athletes who play tennis, selecting the 'name' and 'age' fields
  Customer.find({ _id: req.params.userId }, "name age", (err, users) => {
    if (err) return handleError(err);
    // 'athletes' contains the list of athletes that match the criteria.
    res.json(users);
    next();
  });

  // res.send("You asked for " + req.params.userId);
});

//for signup//

router.post("/users", authHandler);
router.post("/users", function (req, res, next) {
  const mongoose = require("mongoose");
  mongoose.connect(appConfig.dbUrl, {});

  console.log("user", req.body.username, req.body);

  Customer.create(
    req.body,
    // { username: req.body.username, password: req.body.password },
    (err, user) => {
      if (err) return console.error(err);

      if (!user) {
        res.json({ user });
        return;
      }
      const u = user.toObject();
      delete user.password;
      res.send("user created successfully");
      ({
        ...u,
        validation: true,
      });
    }
  );
});

module.exports = router;
