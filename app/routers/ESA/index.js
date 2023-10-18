const router = require('express').Router();

router.use('/child', require('./child.router'));
router.use('/parent', require('./parent.router'));
router.use('/cantine', require('./cantine.router'));

module.exports = router;
