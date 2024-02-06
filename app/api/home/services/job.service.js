const { job } = require('../models/index.mapper');
const skillService = require('./skill.service');

const textValue = 'job';

/**
 * @typedef {object} Job - Description de l'emploi
 * @property {integer} id - L'ID de l'emploi
 * @property {string} title - Le titre de l'emploi
 * @property {DateJob} date - Les dates de l'emploi
 * @property {Lieu} lieu - Le lieu de l'emploi
 * @property {string} ent - L'entreprise de l'emploi
 * @property {string} description - La description de l'emploi
 * @property {string[]} competences - Les compétences de l'emploi
 * @property {string} urlImg - L'URL de l'image de l'emploi
 */

const generateObject = async (value) => {
  const jobSkill = await skillService.getAllSkillJob(value.id);
  return {
    id: value.id,
    title: value.title,
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
    /**
 * Lieu
 * @typedef {object} Lieu
 * @property {string} ville - Ville
 * @property {number} departement - Département
 */
    lieu: {
      ville: value.town,
      departement: Number(value.postal_code),
    },
    ent: value.ent,
    description: value.description,
    competences: jobSkill,
    urlImg: value.url_img,
  };
};

module.exports = {
  async getAll() {
    const find = await job.findAll();
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = await Promise.all(find.map(generateObject(find)));
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

    const returnValue = await Promise.all(find.map(generateObject));
    return returnValue;
  },

  async getData(id) {
    try {
      const findByID = await job.findByPk(id);
      const returnValue = await generateObject(findByID);
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
      const returnValue = await generateObject(value);
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
