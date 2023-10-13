const newsService = require('../../services/news.service');

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
      content,
      tags,
    } = req.body;

    const inputQuery = {
      title,
      content,
      id_author: req.user.id,
    };
    const result = await newsService.create(inputQuery);
    if (tags) {
      await newsService.addTags(result.id, tags);
    }
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Nouvelle news créée',
      data: await newsService.getData(result.id),
    });
  },

  async update(req, res) {
    const { id } = req.params;
    const newsData = await newsService.getData(id);
    const {
      title,
      content,
      tags,
      draft,
    } = req.body;
    const inputQuery = {
      title: title || newsData.title,
      content: content || newsData.content,
      draft,
      id_author: req.user.id,
    };
    const result = await newsService.update(id, inputQuery);
    if (tags) {
      await newsService.addTags(id, tags);
    }
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'News modifiée',
      data: await newsService.getData(id),
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
