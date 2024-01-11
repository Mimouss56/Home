const feedbackService = require('../services/feedback.service');

module.exports = {
  async getAll(req, res) {
    const result = await feedbackService.getAll();
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

  async post(req, res) {
    const {
      message, name, email, path,
    } = req.body;
    const inputQuery = {
      message, name, email, path,
    };
    const result = await feedbackService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

  async put(req, res) {
    const { id } = req.params;
    const data = await feedbackService.getData(id);
    const { draft } = req.body;
    const inputQuery = {
      draft: draft || !data.draft,
    };
    const result = await feedbackService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

  async delete(req, res) {
    const { id } = req.params;
    const result = await feedbackService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },
};
