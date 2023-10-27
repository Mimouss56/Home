const express = require('express');
const commentController = require('../controllers/comment.controller');
const { isLogged, isAdminPost } = require('../middlewares/validate.middleware');
const schema = require('../schemas/projet.schema');

const router = express.Router();

router.route('/:id', isLogged(schema.id, 'params'))
  .put(isLogged(schema.id, 'params'), commentController.flag)
  .delete(isAdminPost(schema.id, 'params'), commentController.deleteFlagged);

router.route('/')
  .get(commentController.getAll);

module.exports = router;
