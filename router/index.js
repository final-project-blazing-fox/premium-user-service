const router = require('express').Router()
const UserPremium = require('../controller')

router.get("/", (req, res, next) => {
    res.send("user premium service");
});

router.post('/user/premium', UserPremium.register)
module.exports = router