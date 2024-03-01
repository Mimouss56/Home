const { cv } = require('../models/index.mapper');

const skillService = require('./skill.service');
const entService = require('./ent.service');

const textValue = 'cv';

module.exports = {

  /**
 * @typedef {object} Job - Description de l'emploi
 * @property {integer} id - L'ID de l'emploi
 * @property {string} title - Le titre de l'emploi
 * @property {DateJob} date - Les dates de l'emploi
 * @property {Ent} ent - L'entreprise de l'emploi
 * @property {string} description - La description de l'emploi
 * @property {string[]} competences - Les compétences de l'emploi
 */

  async generateObject(value) {
    return {
      id: value.id_job || value.id_schooling,
      title: value.title,
      description: value.description,
      ent: await entService.getData(value.id_ent),
      /**
           * DateJob
           * @typedef {object} DateJob
           * @property {string} debut - Date de début
           * @property {string} fin - Date de fin
           */
      date: {
        debut: value.date_started,
        fin: value.date_ended,
      },
      competences: await skillService.getAllSkillJob(value.id),
      type: value.type,
    };
  },

  async getAll(type = false) {
    const find = type ? await cv.findAll({ where: { type } }) : await cv.findAll();
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = await Promise.all(find.map(this.generateObject));
    return returnValue;
  },

  async getAllByUser(id) {
    const find = await cv.findAllByUserId(id);
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = await Promise.all(find.map(this.generateObject));
    return returnValue;
  },

  async get(id) {
    const find = await cv.findByPk(id);
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    return this.generateObject(find);
  },

};
