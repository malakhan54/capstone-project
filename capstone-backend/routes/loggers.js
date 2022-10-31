var appConfig = require("../config/app-config");
var Loggers = require("../models/loggers-model");

module.exports = function logRequest(req, res, next) {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(
    "**--",
    req.method,
    req.url,
    new Date(),
    req.get("User-Agent"),
    ip
  );

  const mongoose = require("mongoose");
  mongoose.connect(appConfig.dbUrl, {});
  Loggers.create(
    {
      URL: req.originalUrl,
      Method: req.method,
      IP: ip,
      User_Agent: req.get("User-Agent"),
      Time: new Date().toISOString(),
    },
    // { username: req.body.username, password: req.body.password },
    (err, user) => {
      if (err) return console.error(err);

      if (!user) {
        res.json({ user });
        return;
      }
    }
  );
  next();
};
