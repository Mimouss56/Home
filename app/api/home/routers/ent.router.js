const router = require('express').Router();
const entController = require('../controllers/suiviEnt/ent.controller');
const { validate } = require('../../../middlewares/validate.middleware');
const { EntPost } = require('../schemas/suiviEnt/suivi.schema');

router.route('/')
  /**
   * GET /api/home/suivi/ent
   * @tags Suivi
   * @security BearerAuth
   * @summary Toutes les entreprises avec leur détails
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
   * @summary Une entreprise avec son détail
   * @param {string} id.path.required - id de l'entreprise
   * @return {Ent} 200 - success response - application/json
   * @return 401 - Unauthorized
   * @return 404 - Not Found
   * @return 500 - Unexpected error
   */
  .get(entController.getEnt)
  /**
   * PUT /api/home/suivi/ent/{id}
   * @tags Suivi
   * @security BearerAuth
   * @summary Mettre à jour une entreprise
   * @param {string} id.path.required - id de l'entreprise
   * @param {Ent.model} request.body.required - entreprise à mettre à jour
   * @return {Ent} 200 - success response - application/json
   */
  .put(entController.put);

module.exports = router;
