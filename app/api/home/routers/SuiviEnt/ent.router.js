/* eslint-disable max-len */
const router = require('express').Router();
const { validate } = require('../../../../middlewares/validate.middleware');
const { EntPost } = require('../../schemas/suiviEnt/suivi.schema');
const entController = require('../../controllers/suiviEnt/ent.controller');

router.route('/')
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

module.exports = router;
