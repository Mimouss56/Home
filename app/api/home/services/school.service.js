const { school } = require('../models/index.mapper');
const skillService = require('./skill.service');

const textValue = 'school';

/**
 * @param {Job} value - Description de l'école
 * @returns
 */
const generateObject = async (value) => {
  const schoolSkill = await skillService.getAllSkillschool(value.id);
  return {
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
    urlImg: value.url_img,
  };
};

module.exports = {
  async getAll() {
    const find = await school.findAll();
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = await Promise.all(find.map(generateObject));
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
    const returnValue = await Promise.all(find.map(generateObject));
    return returnValue;
  },

  async getData(id) {
    try {
      const findByID = await school.findByPk(id);
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
      const { id_user: userId, ...schoolData } = inputQuery;

      const value = await school.create(schoolData);
      // await school.createCompetence(valueCreated.id, inputQuery.competences);
      await school.addSchoolUser(value.id, userId);
      const returnValue = await generateObject(value);
      return returnValue;
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
      await school.delete(id);
      return {
        message: `${textValue} deleted`,
      };
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },
};
