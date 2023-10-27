const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
  .get(userController.getAllUser);
router.route('/:id')
  .get(userController.infosUser);
module.exports = router;
