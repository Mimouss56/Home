const router = require('express').Router();
const entController = require('../controllers/suiviEnt/ent.controller');

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
  .get(entController.getAllEnt);

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
  .get(entController.getEnt);

module.exports = router;
