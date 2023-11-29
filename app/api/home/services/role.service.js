const { role } = require('../models/index.mapper');

const textValue = 'role';
const generateObject = async (value) => ({
  id: value.id,
  label: value.label,
  color: value.color,
});

module.exports = {
  async getAll() {
    const roles = await role.findAll();
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
      const roleByID = await role.findByPk(id);
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
      const roleCreated = await role.create(inputQuery);
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
      const roleUpdated = await role.update(id, inputQuery);
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
      const roleDeleted = await role.delete(id);
      return roleDeleted;
    } catch (error) {
      return {
        code: 500,
        message: 'Role not deleted',
      };
    }
  },

  async checkRole(label) {
    const roleExist = await role.findOne({ where: { label } });
    return roleExist;
  },

};
