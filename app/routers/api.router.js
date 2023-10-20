const express = require('express');

const router = express.Router();
// router login
router.use('/bbc', require('../base_BBC/routers'));
router.use('/esa', require('../base_ESA/routers'));
router.use('/home', require('../base_home/routers'));

module.exports = router;
