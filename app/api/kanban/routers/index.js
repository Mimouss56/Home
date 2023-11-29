const express = require('express');

const router = express.Router();

router.use('/lists', require('./list.router'));
router.use('/cards', require('./card.router'));
// router.use('/tags', require('./tag'));

// Module exportable
module.exports = router;
