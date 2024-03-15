const { suivi } = require('../../models/index.mapper');

/**
 * @typedef {object} Status - Status d'un suivi
 * @property {number} id - id du status
 * @property {string} label - Nom du status
 */
module.exports = {
  async getAllStatus() {
    const data = await suivi.status.findAll();

    return data;
  },

  async get(id) {
    const find = await suivi.status.findByPk(id);
    if (!find) {
      return null;
    }
    return find;
  },

};
