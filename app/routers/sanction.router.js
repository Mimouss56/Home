const express = require('express');
const router = express.Router();
const sanctionController = require('../controllers/sanction.controller');
const { isAdminPost } = require('../middlewares/validate.middleware');
const { sanction, id } = require('../schema/sanction.schema');
router.route('/')
  .get(sanctionController.getAll)
  .post(isAdminPost(sanction), sanctionController.post);

router.route('/:id')
  .delete(isAdminPost(id, 'params'), sanctionController.delete)

module.exports = router;