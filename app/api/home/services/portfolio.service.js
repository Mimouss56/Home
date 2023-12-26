const { portfolio } = require('../models/index.mapper');

module.exports = {
  getAll: async () => {
    try {
      const options = await portfolio.findAll();
      return options;
    } catch (error) {
      throw new Error(error);
    }
  },
  getOne: async (id) => {
    try {
      const option = await portfolio.findByPk(id);
      return option;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (body) => {
    try {
      const option = await portfolio.create(body);
      return option;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, body) => {
    try {
      const option = await portfolio.update(id, body, { new: true });
      return option;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const option = await portfolio.delete(id);
      return option;
    } catch (error) {
      throw new Error(error);
    }
  },
};
