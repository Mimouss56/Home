/* eslint-disable camelcase */
const ESAChildService = require('../services/child.service');

module.exports = {
  async getAllChild(req, res) {
    try {
      const child = await ESAChildService.getAll();
      res.status(200).json(child);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async create(req, res) {
    const {
      first_name,
      last_name,
      classe,
    } = req.body;

    const inputQuery = {
      firstName: first_name,
      lastName: last_name,
      classe,
    };
    const result = await ESAChildService.create(inputQuery);

    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Nouvelle news créée',
      data: await ESAChildService.getData(result.id),
    });
  },
  async getOne(req, res) {
    try {
      const child = await ESAChildService.getData(req.params.id);
      res.json(child);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      classe,
    } = req.body;

    const inputQuery = {
      firstName: first_name,
      lastName: last_name,
      classe,
    };
    const result = await ESAChildService.update(id, inputQuery);

    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Elève modifiée',
      data: await ESAChildService.getData(result.id),
    });
  },
  async delete(req, res) {
    try {
      const child = await ESAChildService.findByIdAndDelete(req.params.id);
      res.status(200).json(child);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
