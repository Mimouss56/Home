/* eslint-disable max-len */
const router = require('express').Router();
const contactController = require('../../controllers/suiviEnt/contact.controller');
const { validate } = require('../../../../middlewares/validate.middleware');
const { contactPost } = require('../../schemas/suiviEnt/suivi.schema');

router.route('/:id')
  /**
   * GET /api/home/suivi/contact/{id}
   * @tags Suivi
   * @security BearerAuth
   * @summary Un contact avec son détail de contact, les echanges des contacts et les status des echanges
   * @param {string} id.path.required - id du contact
   * @return {Contact} 200 - success response - application/json
   * @return 401 - Unauthorized
   * @return 404 - Not Found
   * @return 500 - Unexpected error
   */
  .get(contactController.getContact);

router.route('/')

  .post(validate(contactPost), contactController.create);

module.exports = router;
