const newsService = require('../services/news.service');

module.exports = {
  async getAll(_, res) {
    const data = await newsService.getAll();
    res.json(data);
  },
  async get(req, res) {
    const { id } = req.params;
    const data = await newsService.getData(id);
    return res.json(data);
  },
  async post(req, res) {
    const {
      title,
      description,
      tags,
    } = req.body;

    const inputQuery = {
      title,
      description,
      id_author: req.user.id,
    };
    const result = await newsService.create(inputQuery);
    if (tags) {
      console.log('tags', tags);
      await newsService.addTags(result.id, tags);
    }
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 201,
      message: 'Nouvelle news créée',
    });
  },

  async delete(req, res) {
    const { id } = req.params;
    const result = await newsService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'News supprimée',
    });
  },
};
