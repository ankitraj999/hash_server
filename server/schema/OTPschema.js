const { Timestamp } = require("mongodb");
const mongoose=require("mongoose");

const OTPSchema=mongoose.Schema({
    email: {
        type: String,
        require:true

    },
    otp:{
        type: String,
        require: true,
    },
    

},{
    timestamps : true
});

const otpObject=mongoose.model("Otptable",OTPSchema);
module.exports = otpObject;