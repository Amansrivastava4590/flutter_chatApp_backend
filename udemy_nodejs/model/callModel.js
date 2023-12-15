const mongoose = require('mongoose');



const callModelSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    msg: String,
    date: String,
    outbound:String,
    count: String,
    type: String,
  });

  module.exports = mongoose.model("calls", callModelSchema);