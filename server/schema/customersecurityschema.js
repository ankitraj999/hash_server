const { Timestamp } = require("mongodb");
const mongoose=require("mongoose");

const CustomerSchema=mongoose.Schema({
    email: {
        type: String,
        require:true

    },
    pin: {
        type: Number,
        require:true,
        default:0
    },
    hash:{
        type: String,
        require: true,

    },

},{
    timestamps : true
});

const customerobject=mongoose.model("Customer",CustomerSchema);
module.exports = customerobject;