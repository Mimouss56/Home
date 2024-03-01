const { suivi } = require('../../models/index.mapper');

module.exports = {
  async getAllStatus() {
    const data = await suivi.status.findAll();

    return data;
  },

  async getStatusById(id) {
    const data = await suivi.status.findByPk(id);
    return data.label;
  },

};
