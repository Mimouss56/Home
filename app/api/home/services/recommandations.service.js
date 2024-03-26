const { recommandations } = require('../models/index.mapper');
/**
 * @typedef {object} Recommandations - Description de la recommandation
 * @property {integer} id - L'ID de la recommandation
 * @property {string} author - L'auteur' de la recommandation
 * @property {string} recommandation - La description de la recommandation
 * @property {string} linkedin_link - Le lien linkedin de la recommandation
 * @property {string} avatar - L'avatar de la recommandation
 * @property {string} created_at - La date de création de la recommandation
 * @param {object} values
 * @returns
 */
module.exports = {
  generateValues: async (values) => ({
    id: values.id,
    author: `${values.first_name} ${values.last_name}`,
    last_name: values.last_name,
    recommandation: values.recommandation,
    linkedin_link: values.linkedin_link,
    avatar: values.avatar,
    created_at: values.created_at,
  }),

  getAll: async () => {
    const data = await recommandations.findAll();
    const returnData = await Promise.all(data.map(async (value) => this.generateValues(value)));
    return returnData;
  },
  create: async (recommandation) => {
    try {
      const data = await recommandations.create(recommandation);
      const returnData = await this.generateValues(data);
      return returnData;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const data = await recommandations.findByPk(id);
      await data.destroy();
    } catch (error) {
      throw new Error(error);
    }
  },
};
