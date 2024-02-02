const express = require('express');

const router = express.Router();
const sanctionController = require('../controllers/sanction.controller');
const { isAdminPost, validate } = require('../../../middlewares/validate.middleware');
const { sanction, objectID } = require('../schemas/sanction.schema');

router.route('/')

  /**
   * GET /api/home/sanction
   * @summary Get all sanctions
   * @tags Sanction
   * @security BearerAuth
   * @return {array<Sanction>} 200 - Sanctions list
   * @return 500 - Unexpected error
   */
  .get(sanctionController.getAll)

  /**
   * POST /api/home/sanction
   * @summary Create a new sanction
   * @tags Sanction
   * @param {SanctionPost} request.body.required - Sanction object
   * @return {Sanction} 200 - Sanction created
   * @return 400 - Invalid data
   * @return 500 - Unexpected error
   * @security BearerAuth
   */
  .post(isAdminPost(sanction), sanctionController.post);

router.route('/@me')

  /**
   * GET /api/home/sanction/@me
   * @summary Get my sanctions
   * @tags Sanction
   * @return {array<Sanction>} 200 - Sanctions list
   * @return 500 - Unexpected error
   * @security BearerAuth
   */
  .get(sanctionController.getMe);

router.route('/:id')

  /**
   * GET /api/home/sanction/{id}
   * @summary Get a sanction
   * @tags Sanction
   * @param {integer} id.path.required - ID of the sanction
   * @return {Sanction} 200 - Sanction
   * @return 404 - Sanction not found
   * @return 500 - Unexpected error
   * @security BearerAuth
   */
  .get(validate(objectID, 'params'), sanctionController.get)

  /**
   * PUT /api/home/sanction/{id}
   * @summary Update a sanction
   * @tags Sanction
   * @param {integer} id.path.required - ID of the sanction
   * @param {SanctionPost} request.body.required - Sanction object
   * @return {Sanction} 200 - Sanction updated
   * @return 400 - Invalid data
   * @return 404 - Sanction not found
   * @return 500 - Unexpected error
   * @security BearerAuth
   */
  .put(validate(objectID, 'params'), isAdminPost(sanction), sanctionController.put)

  /**
   * DELETE /api/home/sanction/{id}
   * @summary Delete a sanction
   * @tags Sanction
   * @param {integer} id.path.required - ID of the sanction
   * @return {string} 200 - Sanction deleted
   * @return 404 - Sanction not found
   * @return 500 - Unexpected error
   * @security BearerAuth
   */
  .delete(isAdminPost(objectID, 'params'), sanctionController.delete);

router.route('/:id/read')

  /**
   * PUT /api/home/sanction/{id}/read
   * @summary Mark a sanction as read
   * @tags Sanction
   * @param {integer} id.path.required - ID of the sanction
   * @return {Sanction} 200 - Sanction updated
   * @return 400 - Invalid data
   * @return 404 - Sanction not found
   * @return 500 - Unexpected error
   * @security BearerAuth
   */
  .put(validate(objectID, 'params'), sanctionController.read);

module.exports = router;
