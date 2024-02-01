const express = require('express');

const router = express.Router();
const statusController = require('../controllers/status.controller');

router.route('/site/:id')
  .get(statusController.get)
  .put(statusController.put)
  .delete(statusController.delete);

router.route('/site')
  .get(statusController.getAll)
  .post(statusController.post);

router.get('/*', (req, res) => {
  res.json('Welcome to the Mouss\'s API');
});

module.exports = router;
