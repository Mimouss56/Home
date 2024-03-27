const router = require('express').Router();
const feedbackController = require('../controllers/feedback.controller');
const { validate } = require('../../../middlewares/validate.middleware');
const { feedbackPost } = require('../schemas/feedback.schema');
/**
 * Error
 * @typedef {object} Error
 * @property {integer} code - Le code d'erreur
 * @property {string} message - Le message d'erreur
 */

/**
 * GET /feedback
 * @summary List complète des feedbacks
 * @tags Feedback
 * @return {array<Feedback>} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @security BearerAuth
*/
router.get('/', feedbackController.getAll);

/**
 * POST /feedback
 * @summary Ajoute un feedback
 * @tags Feedback
 * @param {FeedbackPost} request.body.required - Le feedback à ajouter
 * @return {Feedback} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 */
router.post('/', validate(feedbackPost), feedbackController.post);

/**
 * PUT /feedback/{id}/draft
 * @summary Marque un feedback comme brouillon
 * @tags Feedback
 * @param {integer} id.path.required - id du feedback
 * @return {Feedback} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @security BearerAuth
 */
router.put('/:id/draft', feedbackController.draft);

/**
 * PUT /feedback/{id}/read
 * @summary Marque un feedback comme lu
 * @tags Feedback
 * @param {integer} id.path.required - id du feedback
 * @return {Feedback} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @security BearerAuth
 */
router.put('/:id/read', feedbackController.read);

module.exports = router;
