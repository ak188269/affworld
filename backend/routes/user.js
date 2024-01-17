const { register, login, logout, loginWithGoogle, googleCallback } = require('../controllers/user');
const auth = require('../middleware/auth');
const CustomError = require('../utils/customError');



const router = require('express').Router();

router.route("/register").post(register);
router.route("/login").post(login)
.get(auth ,async(req , res , next)=>{
    if(req.user)
    return res.json({success: true , data : req.user});
    return next(new CustomError("Not logged in",'401'));
});
router.route("/logout").get(auth,logout);
router.route("/auth/google").get(loginWithGoogle);
router.route("/auth/google/callback").get(googleCallback);

module.exports = router;