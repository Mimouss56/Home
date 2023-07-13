const router = require('express').Router();

router.route('/api').get((req, res) => {
  res.json({ message: 'Hello World!' });
});

module.exports = router