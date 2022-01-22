'use strict';

const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  answerVal: [{
    title: String,
    isAnswer: {
      type: Boolean,
      default: false
    },
    // votes: [{type: Schema.Types.ObjectId, ref: 'Token'}]
  }],
});

module.exports = mongoose.model("Questions", schema);