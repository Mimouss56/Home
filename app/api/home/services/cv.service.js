const { cv } = require('../models/index.mapper');

const softSkillService = require('./softSkill.service');
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
      competences: await softSkillService.getAllSkillCV(value.id),
      type: value.type,
    };
  },

  async getAll(type = false) {
    const find = type ? await cv.details.findAll({ where: { type } }) : await cv.details.findAll();
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
    const find = await cv.details.findAllByUserId(id);
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
    const find = await cv.details.findByPk(id);
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    return this.generateObject(find);
  },
  async getInfo(userID) {
    const find = await cv.infos.findOne({ where: { user_id: userID } });
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const { user_id: userId, ...rest } = find;
    return rest;
  },
  async create(inputQuery) {
    const { competences, id_user: idUser, ...rest } = inputQuery;
    try {
      const result = await cv.details.create(rest);
      if (competences.lengh > 0) {
        // on ajoute le lien entre le cv et les skills
        await cv.details.SkillCV(result.id, competences);
      }
      // on ajoute le lien entre le cv et l'utilisateur
      await cv.details.addJobUser(result.id, idUser);

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
    const find = await cv.details.findByPk(id);
    if (!find) {
      return {
        code: 400,
        message: `${textValue} not found`,
      };
    }
    const { competences, id_user: idUser, ...rest } = inputQuery;
    try {
      const result = await cv.details.update(id, rest);
      await cv.details.SkillCV(result.id, competences);

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
