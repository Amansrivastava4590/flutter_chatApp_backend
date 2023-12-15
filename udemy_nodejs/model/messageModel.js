const mongoose = require('mongoose');



const messageModelSchema = new mongoose.Schema({
   image:String,
   msg:String,
   sender:Boolean,
   count:String,
   type:String,
   opened:Boolean
  });

  module.exports = mongoose.model("messages", messageModelSchema);