const { skill } = require('../models/index.mapper');

const textValue = 'skill';

/**
 * @typedef {object} Skill - Description de la compétence
 * @property {integer} id - L'ID de la compétence
 * @property {string} name - Le nom de la compétence

 * @param {object} value
 * @returns
 */
const generateObject = (value) => ({
  id: value.id,
  name: value.name,
});
module.exports = {
  async getAll() {
    const find = await skill.findAll();
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = await Promise.all(find.map(generateObject));
    return returnValue;
  },

  async getAllSkillJob(id) {
    const find = await skill.findAllSkillJob(id);
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    return find.map((value) => value.name);
  },
  async getAllSkillschool(id) {
    const find = await skill.findAllSkillSchool(id);
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    return find.map((value) => value.name);
  },

  async create(inputQuery) {
    try {
      const valueCreated = await skill.create(inputQuery);
      return valueCreated;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not created`,
      };
    }
  },

};
