const router = require('express').Router();

router.use('/contact', require('./contact.router'));
router.use('/interaction', require('./interaction.router'));
router.use('/status', require('./status.router'));

module.exports = router;
