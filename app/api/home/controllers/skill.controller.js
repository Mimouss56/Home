const skillService = require('../services/skill.service');

module.exports = {
  async getAll(req, res) {
    const data = await skillService.getAll();
    res.json(data);
  },

  async post(req, res) {
    const { name } = req.body;

    const inputQuery = {
      name,
    };
    const result = await skillService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

};
