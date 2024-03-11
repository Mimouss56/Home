const Joi = require('joi');

/**
 * @typedef {object} JobPost - Job object
 * @property {string} id_ent.required - ID de l'entreprise
 * @property {string} title.required - Titre de l'emploi
 * @property {string} description.required - Description de l'emploi
 * @property {string} debut.required - Date de début dans l'entreprise
 * @property {string} fin.required - Date de fin dans l'entreprise
 */

const postJob = Joi.object({
  type: Joi.string().required(),
  id_ent: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  debut: Joi.date().required(),
  fin: Joi.date().required(),
  competences: Joi.array().items(Joi.number()),
});
module.exports = {
  postJob,
};
