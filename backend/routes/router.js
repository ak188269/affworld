const router = require('express').Router();


// Users routes
router.get("/",(req, res)=>{
    res.send("welcome to Affworld backend");
})

router.use("/api/v1/user",require("./user"));


module.exports = router;