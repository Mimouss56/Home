/* eslint-disable max-len */
const router = require('express').Router();
const statusController = require('../../controllers/suiviEnt/status.controller');

router.route('/')
  /**
   * GET /api/home/suivi/interaction
   * @tags Suivi
   * @security BearerAuth
   * @summary Tous les échanges avec leur détail de contact, les echanges des contacts et les status des echanges
   * @return {Array.<Interaction>} 200 - success response - application/json
   * @return 401 - Unauthorized
   * @return 500 - Unexpected error
   */
  .get(statusController.getAllStatus);

module.exports = router;
