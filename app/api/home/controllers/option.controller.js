const optionService = require('../services/option.service');

module.exports = {
  getAll: async (req, res) => {
    if (req.query.name) {
      try {
        const options = await optionService.getOne(req.query.name);
        res.json(options);
      } catch (error) {
        res.status(500).json(error.toString());
      }
      return;
    }
    try {
      const options = await optionService.getAll();
      res.json(options);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
  getOne: async (req, res) => {
    try {
      const option = await optionService.getOne(req.query.name);
      res.json(option);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
  create: async (req, res) => {
    try {
      const option = await optionService.create(req.body);
      res.json(option);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
  update: async (req, res) => {
    try {
      const option = await optionService.update(req.params.id, req.body);
      res.json(option);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
  delete: async (req, res) => {
    try {
      const option = await optionService.delete(req.params.id);
      res.json(option);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

};
