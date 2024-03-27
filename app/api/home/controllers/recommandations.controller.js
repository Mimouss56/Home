const recommandationService = require('../services/recommandations.service');

module.exports = {
  getAll: async (req, res) => {
    try {
      const recommandations = await recommandationService.getAll();
      return res.status(200).json(recommandations);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    const {
      firstName,
      lastName,
      linkedinLink,
      avatar,
      recommandation,
    } = req.body;
    const inputData = {
      first_name: firstName,
      last_name: lastName,
      linkedin_link: linkedinLink,
      avatar,
      recommandation,
    };
    try {
      const data = await recommandationService.create(inputData);
      res.status(200).json(data);
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
