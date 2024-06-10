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
  // type est soit job, soit school
  type: Joi.string().valid('job', 'school').required(),
  ent: {
    id: Joi.number().required(),
    name: Joi.string().required(),
    address: Joi.string().not().required(),
    postalCode: Joi.string().not().required(),
    town: Joi.string().not().required(),
    urlImg: Joi.string().not().required(),
  },
  // id_ent: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: {
    debut: Joi.date().required(),
    fin: Joi.date().required(),
  },
  // competences est un array d'objets de type id, name
  competences: Joi.array().items(Joi.object({
    id: Joi.number(),
    name: Joi.string(),
  })).optional().allow(null),
  // competences: Joi.array().items(Joi.number()),
});
module.exports = {
  postJob,
};
