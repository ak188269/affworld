const { addSecret, editSecret, deleteSecret, getAllSecret } = require('../controllers/secret');
const auth = require('../middleware/auth');

const router = require('express').Router();

// these routes are protected
router.use(auth)

router.route("/add").post(addSecret);
router.route("/edit/:id").put(editSecret);
router.route("/delete/:id").delete(deleteSecret);
router.route("/getAll").get(getAllSecret);

module.exports = router;
