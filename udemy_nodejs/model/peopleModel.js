const mongoose = require('mongoose');



const peopleModelSchema = new mongoose.Schema({

   firstName:String,
   lastName:String,
   msg:String,
   date:String,
   count:String,
   story:Boolean,
   image:String,
   avatar:String,
   status:String,
   stories:Object,
  });

  module.exports = mongoose.model("peoples", peopleModelSchema);