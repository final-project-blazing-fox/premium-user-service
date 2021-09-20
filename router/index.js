const router = require('express').Router()
const UserPremium = require('../controller')

router.use('/user/premium', UserPremium.register)

module.exports = router