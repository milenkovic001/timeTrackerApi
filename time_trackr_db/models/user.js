const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 15,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 15,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    minlength: 5,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    maxlength: 20,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  // lastTimeActive: {
  //   type: Date,
  //   required: true,
  //   maxlength: 15,
  //   minlength: 2,
  // },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
