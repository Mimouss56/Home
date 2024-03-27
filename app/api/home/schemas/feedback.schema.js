const Joi = require('joi');

/**
 * @typedef {object} FeedbackPost
 * @property {string} message.required - Le message du feedback
 * @property {string} name.required - Le nom de l'utilisateur du feedback
 * @property {string} email.required - L'email de l'utilisateur du feedback
 * @property {string} path.required - Le chemin de la page du feedback
 * @property {boolean} draft - Le brouillon du feedback
 */

const feedbackPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  message: Joi.string().required(),
  path: Joi.string().required(),
  draft: Joi.boolean(),
});

const feedbackRead = Joi.object({
  read: Joi.boolean().required(),
});

module.exports = {
  feedbackPost,
  feedbackRead,
};
