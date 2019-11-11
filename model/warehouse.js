const mongoose = require("mongoose");

var Warehouse = mongoose.model("warehouse", {
    warehouseName: String
})

module.exports ={
    Warehouse
}