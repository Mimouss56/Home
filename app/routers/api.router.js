const express = require('express');
const { loggedAs } = require('../middlewares/auth.middleware');
const router = express.Router();


router.use('/cv', require('./cv.router'));
router.use('/job/', require('./job.router'));
router.use('/school/', require('./school.router'));
router.use('/sanction/', require('./sanction.router'));


module.exports = router;