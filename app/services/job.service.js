const { job } = require('../models/index.mapper');
const skillService = require('./skill.service');
const textValue = "job"

module.exports = {
  async getAll() {
    const find = await job.findAll();
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = find.map((value) => {
      const one = {
        id: value.id,
        title: value.title,
        date: {
          debut: value.date_started,
          fin: value.date_ended,
        },
        lieu: {
          ville: value.town,
          departement: value.postal_code,
        },
        ent: value.ent,
        description: value.description
      };
      return one;
    });
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
    const returnValue = find.map(async (value) => {
      const jobSkill = await skillService.getAllSkillJob(value.id);
      const one = {
        id: value.id,
        title: value.title,
        date: {
          debut: value.date_started,
          fin: value.date_ended,
        },
        lieu: {
          ville: value.town,
          departement: Number(value.postal_code),
        },
        ent: value.ent,
        description: value.description,
        competences: jobSkill
      };
      return one;
    });
    const data = await Promise.all(returnValue);
    return data;
  },

  async getData(id) {
    try {
      const findByID = await job.findByPk(id);
      if (!findByID) {
        return {
          code: 404,
          message: `${textValue} not found`,
        };
      }
      const competences = await job.findAllJobSkill(findByID.id);
      const returnValue = {
        id: findByID.id,
        title: findByID.title,
        date: {
          debut: findByID.date_started,
          fin: findByID.date_ended,
        },
        lieu: {
          ville: findByID.town,
          departement: findByID.postal_code,
        },
        ent: findByID.ent,
        description: findByID.description,
        competences
      };

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
      const userId = inputQuery.id_user;
      delete inputQuery.id_user;
      const value = await job.create(inputQuery);
      // await job.createCompetence(valueCreated.id, inputQuery.competences);
      await job.addJobUser(value.id, userId);
      return {
        id: value.id,
        title: value.title,
        date: {
          debut: value.date_started,
          fin: value.date_ended,
        },
        lieu: {
          ville: value.town,
          departement: Number(value.postal_code),
        },
        ent: value.ent,
        description: value.description,
        competences: value.competences
      };
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
  }
};
