const mongoose = require('mongoose');



const chatModelSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    msg: String,
    date: String,
    count: String,
    story: Boolean,
    stories: Object,
    opened: Boolean,
    type: String,
  });

  module.exports = mongoose.model("Chats", chatModelSchema);