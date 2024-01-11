const express = require('express');
const statusController = require('../controllers/status.controller');

const router = express.Router();
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
