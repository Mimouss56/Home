const router = require('express').Router();
const { loggedAs } = require('../../../middlewares/auth.middleware');
const { isLogged } = require('../../../middlewares/validate.middleware');
const cvController = require('../controllers/cv.controller');
const { postJob } = require('../schemas/job.schema');

router.route('/')
  /**
   * GET /api/home/cv
   * @summary Get all CV
   * @tags CV
   * @return {array<Job>} 200 - CV list
   * @return 500 - Unexpected error
   */
  .get(cvController.getAll);

router.route('/@me')
  /**
   * GET /api/home/cv/@me
    * @summary Get all CV by user
    * @tags CV
    * @return {array<Job>} 200 - CV list
    * @return 500 - Unexpected error
    * @security BearerAuth
    */
  .get(loggedAs, cvController.getAllByUser)
  /**
     * POST /api/home/cv/@me
     * @summary Create a new CV for the user
     * @tags CV
     * @param {JobPost} request.body.required - CV object
     * @return {Job} 200 - CV created
     * @return 400 - Invalid school object
     * @return 500 - Unexpected error
     * @security BearerAuth
     */
  .post(isLogged(postJob), cvController.post);

router.route('/@me/:id')

  /**
     * PUT /api/home/cv/@me/{id}
     * @summary Update cv by id
     * @tags CV
     * @param {string} id.path.required - id
     * @param {JobPost} request.body.required - CV object
     * @return {Job} 200 - CV updated
     * @security BearerAuth
     * @return 400 - Invalid id
     * @return 500 - Unexpected error
     */
  .put(isLogged(postJob), cvController.post);

router.route('/:id')

  /**
   * GET /api/home/cv/{id}
   * @summary Get cv by id
   * @tags CV
   * @param {string} id.path.required - id
   * @return {Job} 200 - CV object
   * @return 400 - Invalid id
   * @return 500 - Unexpected error
   */
  .get(cvController.get);

//   /**
//    * DELETE /api/home/school/{id}
//    * @summary Delete school by id
//    * @tags School
//    * @param {string} id.path.required - id
//    * @return {Job} 200 - School deleted
//    * @security BearerAuth
//    * @return 400 - Invalid id
//    * @return 500 - Unexpected error
//    * @return 401 - Unauthorized
//    */
//   .delete(checkRole(1), schoolController.delete);
// !TODO : Factoriser les routes pour les écoles et les emplois suivantes

// router.route('/@me')

//   /**
//   * POST /api/home/job/@me
//   * @summary Ajoute un emploi à l'utilisateur
//   * @tags Job
//   * @security BearerAuth
//   * @param {JobPost} request.body.required - L'emploi à ajouter
//   * @return {Job} 200 - L'emploi ajouté
//   * @return 500 - Erreur serveur
//   */
//   .post(isLogged(postJob), jobController.post);

// router.route('/:id')

//   /**
//    * GET /api/home/school/{id}
//    * @summary Get school by id
//    * @tags School
//    * @param {string} id.path.required - id
//    * @return {Job} 200 - School object
//    * @return 400 - Invalid id
//    * @return 500 - Unexpected error
//    */
//   .get(schoolController.get)

// router.route('/:id')
//   /**
//   * GET /api/home/job/{id}
//   * @summary Récupère un emploi
//   * @tags Job
//   * @param {string} id.params.required - L'ID de l'emploi
//   * @return {Job} 200
//   * @return 500 - Erreur serveur
//   */
//   .get(loggedAs, jobController.get)
//   /**
//   * PUT /api/home/job/{id}
//   * @summary Modifie un emploi
//   * @tags Job
//   * @security BearerAuth
//   * @param {string} id.params.required - L'ID de l'emploi
//   * @param {JobPost} request.body.required - L'emploi à modifier
//   * @return {Job} 200 - L'emploi modifié
//   * @return 500 - Erreur serveur
//   */
//   .put(isLogged(postJob), validate(objectID, 'params'), jobController.put)

//   /**
//    * DELETE /api/home/job/{id}
//    * @summary Supprime un emploi
//    * @tags Job
//    * @security BearerAuth
//    * @param {string} id.params.required - L'ID de l'emploi
//    * @return {string} 200 - L'emploi supprimé
//    * @return 500 - Erreur serveur
//    */
//   .delete(isAdminPost(objectID, 'params'), jobController.delete);

module.exports = router;
