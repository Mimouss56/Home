const express = require('express');

const router = express.Router();
const jobController = require('../controllers/job.controller');
const { loggedAs } = require('../../../middlewares/auth.middleware');
const { isLogged, validate, isAdminPost } = require('../../../middlewares/validate.middleware');
const { postJob } = require('../schemas/job.schema');
const { objectID } = require('../schemas/sanction.schema');
/**
 * GET /api/home/job
 * @summary Récupère tous les emplois
 * @tags Job
 * @return {array<Job>} 200
 * @return 500 - Erreur serveur
*/
router.route('/')
  .get(jobController.getAll);

router.route('/@me')
  /**
   * GET /api/home/job/@me
   * @summary Récupère tous les emplois de l'utilisateur
   * @tags Job
   * @security BearerAuth
   * @return {array<Job>} 200
   * @return 500 - Erreur serveur
  */
  .get(loggedAs, jobController.getAllByUser)

  /**
 * POST /api/home/job/@me
 * @summary Ajoute un emploi à l'utilisateur
 * @tags Job
 * @security BearerAuth
 * @param {JobPost} request.body.required - L'emploi à ajouter
 * @return {Job} 200 - L'emploi ajouté
 * @return 500 - Erreur serveur
 */
  .post(isLogged(postJob), jobController.post);

router.route('/:id')
/**
 * GET /api/home/job/{id}
 * @summary Récupère un emploi
 * @tags Job
 * @param {string} id.params.required - L'ID de l'emploi
 * @return {Job} 200
 * @return 500 - Erreur serveur
 */
  .get(loggedAs, jobController.get)
/**
 * PUT /api/home/job/{id}
 * @summary Modifie un emploi
 * @tags Job
 * @security BearerAuth
 * @param {string} id.params.required - L'ID de l'emploi
 * @param {JobPost} request.body.required - L'emploi à modifier
 * @return {Job} 200 - L'emploi modifié
 * @return 500 - Erreur serveur
 */
  .put(isLogged(postJob), validate(objectID, 'params'), jobController.put)

  /**
   * DELETE /api/home/job/{id}
   * @summary Supprime un emploi
   * @tags Job
   * @security BearerAuth
   * @param {string} id.params.required - L'ID de l'emploi
   * @return {string} 200 - L'emploi supprimé
   * @return 500 - Erreur serveur
   */
  .delete(isAdminPost(objectID, 'params'), jobController.delete);

module.exports = router;
