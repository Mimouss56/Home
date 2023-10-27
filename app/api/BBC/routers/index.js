const router = require('express').Router();
router.use('/auth', require('./auth.router'));
router.use('/user', require('./user.router'));
router.use('/sanction', require('./sanction.router'));

module.exports = router;
