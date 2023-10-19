const skillService = require('../../services/home/skill.service');

module.exports = {
  async getAll(req, res) {
    const data = await skillService.getAll();
    res.json(data);
  },
  async get(req, res) {
    const { id } = req.params;
    const data = await skillService.getData(id);
    return res.json(data);
  },

  async post(req, res) {
    const { name } = req.body;

    const inputQuery = {
      name,
    };
    const result = await skillService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      data: result,
    });
  },
  async put(req, res) {
    const { id } = req.params;
    const { label, color } = req.body;

    const inputQuery = { label, color };
    const result = await skillService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Role updated',
    });
  },
  async delete(req, res) {
    const { id } = req.params;
    const result = await skillService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Role deleted',
    });
  },

};
