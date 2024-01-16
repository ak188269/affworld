const router = require('express').Router();


// Users routes
router.get("/",(req, res)=>{
    res.send("welcome to Affworld backend");
})
router.use(require('./user'));


module.exports = router;