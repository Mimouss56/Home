/* eslint-disable max-len */
const router = require('express').Router();
const interactionController = require('../../controllers/suiviEnt/interaction.controller');

router.route('/')

  /**
   * POST /api/home/suivi/interaction
   * @tags Suivi
   * @security BearerAuth
   * @summary Créer un échange
   * @param {CreateInteraction} request.body.required - CreateInteraction object
   * @return {Interaction} 201 - success response - application/json
   * @return 401 - Unauthorized
   * @return 500 - Unexpected error
   */
  .post(interactionController.create);

module.exports = router;
