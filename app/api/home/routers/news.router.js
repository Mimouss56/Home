const router = require('express').Router();
const { isAdminPost } = require('../../../middlewares/validate.middleware');
const { loggedAs } = require('../../../middlewares/auth.middleware');
const { news } = require('../schemas/news.schema');

const newsController = require('../controllers/news.controller');

router.route('/')

  /**
   * GET /api/home/news
   * @summary Récupère tous les articles
   * @tags News
   * @return {array<News>} 200
   * @return 500 - Erreur serveur
   */
  .get(newsController.getAll)

  /**
   * POST /api/home/news
   * @summary Ajoute un article
   * @tags News
   * @security BearerAuth
   * @param {NewsPost} request.body.required - L'article à ajouter
   * @return {News} 200 - L'article ajouté
   */
  .post(isAdminPost(news), newsController.post);

router.route('/:id')

  /**
   * GET /api/home/news/{id}
   * @summary Récupère un article
   * @tags News
   * @param {string} id.params.required - L'ID de l'article
   * @return {News} 200
   */
  .get(newsController.get)

  /**
   * PUT /api/home/news/{id}
   * @summary Modifie un article
   * @tags News
   * @security BearerAuth
   * @param {string} id.params.required - L'ID de l'article
   * @param {NewsPost} request.body.required - L'article à modifier
   * @return {News} 200 - L'article modifié
   * @return 500 - Erreur serveur
   */
  .put(isAdminPost(news), newsController.update)

  /**
   * DELETE /api/home/news/{id}
   * @summary Supprime un article
   * @tags News
   * @security BearerAuth
   * @param {string} id.params.required - L'ID de l'article
   * @return 200 - L'article a été supprimé
   */
  .delete(loggedAs, newsController.delete);

module.exports = router;
