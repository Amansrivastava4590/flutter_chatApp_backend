const mongoose = require('mongoose');


 const meModelSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    avatar: String,
    city: String,
    relationship: String,
    gender: String,
    job_title: String,
    job_area: String,
    story: Boolean,
    status: String,
    stories: [String], // Assuming stories is an array of strings, adjust as needed
  });

  module.exports = mongoose.model("User", meModelSchema);