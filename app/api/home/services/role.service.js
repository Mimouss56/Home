const { user } = require('../models/index.mapper');

const textValue = 'role';

/**
 * @typedef {object} Role - Role object
 * @property {number} id - Role id
 * @property {string} label - Role label
 * @property {string} color - Role color

 *
 * @param {object} value
 * @returns
 */
const generateObject = async (value) => ({
  id: value.id,
  label: value.label,
  color: value.color,
});

module.exports = {
  async getAll() {
    const roles = await user.role.findAll();
    if (!roles) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = await Promise.all(roles.map(generateObject));
    return returnValue;
  },

  async getData(id) {
    try {
      const roleByID = await user.role.findByPk(id);
      const returnValue = await generateObject(roleByID);
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
      const roleCreated = await user.role.create(inputQuery);
      const returnValue = await generateObject(roleCreated);
      return returnValue;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not created`,
      };
    }
  },
  async update(id, inputQuery) {
    if (!inputQuery.label) {
      return {
        code: 400,
        message: 'Label is missing',
      };
    }

    try {
      const roleUpdated = await user.role.update(id, inputQuery);
      return roleUpdated;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not updated`,
      };
    }
  },
  async delete(id) {
    try {
      const roleDeleted = await user.role.delete(id);
      return roleDeleted;
    } catch (error) {
      return {
        code: 500,
        message: 'Role not deleted',
      };
    }
  },

  async checkRole(label) {
    const roleExist = await user.role.findOne({ where: { label } });
    return roleExist;
  },

};
