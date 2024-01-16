const { register, login, logout } = require('../controllers/user');
const auth = require('../middleware/auth');
const CustomError = require('../utils/CustomError');


const router = require('express').Router();

router.route("/register").post(register);
router.route("/login").post(login)
.get(auth ,async(req , res , next)=>{
    if(req.user)
    return res.json({success: true , data : req.user});
    return next(new CustomError("Not logged in",'401'));
});
router.route("/logout").get(auth,logout);

module.exports = router;