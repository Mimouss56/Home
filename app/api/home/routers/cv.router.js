const router = require('express').Router();
const { loggedAs } = require('../../../middlewares/auth.middleware');
const cvController = require('../controllers/cv.controller');

router.route('/')
  /**
   * GET /api/home/school
   * @summary Get all schools
   * @tags Cv
   * @return {array<Job>} 200 - Schools list
   * @return 500 - Unexpected error
   */
  .get(cvController.getAll);

router.route('/@me')
  /**
   * GET /api/home/cv/@me
    * @summary Get all schools by user
    * @tags Cv
    * @return {array<Job>} 200 - Schools list
    * @return 500 - Unexpected error
    * @security BearerAuth
    */
  .get(loggedAs, cvController.getAllByUser);

router.route('/:id')

  /**
   * GET /api/home/cv/{id}
   * @summary Get cv by id
   * @tags Cv
   * @param {string} id.path.required - id
   * @return {Job} 200 - Cv object
   * @return 400 - Invalid id
   * @return 500 - Unexpected error
   */
  .get(cvController.get);

// !TODO : Factoriser les routes pour les écoles et les emplois suivantes

// router.route('/@me')

//   /**
//    * POST /api/home/school/@me
//    * @summary Create a new school for the user
//    * @tags School
//    * @param {JobPost} request.body.required - School object
//    * @return {Job} 200 - School created
//    * @return 400 - Invalid school object
//    * @return 500 - Unexpected error
//    * @security BearerAuth
//    */
//   .post(isLogged(postJob), schoolController.post);
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

//   /**
//    * PUT /api/home/school/{id}
//    * @summary Update school by id
//    * @tags School
//    * @param {string} id.path.required - id
//    * @param {JobPost} request.body.required - School object
//    * @return {Job} 200 - School updated
//    * @security BearerAuth
//    * @return 400 - Invalid id
//    * @return 500 - Unexpected error
//    */
//   .put(loggedAs, schoolController.put)

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
