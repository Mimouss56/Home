const express = require('express');
const projetController = require('../controllers/projet.controller');
const {
  isLogged, validate, isOwner,
} = require('../middlewares/validate.middleware');
const schema = require('../schemas/projet.schema');
const { loggedAs } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
// Rien
  .get(projetController.getAll)
// Islogged
  .post(isLogged(schema.post), projetController.post);

router.route('/:id')
  // isLogged
  .get(loggedAs, validate(schema.id, 'params'), projetController.get)
  // isOwner, isModo
  .put(loggedAs, validate(schema.id, 'params'), isOwner(schema.put), projetController.put)
  // isOwner, isModo
  .delete(isOwner(schema.id, 'params'), projetController.delete);

// User can participate to a projet
router.route('/:id/participate')
  // isLogged
  .post(loggedAs, validate(schema.id, 'params'), projetController.participate);

router.route('/:id/leave')
  // isLogged
  .post(loggedAs, validate(schema.id, 'params'), projetController.leave);

router.route('/:id/comment')
  .post(isLogged(schema.content), validate(schema.id, 'params'), projetController.addComment);

module.exports = router;
