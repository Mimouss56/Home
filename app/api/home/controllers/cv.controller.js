const cvService = require('../services/cv.service');

module.exports = {

  async getAll(req, res) {
    const { type } = req.query;

    if (type === 'job') {
      const data = await cvService.getAll(type);
      return res.json(data);
    }
    if (type === 'school') {
      const data = await cvService.getAll(type);
      return res.json(data);
    }
    const returnValue = await cvService.getAll();

    return res.json(returnValue);
  },
  async getAllByUser(req, res) {
    const { id } = req.user;
    const data = await cvService.getAllByUser(id);
    if (data.code) return res.status(data.code).json(data);
    return res.json(data);
  },

  async get(req, res) {
    const { id } = req.params;
    const data = await cvService.get(id);
    if (data.code) return res.status(data.code).json(data);
    return res.json(data);
  },
};
