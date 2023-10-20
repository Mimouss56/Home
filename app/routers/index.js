const path = require('path');
const express = require('express');

const router = express.Router();

router.use('/api', require('./api.router'));

const publicPath = path.resolve(__dirname, '../../public');
router.get('/*', (req, res) => {
  res.sendFile('index.html', { root: publicPath });
});

module.exports = router;
