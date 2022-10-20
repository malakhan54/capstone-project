var ApiKey = require("../models/api-model");
var appConfig = require("../config/app-config");

module.exports = function (req, res, next) {
  if (!req.query.APIKey) {
    // send 401 to response
    console.log("apikey not in request", req.params.APIKey, req.query);
    res.status(401);
    res.end();
    return;
  }

  const mongoose = require("mongoose");
  mongoose.connect(appConfig.dbUrl, {});

  ApiKey.find({ ApiKey: req.query.APIKey }, "Count", (err, apiKey) => {
    if (err) {
      console.error(err);
      return;
    }

    if (apiKey) {
      console.log("apikey found", apiKey);
      next();
    } else {
      console.log("apikey not found", req.query.APIKey);
      res.status(401);
      res.end();
    }
  });
};
