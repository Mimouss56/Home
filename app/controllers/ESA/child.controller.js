const ESAChildService = require('../../services/ESA/child.service');

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
      firstName,
      lastName,
      classe,
    } = req.body;

    const inputQuery = {
      firstName,
      lastName,
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
  async delete(req, res) {
    try {
      const child = await ESAChildService.findByIdAndDelete(req.params.id);
      res.status(200).json(child);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
