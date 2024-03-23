const express = require('express');
const path = require('path');

const router = express.Router();

router.use('/api', require('./api.router'));

router.use('/status', require('./status.router'));

router.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

module.exports = router;
