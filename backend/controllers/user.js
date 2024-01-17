const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const mySecret = process.env.JWT_SECRET_KEY;
const axios = require("axios");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // this should be done in env variable replace this .. it was just for testing purpose
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});
const sendEmailWithRetry = (mailOptions,retryCount) =>{

  transporter.sendMail( mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      if (retryCount > 0) {
        console.log(`Retrying in 5 seconds (Attempt left${retryCount-1})...`);
        setTimeout(() => {
          sendEmailWithRetry(retryCount - 1);
        }, 5000);
      } else {
        console.log('Maximum retry attempts reached. Email could not be sent.');
        
      }
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

const sendVerificationEmail =  async (email , verificationToken) => {
  try {
    const url = process.env.NODE_ENV !== 'production' ? "http://localhost:8080" : "https://amazon-clone.onrender.com" ;
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Email verification',
      html: `<h1> Your account is successfully registered 🎉 </h1><p>Click the link to verify your email : <a href='${url}/api/v1/user/verify/email/${verificationToken}'> ${url}/api/v1/user/verify/email/${verificationToken} </a></p><p> Thank you</p>`,
    }

    sendEmailWithRetry(mailOptions,3);
    
  } catch (error) {
    console.error(error);
      }
  }



const register = asyncErrorHandler ( async (req, res , next) => {
      const { name, email, password } = req.body;
    if ( !name || !email || !password) {
      return next(new CustomError("Please fill all details ",400));
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return next(new CustomError("User already exist",409));

    }
    // if no account exists
    let user = await User.create({ ...req.body });

    //  this is donw because password and other field which should not be selected are also selected when creating a new account but when finbyid it will not be selected
    user = await User.findById(user._id);
  
    // ------- setting up cookies ------
    const token =  jwt.sign(
      { _id: user._id, name: user.name },
      mySecret
      ,
      {expiresIn : "1day"}
    );
    res.cookie("jwt", token, {
      maxAge: 24*60*60*1000 ,
      httpOnly: true,
       sameSite: 'None',
      secure: true,
    });
    
   
    return res.json({ success: true, message : "Registered successfully " , data :user});
  } 
);

  const verifyEmail = async(req,res,next)=>{
    
    const token = req.params.token;
   const user =await User.findOne({verificationToken:token})
    if (!user) {
      return res.status(400).json({ success : false ,message: 'Invalid verification token' });
    }

    if(parseInt(Date.now() - (user.verificationTokenExpiryTime).getTime()) > 0 ) {
      return next(new CustomError("Verification token has expired" , 400));
    }
    user.verified = true;
    user.verificationToken=null;
    user.verificationTokenExpiryTime=null;
    await user.save();
    res.send('Email verified successfully Now you can login' );
}
// ----------login handler------------------

const login = asyncErrorHandler(async function (req, res,next) {

    const { email, password } = req.body;
   
  if (!email || !password) {
    return next(new CustomError("Please fill valid email and password",400));
  }
  let user = await User.findOne({ email }).select(["password",'googleId']);
  if (!user) {
    return next(new CustomError("Invalid credentials",401));
  }
  if(user.googleId && !user.password){
    return next(new CustomError("You have to use sign in with Google account",400));
  }
  const isMatch = await user.matchPassword(password); 

  if(!isMatch)
  return next(new CustomError("Invalid credentials",401));

    user = await User.findById(user._id).populate('secret');
    const token =  jwt.sign(
      { _id: user._id, name: user.name },
      mySecret
      ,
      {expiresIn : "1day"}
    );
    res.cookie("jwt", token, {
      maxAge: 24*60*60*1000 ,
      httpOnly: true,
       sameSite: 'None',
      secure:true ,
    });
   
   return res.status(200).json({ success: true, message: "Logged in successfully", data : user });
  }
);
// ------ logout handler--------

const logout =  asyncErrorHandler(async (req, res) => {

    res.cookie("jwt", null, { maxAge: 0, httpOnly: true ,sameSite: 'None',
    secure:true ,});
    return res.status(200).json({ success: true, message: "Logged out successfully"});
});


const getSingleuser = asyncErrorHandler( async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new CustomError("No user found ",404));
    }
    
    const {password : pwd,resetPasswordToken , resetPasswordExpiryTime,verificationToken,verificationTokenExpiryTime, verified, ...data} = user?._doc ;
    res.status(200).json({
      success: true,
      data 
        });
});

const loginWithGoogle = asyncErrorHandler(async (req , res , next) => {
  const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid';
    const redirectURI = process.env.GOOGLE_CALLBACK_URL;
    const authURL = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${redirectURI}&scope=${scope}`;
  
    res.json({success : true, redirectURI : authURL})
  
})

const googleCallback = asyncErrorHandler(async (req, res , next) => {
  const { code } = req.query;
  console.log("callback");
    // Exchange code for access token
    const tokenResponse = await axios.post('https://accounts.google.com/o/oauth2/token', null, {
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: 'authorization_code',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Use access token to get user info
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const {id , email , name , picture} = userInfoResponse.data;
    let user = await User.findOne({email : email});
    if(!user){
    // Save user info to the database or retrieve user from the database
     user = await User.create({
      googleId : id ,
      email : email,
      name : name,
      avatar : picture,
    })
  }
    const token =  jwt.sign(
      { _id: user._id, name: user.name },
      mySecret
      ,
      {expiresIn : "1day"}
    );
    res.cookie("jwt", token, {
      maxAge: 24*60*60*1000 ,
      httpOnly: true,
       sameSite: 'None',
      secure:true ,
    });

   return  res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000/');
    
  })

  
module.exports = {
  login,
  register,
  verifyEmail,
  logout,
loginWithGoogle,
googleCallback,
  // verifyEmail,
};
