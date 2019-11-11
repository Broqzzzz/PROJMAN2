const mongoose = require("mongoose");

var User = mongoose.model("user", {
    username : {
        type: String,
        unique: true,
    },
    password : String,
    firstname: String,
    lastname: String,
    userType: Number,
})


module.exports ={
    User
}