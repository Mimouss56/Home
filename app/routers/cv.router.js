const express = require('express');
const router = express.Router();

const cvController = require('../controllers/cv.controller');

router.route('/')
  .get(cvController.renderCv);

module.exports = router;