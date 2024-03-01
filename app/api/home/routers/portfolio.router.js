const router = require('express').Router();
const { loggedAs } = require('../../../middlewares/auth.middleware');
const { validate } = require('../../../middlewares/validate.middleware');
const { portfolioPost } = require('../schemas/portfolio.schema');
const portfolioController = require('../controllers/portfolio.controller');

router.route('/')
  /**
   * GET /api/home/portfolio
   * @summary View all portfolios
   * @tags Portfolio
   * @return {Array<Portfolio>} 200 - Success response - application/json
   * @return 500 - Unexpected error
   */
  .get(portfolioController.getAll)

  /**
   * POST /api/home/portfolio
   * @summary Create a new portfolio
   * @tags Portfolio
   * @param {PortfolioPost} request.body.required - Portfolio object
   * @return {Portfolio} 200 - Success response - application/json
   * @return 400 - Invalid data
   * @return 500 - Unexpected error
   * @return 401 - Unauthorized
   */
  .post(loggedAs, validate(portfolioPost), portfolioController.create);

router.route('/:id')

  /**
     * GET /api/home/portfolio/{id}
     * @summary View a portfolio
     * @tags Portfolio
     * @param {integer} id.path.required - ID of the portfolio
     * @return {Portfolio} 200 - Success response - application/json
     * @return 404 - Portfolio not found
     * @return 500 - Unexpected error
     */
  .get(loggedAs, portfolioController.getOne)

  /**
       * PUT /api/home/portfolio/{id}
       * @summary Update a portfolio
       * @tags Portfolio
       * @param {integer} id.path.required - ID of the portfolio
       * @param {PortfolioPost} request.body.required - Portfolio object
       * @return {Portfolio} 200 - Success response - application/json
       * @return 400 - Invalid data
       * @return 404 - Portfolio not found
       * @return 500 - Unexpected error
    */
  .put(loggedAs, portfolioController.update)

  /**
   * DELETE /api/home/portfolio/{id}
   * @summary Delete a portfolio
   * @tags Portfolio
   * @param {integer} id.path.required - ID of the portfolio
   * @return {string} 200 - Success response - application/json
   * @return 404 - Portfolio not found
   * @return 500 - Unexpected error
   */
  .delete(loggedAs, portfolioController.delete);

module.exports = router;
