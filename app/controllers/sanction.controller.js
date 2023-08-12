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
    return res.json(dataRole);
  },

  async getMe(req, res) {
    const { id } = req.user;
    const result = await sanctionService.getAll(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },

  async post(req, res) {
    const { label, author_id, id_child, warn } = req.body;
    const inputQuery = { label, author_id, id_child, warn };
    const result = await sanctionService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 201,
      message: 'Sanction créée',
      sanction: await sanctionService.getData(result.id),
    });
  },
  // async put(req, res) {
  //   const { id } = req.params;
  //   const { label, color } = req.body;

  //   const inputQuery = { label, color };
  //   const result = await jobService.update(id, inputQuery);
  //   if (result.code) return res.status(result.code).json(result);
  //   return res.json({
  //     code: 200,
  //     message: 'Role updated',
  //   });
  // },
  async delete(req, res) {
    const { id } = req.params;
    const result = await sanctionService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Sanction deleted',
    });
  },

};
