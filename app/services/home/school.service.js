const { school } = require('../../models/index.mapper');
const skillService = require('./skill.service');

const textValue = 'school';

module.exports = {
  async getAll() {
    const find = await school.findAll();
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = find.map((value) => {
      const one = {
        id: value.id,
        ent: value.ent,
        description: value.niveau,
        title: value.title,
        date: {
          debut: value.date_started,
          fin: value.date_ended,
        },
        lieu: {
          ville: value.town,
          departement: value.postal_code,
        },
      };
      return one;
    });
    return returnValue;
  },

  async getAllByUser(id) {
    const find = await school.findAllByUserId(id);
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = find.map(async (value) => {
      const schoolSkill = await skillService.getAllSkillschool(value.id);
      const one = {
        id: value.id,
        ent: value.ent,
        description: value.niveau,
        title: value.title,
        date: {
          debut: value.date_started,
          fin: value.date_ended,
        },
        lieu: {
          ville: value.town,
          departement: Number(value.postal_code),
        },
        competences: schoolSkill,
      };
      return one;
    });
    const data = await Promise.all(returnValue);
    return data;
  },

  async getData(id) {
    try {
      const findByID = await school.findByPk(id);
      const returnValue = {
        id: findByID.id,
        ent: findByID.ent,
        description: findByID.niveau,
        title: findByID.title,
        date: {
          debut: findByID.date_started,
          fin: findByID.date_ended,
        },
        lieu: {
          ville: findByID.town,
          departement: findByID.postal_code,
        },
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
      const value = await school.create(inputQuery);
      // await school.createCompetence(valueCreated.id, inputQuery.competences);
      await school.addSchoolUser(value.id, userId);
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
        niveau: value.niveau,
        competences: value.competences,
      };
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not created`,
      };
    }
  },
  async update(id, inputQuery) {
    try {
      const valueUpdated = await school.update(id, inputQuery);
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
      const valueDeleted = await school.delete(id);
      return valueDeleted;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },
};
