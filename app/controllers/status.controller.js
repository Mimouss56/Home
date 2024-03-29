const statusService = require('../services/status.service');
// const banHtml = require('../../src/Pages/Error/ban.html');

module.exports = {
  async get(req, res) {
    const { id } = req.params;
    const result = await statusService.getData(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

  async getAll(req, res) {
    if (req.query.url) {
      const result = await statusService.find(req.query.url);
      if (result.ban) {
        return res.status(403).json({
          code: 403,
          message: 'Site Banni',
          data: result,
        });
      }
      if (result.maintenance) {
        return res.status(503).json({
          code: 503,
          message: 'Site en maintenance',
          data: result,
        });
      }
    }
    const data = await statusService.getAll();
    return res.json(data);
  },

  async post(req, res) {
    const {
      name,
      url,
      maintenance,
      ban,
    } = req.body;

    const inputQuery = {
      name,
      url,
      maintenance,
      ban,
      ban_at: ban ? new Date() : null,
    };
    const result = await statusService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Nouveau Site créé',
      data: await statusService.getData(result.id),
    });
  },
  async put(req, res) {
    const { id } = req.params;
    const search = await statusService.getData(id);
    if (search.code) return res.status(search.code).json(search);

    const {
      name,
      url,
      maintenance,
      ban,
    } = req.body;

    const inputQuery = {
      name: name || search.name,
      url: url || search.url,
      maintenance: maintenance === undefined ? search.maintenance : maintenance,
      ban: ban === undefined ? search.ban : ban,
      ban_at: ban ? new Date() : null,
    };
    const result = await statusService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Site modifiée',
      data: await statusService.getData(id),
    });
  },
  async delete(req, res) {
    const { id } = req.params;
    const result = await statusService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Site supprimée',
    });
  },

};
