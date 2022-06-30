'use strict';

const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = mongoose.Schema({
  address: {
    type: String,
  },
  url: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Url", schema);