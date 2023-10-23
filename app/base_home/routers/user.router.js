const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');
const { loggedAs } = require('../../middlewares/auth.middleware');

router.get('/', loggedAs, userController.getAll);

router.route('/:id')
  .get(userController.get)
  .put(loggedAs, userController.put)
  .delete(loggedAs, userController.delete);

module.exports = router;
