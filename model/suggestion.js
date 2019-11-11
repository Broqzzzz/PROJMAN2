const mongoose = require("mongoose");

var Comment = mongoose.model("comment", {
    name: String,
    email: String,
    subject: String,
    message: String
})


module.exports ={
   Comment
}