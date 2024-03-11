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
      id: value.id,
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
      competences: await skillService.getAllSkillCV(value.id),
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
  async create(inputQuery) {
    const { competences, id_user: idUser, ...rest } = inputQuery;
    try {
      const result = await cv.create(rest);
      if (competences.lengh > 0) {
        // on ajoute le lien entre le cv et les skills
        await cv.SkillCV(result.id, competences);
      }
      // on ajoute le lien entre le cv et l'utilisateur
      await cv.addJobUser(result.id, idUser);

      const returnValue = await this.generateObject(result);
      return returnValue;
    } catch (e) {
      return {
        code: 500,
        message: `Error on create: ${e}`,
      };
    }
  },
  async update(id, inputQuery) {
    const find = await cv.findByPk(id);
    if (!find) {
      return {
        code: 400,
        message: `${textValue} not found`,
      };
    }
    const { competences, id_user: idUser, ...rest } = inputQuery;
    try {
      const result = await cv.update(id, rest);
      await cv.SkillCV(result.id, competences);

      const returnValue = await this.generateObject(result);
      return returnValue;
    } catch (e) {
      return {
        code: 500,
        message: `Error on update: ${e}`,
      };
    }
  },

};
