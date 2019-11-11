const mongoose = require("mongoose");

var Order = mongoose.model("order", {
    warehouseID : Number,
    customerName: String,
    customerAddress: String,
    order_specifics: {
        qty: [Number],
        unit : [Number],
        item: [String],
    }
})


module.exports ={
    Order
}