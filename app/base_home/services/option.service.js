const { option } = require('../models/index.mapper');

module.exports = {
  getAll: async () => {
    const options = await option.findAll();
    return options;
  },
  getOne: async (query) => {
    const options = await option.findOne({
      where: {
        name: query,
      },
    });
    return options;
  },
  create: async (body) => {
    try {
      const options = await option.create(body);
      return options;
    } catch (error) {
      return {
        code: 500,
        message: 'News not created',
        error,
      };
    }
  },
  update: async (id, body) => {
    try {
      const optionByID = await option.findByPk(id);
      if (!optionByID) {
        return {
          code: 404,
          message: 'Option not found',
        };
      }
      await option.update(id, body);
      return {
        code: 201,
        message: 'Option updated',
      };
    } catch (error) {
      return {
        code: 500,
        message: 'Option not updated',
        error,
      };
    }
  },
  async delete(id) {
    try {
      const newsByID = await option.findByPk(id);
      if (!newsByID) {
        return {
          code: 404,
          message: 'Option not found',
        };
      }
      await option.delete(newsByID.id);
      return {
        message: 'Option deleted',
      };
    } catch (error) {
      return {
        code: 500,
        message: 'Option not deleted',
        error,
      };
    }
  },
};
