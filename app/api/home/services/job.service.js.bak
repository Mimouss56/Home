const { job } = require('../models/index.mapper');
const skillService = require('./skill.service');
const entService = require('./ent.service');

const textValue = 'job';

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
    };
  },

  async getAll() {
    const find = await job.findAll();
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
    const find = await job.findAllByUserId(id);
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }

    const returnValue = await Promise.all(find.map(this.generateObject));
    return returnValue;
  },

  async getData(id) {
    try {
      const findByID = await job.findByPk(id);
      const returnValue = await this.generateObject(findByID);
      return returnValue;
    } catch (error) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
  },

  async create(inputQuery) {
    try {
      const { id_user: userId, ...jobData } = inputQuery;
      const value = await job.create(jobData);
      await job.addJobUser(value.id, userId);
      const returnValue = await this.generateObject(value);
      return returnValue;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not created : ${error}}`,
      };
    }
  },

  async update(id, inputQuery) {
    try {
      const valueUpdated = await job.update(id, inputQuery);
      return valueUpdated;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not updated`,
      };
    }
  },

  async delete(id) {
    try {
      const valueDeleted = await job.delete(id);
      return valueDeleted;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },

  async deleteJobUser(idUser, idJob) {
    try {
      const valueDeleted = await job.deleteJobUser(idUser, idJob);
      return valueDeleted;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },
};
