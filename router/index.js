const router = require('express').Router()
const UserPremium = require('../controller')

router.get('/', (req, res,) => {
    res.send('user premium service');
});

router.post('/user/premium', UserPremium.register)
router.post('/notification', UserPremium.updatePayment)
module.exports = router