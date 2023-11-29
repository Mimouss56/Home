const express = require('express');

const router = express.Router();

router.use('/techno', require('./techno.router'));
router.use('/projet', require('./projet.router'));
router.use('/user', require('./user.router'));
router.use('/role', require('./role.router'));
router.use('/comment', require('./comment.router'));

module.exports = router;
