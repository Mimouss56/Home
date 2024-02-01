const express = require('express');
const { loggedAs } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use('/home', require('../api/home/routers'));

router.use('/bbc', require('../api/BBC/routers'));
router.use('/esa', require('../api/ESA/routers'));
router.use('/oside', require('../api/oside/routers'));
router.use('/kanban', loggedAs, require('../api/kanban/routers'));

router.get('/*', (req, res) => {
  res.json('Welcome to the Mouss\'s API');
});

module.exports = router;
