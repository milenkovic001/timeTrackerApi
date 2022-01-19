const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
    minlength: 5,
  },
  activities: [{ name: String, color: String, group: String }],
  // group: [{ name: String, activities: { id: String } }],
});

const Activities = mongoose.model("Activities", userSchema);

exports.Activities = Activities;
