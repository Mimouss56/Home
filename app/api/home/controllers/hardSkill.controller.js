const hardSkillService = require('../services/hardSkill.service');

module.exports = {
  async getAll(req, res) {
    const data = await hardSkillService.getAll();
    res.json(data);
  },

  async post(req, res) {
    const { name } = req.body;

    const inputQuery = {
      name,
    };
    const result = await hardSkillService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

};
