const express = require('express');

const router = express.Router();
const skillController = require('../controllers/skill.controller');

router.route('/')
  .get(skillController.getAll)
  .post(skillController.post);

router.route('/:id')
  .get(skillController.get);
// .put(skillController.put)
// .delete(skillController.delete)

module.exports = router;
