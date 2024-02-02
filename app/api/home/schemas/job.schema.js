const Joi = require('joi');

/**
 * @typedef {object} JobPost - Job object
 * @property {string} ent.required - Nom de l'entreprise
 * @property {string} title.required - Titre de l'emploi
 * @property {string} description.required - Description de l'emploi
 * @property {string} debut.required - Date de début dans l'entreprise
 * @property {string} fin.required - Date de fin dans l'entreprise
 * @property {string} ville.required - Ville de l'entreprise
 * @property {integer} departement.required - Département de l'entreprise
 * @property {string} urlImg.required - URL de l'image de l'entreprise
 */

const postJob = Joi.object({
  ent: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  debut: Joi.date().required(),
  fin: Joi.date().required(),
  ville: Joi.string().required(),
  departement: Joi.number().required(),
  urlImg: Joi.string().required(),
});
module.exports = {
  postJob,
};
