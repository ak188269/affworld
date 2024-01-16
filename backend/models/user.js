const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto=require("crypto");
const userSchema = new mongoose.Schema({
    name :  {
        type : String,
        required : [true , "Name must be provided"]
    } ,
    email : {
        type : String,
        required : [true , "Email must be provided"]
    } ,
    password :{
        type : String,
        required : [true , "Password must be provided"],
        select : false 
    },
    avatar : String,
    resetPasswordToken : {
        type : String ,
        default : "",
        select : false,
    },
    resetPasswordExpiryTime :{
        type : Date ,
        select : false,
    } ,
    googleId : String ,
}
);
userSchema.pre("save",async function(next){
    if(this.password && this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
    }
    next();
})
userSchema.methods.matchPassword = async function (password){
    return  await bcrypt.compare(password.toString() , this.password.toString());
}

//generating password reset token
userSchema.methods.getResetPasswordToken = function (){
    const resetToken=  crypto.randomBytes(20).toString("hex")
    const expirationTime = new Date(Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRY_TIME)); 
    this.resetPasswordExpiryTime = expirationTime;
    return resetToken;
}
module.exports = mongoose.model("user",userSchema);