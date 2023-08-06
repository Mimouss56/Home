const sanctionService = require('../services/sanction.service');

module.exports = {
  async getAll(req, res) {
    const data = await sanctionService.getAll();
    return res.json(data);
  },
  async get(req, res) {
    const { id } = req.params;
    const dataRole = await sanctionService.getData(id);
    return res.json(dataRole);
  },

  async post(req, res) {
    const { label } = req.body;
    const author_id = 2;

    const inputQuery = { label, author_id };
    const result = await sanctionService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 201,
      message: 'Sanction créée',
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
