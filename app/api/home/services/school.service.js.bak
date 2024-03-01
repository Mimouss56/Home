const { school } = require('../models/index.mapper');
const jobService = require('./job.service');

const textValue = 'school';

/**
 * @param {Job} value - Description de l'école
 * @returns
 */

module.exports = {
  async getAll() {
    const find = await school.findAll();
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = await Promise.all(find.map(jobService.generateObject));
    // const returnValue = await Promise.all(find.map(jobService.generateObject(find)));
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
    const returnValue = await Promise.all(find.map(jobService.generateObject));
    return returnValue;
  },

  async getData(id) {
    try {
      const findByID = await school.findByPk(id);
      const returnValue = await jobService.generateObject(findByID);
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
      const returnValue = await jobService.generateObject(value);
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
