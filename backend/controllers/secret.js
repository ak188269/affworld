const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const Secret = require("../models/secret");
const User = require("../models/user");
const addSecret = asyncErrorHandler(async (req ,res , next) => {
    const {secret} = req.body;
    if(!secret) return next(new CustomError("There must a secret ",400));

    let user = await User.findById(req.user._id).populate('secret');
    if(!user) return next(new CustomError("Invalid user",400));
    if(user.secret){
        
        return next(new CustomError("You already have a secret",400));
    }
    const secretObj = await Secret.create({user : req.user._id, secret : secret});
    user.secret = secretObj._id;
    await user.save();
    user = await User.findById(req.user._id).populate('secret');
    return res.json({success : true, message : "Added successfully" ,data : user});
    
    
})

const editSecret = asyncErrorHandler(async(req , res , next) => {
   const { secret} = req.body ;
   const {id} = req.params;
   if(!id || !secret) 
   return next(new CustomError("Id and secret are required",400));

   const secretObj = await Secret.findById(id);
   if(!secretObj)
   return next(new CustomError("No such secret with provided id",404));
   secretObj.secret = secret;
   await secretObj.save();
   const user = await User.findById(req.user._id).populate('secret');
   return res.json({success: true , message : "Secret saved successfully",data : user});
    
});

const deleteSecret = asyncErrorHandler(async (req, res  , next) => {
    const {id } = req.params;
    if(!id)
    return next(new CustomError("Id is required",400));
    const secretObj = await Secret.findById(id);
    
    if(!secretObj)
    return next(new CustomError("No such secret with id " + id , 404));

    await Secret.findByIdAndDelete(id);
    const user = await User.findById(req.user._id).populate("secret");
    user.secret = null;
    await user.save();
    return res.json({success: true, message : "Secret deleted successfully" ,data : user})
    
})

const getAllSecret = asyncErrorHandler(async (req , res , next)=>{
    const allSecret = await Secret.find();
    return res.json({success : true , data : allSecret});
})
module.exports = {addSecret ,editSecret ,deleteSecret , getAllSecret};