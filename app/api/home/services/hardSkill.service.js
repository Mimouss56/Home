const { hardSkill } = require('../models/index.mapper');

const textValue = 'hardSkill';

/**
 * @typedef {object} HardSkill - Description de la compétence
 * @property {integer} id - L'ID de la compétence
 * @property {string} name - Le nom de la compétence

 * @param {object} value
 * @returns
 */
const generateObject = (value) => ({
  id: value.id,
  label: value.label,
  color: value.color,
  urlIcon: value.url_icon,
  stack: value.stack,
});
module.exports = {
  async getAll() {
    const find = await hardSkill.findAll();
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = await Promise.all(find.map(generateObject));
    return returnValue;
  },

  async getAllSkillPortFolio(id) {
    const find = await hardSkill.findAllSkillPortFolio(id);
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    return find;
  },

  async create(inputQuery) {
    try {
      const valueCreated = await hardSkill.create(inputQuery);
      return valueCreated;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not created`,
      };
    }
  },

};
