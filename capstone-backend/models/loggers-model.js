const mongoose = require("mongoose");

const LoggersSchema = new mongoose.Schema(
  {
    URL: {
      type: String,
    },
    Method: {
      type: String,
    },
    Ip: {
      type: String,
    },
    User_Agent: {
      type: String,
    },
    Time: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = mongoose.model("Loggers", LoggersSchema);
