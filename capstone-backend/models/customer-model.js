const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:4567/capstone", {
// useNewUrlParser: true,
// useCreateIndex: true,
// useFindAndModify: false,
// useUnifiedTopology: true,
// });

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    type: {
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

module.exports = mongoose.model("Customer", CustomerSchema);
