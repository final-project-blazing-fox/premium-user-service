const router = require("express").Router();
const UserPremium = require("../controller");

router.post("/user/premium", UserPremium.register);
module.exports = router;
