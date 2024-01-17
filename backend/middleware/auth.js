const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const mySecret = process.env.JWT_SECRET_KEY;
const User = require("../models/user");
const auth = asyncErrorHandler ( async (req , res , next) => {
        
       let token = req.cookies?.jwt;
       
       if(!token)
       token = req.headers["authorization"] || req.headers["Authorization"];
        if(!token)
        return res.status(401).json({success:false , message : "Not Authorized need to login first"});

        const userDetails =  jwt.verify(token,mySecret);
        const user = await User.findById(userDetails._id).populate('secret');
        req.user = user;
        
        return next();
  
});

module.exports = auth;
