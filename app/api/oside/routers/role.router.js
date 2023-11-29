const express = require('express');
const roleController = require('../controllers/role.controller');
const { isAdminPost } = require('../middlewares/validate.middleware');
const schema = require('../schemas/techno.schema');

const router = express.Router();
router.route('/:id')
  .get(isAdminPost(schema.id, 'params'), roleController.get)
  .put(isAdminPost(schema.id, 'params'), isAdminPost(schema.put), roleController.put)
  .delete(isAdminPost(schema.id, 'params'), roleController.delete);

router.route('/')
  .get(roleController.getAll)
  .post(isAdminPost(schema.put), roleController.post);

module.exports = router;
