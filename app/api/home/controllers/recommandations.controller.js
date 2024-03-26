const recommandationService = require('../services/recommandations.service');

module.exports = {
  getAll: async (req, res) => {
    try {
      const recommandations = await recommandationService.getAll();
      res.status(200).json(recommandations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const recommandation = await recommandationService.create(req.body);
      res.status(200).json(recommandation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await recommandationService.delete(req.params.id);
      res.status(200).json({ message: 'Recommandation deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
