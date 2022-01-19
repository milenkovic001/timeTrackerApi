const mongoose = require("mongoose");

const timeLineSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //ubaci referencu za aktivnosti i posebno dodaj vreme
  //i onda kad se menja grupa ili ime promeni se sve
  activities: [
    {
      name: String,
      color: String,
      year: Number,
      month: Number,
      day: Number,
      time: String,
      //group: String,
    },
  ],
});

const TimeLine = mongoose.model("TimeLine", timeLineSchema);

exports.TimeLine = TimeLine;
