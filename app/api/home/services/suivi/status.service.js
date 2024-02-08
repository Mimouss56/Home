const { status } = require('../../models/index.mapper');

module.exports = {
  async getAllStatus() {
    const data = await status.findAll();

    return data;
  },

  async getStatusById(id) {
    const data = await status.findByPk(id);
    return data.label;
  },

};
