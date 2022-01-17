'use strict';

const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  question: {
    type: String,
  },
  answerType: {
    type: Number,
  },
  answerVal: [String],
});

module.exports = mongoose.model("Questions", schema);