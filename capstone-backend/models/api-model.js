const mongoose = require("mongoose");

const ApiSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  Count: {
    type: Number,
  },
  ApiKey: {
    type: String,
  },
});

module.exports = mongoose.model("ApiKey", ApiSchema);
