const express = require('express');
const userController = require('../controllers/user.controller');
const { validate } = require('../middlewares/validate.middleware');
const { loggedAs, isHimself } = require('../middlewares/auth.middleware');
const schema = require('../schemas/user.schema');

const router = express.Router();

router.route('/')
// loggedAsAdmin() check if the user is logged as admin
  .get(userController.getAll);

router.route('/:id')
  .get(loggedAs, validate(schema.id, 'params'), userController.get)
  .put(isHimself(schema.id, 'params'), isHimself(schema.put), userController.put)
// Only user himself or admin can delete his account
  .delete(isHimself(schema.id, 'params'), userController.delete);

router.route('/login')
//   .post(validate(schema.login), userController.login);
  .post(userController.login);

router.post('/register', validate(schema.register), userController.register);

module.exports = router;
