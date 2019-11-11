const mongoose = require("mongoose");

var Driver = mongoose.model("driver", {
    driverName:{
        first: String,
        last: String
    },
    contactNo: String,
    plateNo: String
    
})


module.exports ={
    Driver
}