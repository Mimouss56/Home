const suiviService = require('../../services/suivi/suivi.service');

module.exports = {
  async getAllEnt(req, res) {
    const data = await suiviService.getAllEnt();
    res.json(data);
  },

  async getEnt(req, res) {
    const { id } = req.params;
    const data = await suiviService.getEnt(id);
    if (data.code) return res.status(data.code).json(data);
    return res.json(data);
  },

  async post(req, res) {
    const { name, adresse } = req.body;

    const inputQuery = {
      name,
      adresse,
    };
    const result = await suiviService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      data: result,
    });
  },

};
