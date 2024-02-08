/* eslint-disable max-len */
const router = require('express').Router();
const { loggedAs } = require('../../../../middlewares/auth.middleware');
const { validate } = require('../../../../middlewares/validate.middleware');
const { EntPost } = require('../../schemas/suiviEnt/suivi.schema');
const entController = require('../../controllers/suiviEnt/ent.controller');

router.route('/', loggedAs)
  /**
   * GET /api/home/suivi/ent
   * @tags Suivi
   * @security BearerAuth
   * @summary Toutes les entreprises avec leur détails de contact, les echanges des contacts et les status des echanges
   * @return {Array.<SuiviEnt>} 200 - success response - application/json
   * @return 401 - Unauthorized
   * @return 500 - Unexpected error
   */
  .get(entController.getAllEnt)

  /**
   * POST /api/home/suivi/ent
   * @tags Suivi
   * @security BearerAuth
   * @summary Créer une entreprise
   * @param {EntPost} request.body.required - L'entreprise
   * @return {Ent} 200 - success response - application/json
   * @return 401 - Unauthorized
   */
  .post(validate(EntPost), entController.post);

router.route('/:id')
  /**
   * GET /api/home/suivi/ent/{id}
   * @tags Suivi
   * @security BearerAuth
   * @summary Une entreprise avec son détail de contact, les echanges des contacts et les status des echanges
   * @param {string} id.path.required - id de l'entreprise
   * @return {Ent} 200 - success response - application/json
   * @return 401 - Unauthorized
   * @return 404 - Not Found
   * @return 500 - Unexpected error
   */
  .get(entController.getEnt);

module.exports = router;