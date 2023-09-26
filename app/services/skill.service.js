const { skill } = require('../models/index.mapper');

const textValue = 'skill';

module.exports = {
  async getAll() {
    const find = await skill.findAll();
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = find.map((value) => {
      const one = {
        id: value.id,
        name: value.name,
      };
      return one;
    });
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

  async getData(id) {
    try {
      const value = await skill.findByPk(id);
      const returnValue = {
        id: value.id,
        name: value.name,
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
      const valueCreated = await skill.create(inputQuery);
      return valueCreated;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not created`,
      };
    }
  },
  async update(id, inputQuery) {
    try {
      const valueUpdated = await skill.update(id, inputQuery);
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
      const valueDeleted = await skill.delete(id);
      return valueDeleted;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },
};
