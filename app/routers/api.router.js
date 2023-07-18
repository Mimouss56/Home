const express = require('express');
const router = express.Router();


router.use('/cv', require('./cv.router'));
router.use('/job/', require('./job.router'));
router.use('/school/', require('./school.router'));


module.exports = router;