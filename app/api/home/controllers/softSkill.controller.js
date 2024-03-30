const softSkillService = require('../services/softSkill.service');

module.exports = {
  async getAll(req, res) {
    const data = await softSkillService.getAll();
    res.json(data);
  },

  async post(req, res) {
    const { name } = req.body;

    const inputQuery = {
      name,
    };
    const result = await softSkillService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

};
