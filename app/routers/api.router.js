const express = require('express');

const router = express.Router();
// router login
// router.use('/bbc', require('../api/BBC/routers'));
router.use('/esa', require('../api/ESA/routers'));
router.use('/home', require('../api/home/routers'));
router.use('/oside', require('../api/oside/routers'));

module.exports = router;
