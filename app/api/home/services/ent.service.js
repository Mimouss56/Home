const { ent } = require('../models/index.mapper');

module.exports = {
  // Get Data
  async getData(id) {
    const jobByID = await ent.findByPk(id);
    if (!jobByID) {
      return {
        code: 404,
        message: 'Job not found',
      };
    }
    return jobByID;
  },
  // Get All Data
  async getAllData() {
    const jobs = await ent.findAll();
    return jobs;
  },

};
