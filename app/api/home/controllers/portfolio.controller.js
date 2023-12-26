const portfolioService = require('../services/portfolio.service');

module.exports = {
  getAll: async (req, res) => {
    try {
      const options = await portfolioService.getAll();
      res.json(options);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
  getOne: async (req, res) => {
    try {
      const option = await portfolioService.getOne(req.params.id);
      res.json(option);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
  create: async (req, res) => {
    try {
      const option = await portfolioService.create(req.body);
      res.json(option);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
  update: async (req, res) => {
    try {
      const option = await portfolioService.update(req.params.id, req.body);
      res.json(option);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },
  delete: async (req, res) => {
    try {
      const option = await portfolioService.delete(req.params.id);
      res.json(option);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

};
