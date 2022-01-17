'use strict';

const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = mongoose.Schema({
  email: {
    type: String,
  },
  walletAddr: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    require: true,
    // unique: true,
    default: ""
  },
  defaultTokenAddress: {
    type: String,
    default: ""
  },
  tokenInfo: [{
    tokenAddr: String,
    tokenAccount: String,
  }],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tokenCount: Number,
  answer: [
    {
      questionId: Schema.Types.ObjectId,
      values: [String]
    }
  ]
    
});

module.exports = mongoose.model("Token", schema);