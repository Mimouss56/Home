const router = require('express').Router();

const recommandationsController = require('../controllers/recommandations.controller');

router.route('/')
  /**
   * GET /api/home/recommandations
   * @summary Get recommandations
   * @tags Recommandations
   * @return {Recommandations} 200 - Recommandations
   * @return 500 - Unexpected error
   */
  .get(recommandationsController.getAll)
  /**
   * POST /api/home/recommandations
   * @summary Create a recommandation
   * @tags Recommandations
   * @param {Recommandation} request.body.required - Recommandation object
   * @return {Recommandation} 200 - Recommandation created
   * @return 500 - Unexpected error
   */
  .post(recommandationsController.create);

router.route('/:id')
  .delete(recommandationsController.delete);

module.exports = router;
