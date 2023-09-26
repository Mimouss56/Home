const path = require('path');
const express = require('express');

const router = express.Router();

const apiRouter = require('./api.router');

router.use('/api', apiRouter);

const publicPath = path.resolve(__dirname, '../../public');
router.get('/*', (req, res) => {
  res.sendFile('index.html', { root: publicPath });
});

module.exports = router;
