/* eslint-disable camelcase */
const sanctionService = require('../services/sanction.service');

module.exports = {
  async getAll(req, res) {
    const result = await sanctionService.getAll();
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },
  async get(req, res) {
    const { id } = req.params;
    const result = await sanctionService.getData(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

  async getMe(req, res) {
    const { id } = req.user;
    const result = await sanctionService.getAll(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

  async post(req, res) {
    const {
      label, id_child, warn, created_at,
    } = req.body;

    const { id: author_id } = req.user;

    const inputQuery = {
      label, author_id, id_child, warn, created_at,
    };
    const result = await sanctionService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 201,
      message: 'Sanction créée',
      data: await sanctionService.getData(result.id),
    });
  },
  async put(req, res) {
    const { id } = req.params;
    const {
      label, id_child, warn, read, paid,
    } = req.body;
    const { id: author_id } = req.user;

    const inputQuery = {
      author_id, label, id_child, warn, read, paid,
    };
    const result = await sanctionService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Sanction updated',
      sanction: await sanctionService.getData(id),
    });
  },
  async delete(req, res) {
    const { id } = req.params;
    const result = await sanctionService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Sanction deleted',
    });
  },

  async read(req, res) {
    const { id } = req.params;
    const result = await sanctionService.read(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

  async paid(req, res) {
    const { id } = req.params;
    const { paid } = req.body;
    const result = await sanctionService.paid(id, paid);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

};
