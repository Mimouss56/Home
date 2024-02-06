const { portfolio } = require('../models/index.mapper');

/**
 * @typedef {object} Portfolio - Description du portfolio
 * @property {integer} id - L'ID du portfolio
 * @property {string} nameSite - Le nom du site
 * @property {string} description - La description du site
 * @property {string} urlImg - L'url de l'image
 * @property {string} urlSite - L'url du site
 * @param {object} values
 * @returns
 */
const generateValues = (values) => ({
  id: values.id,
  nameSite: values.nameSite,
  description: values.description,
  urlImg: values.urlImg,
  urlSite: values.urlSite,
});
module.exports = {
  getAll: async () => {
    const data = await portfolio.findAll();
    const returnData = await Promise.all(data.map(async (value) => generateValues(value)));
    return returnData;
  },
  getOne: async (id) => {
    try {
      const data = await portfolio.findByPk(id);
      const returnData = await generateValues(data);
      return returnData;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (body) => {
    try {
      const data = await portfolio.create(body);
      const returnData = await generateValues(data);
      return returnData;
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
