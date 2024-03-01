const express = require('express');

const router = express.Router();
const schoolController = require('../controllers/school.controller');
const { isLogged } = require('../../../middlewares/validate.middleware');
const { postJob } = require('../schemas/job.schema');
const { loggedAs, checkRole } = require('../../../middlewares/auth.middleware');

router.route('/')
  /**
   * GET /api/home/school
   * @summary Get all schools
   * @tags School
   * @return {array<Job>} 200 - Schools list
   * @return 500 - Unexpected error
   */
  .get(schoolController.getAll);

router.route('/@me')
  /**
   * GET /api/home/school/@me
    * @summary Get all schools by user
    * @tags School
    * @return {array<Job>} 200 - Schools list
    * @return 500 - Unexpected error
    * @security BearerAuth
    */
  .get(loggedAs, schoolController.getAllByUser)

  /**
   * POST /api/home/school/@me
   * @summary Create a new school for the user
   * @tags School
   * @param {JobPost} request.body.required - School object
   * @return {Job} 200 - School created
   * @return 400 - Invalid school object
   * @return 500 - Unexpected error
   * @security BearerAuth
   */
  .post(isLogged(postJob), schoolController.post);

router.route('/:id')

  /**
   * GET /api/home/school/{id}
   * @summary Get school by id
   * @tags School
   * @param {string} id.path.required - id
   * @return {Job} 200 - School object
   * @return 400 - Invalid id
   * @return 500 - Unexpected error
   */
  .get(schoolController.get)

  /**
   * PUT /api/home/school/{id}
   * @summary Update school by id
   * @tags School
   * @param {string} id.path.required - id
   * @param {JobPost} request.body.required - School object
   * @return {Job} 200 - School updated
   * @security BearerAuth
   * @return 400 - Invalid id
   * @return 500 - Unexpected error
   */
  .put(loggedAs, schoolController.put)

  /**
   * DELETE /api/home/school/{id}
   * @summary Delete school by id
   * @tags School
   * @param {string} id.path.required - id
   * @return {Job} 200 - School deleted
   * @security BearerAuth
   * @return 400 - Invalid id
   * @return 500 - Unexpected error
   * @return 401 - Unauthorized
   */
  .delete(checkRole(1), schoolController.delete);

module.exports = router;
