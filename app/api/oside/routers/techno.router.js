const express = require('express');
const technoController = require('../controllers/techno.controller');
const { isModoPost, isAdminPost } = require('../middlewares/validate.middleware');
const schema = require('../schemas/techno.schema');

const router = express.Router();

router.route('/')
// Rien
  .get(technoController.getAll)
// Islogged
  .post(isModoPost(schema.post), technoController.post);

router.route('/:id')

//   .get(technoController.get)
// isOwner, isModo
  .put(isAdminPost(schema.id, 'params'), isModoPost(schema.put), technoController.put)
// isOwner, isModo
  .delete(isAdminPost(schema.id, 'params'), technoController.delete);

module.exports = router;
