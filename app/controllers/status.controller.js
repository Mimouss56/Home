const statusService = require('../services/status.service');

module.exports = {
  async get(req, res) {
    const { id } = req.params;
    const result = await statusService.getData(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },
  async getAll(_, res) {
    const data = await statusService.getAll();
    res.json(data);
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
