const schoolService = require('../services/school.service');

module.exports = {
  async getAll(req, res) {
    const data = await schoolService.getAll();
    res.json(data);
  },
  async get(req, res) {
    const { id } = req.params;
    const dataRole = await schoolService.getData(id);
    return res.json(dataRole);
  },

  async post(req, res) {
    const {
      ent,
      title,
      description,
      debut,
      fin,
      ville,
      departement
    } = req.body;

    const inputQuery = {
      ent,
      title,
      description,
      date_started: debut,
      date_ended: fin,
      town: ville,
      postal_code: departement
    };
    const result = await schoolService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 201,
      message: 'Nouvelle formation créée',
    });
  },
  async put(req, res) {
    const { id } = req.params;
    const { label, color } = req.body;

    const inputQuery = { label, color };
    const result = await schoolService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Role updated',
    });
  },
  async delete(req, res) {
    const { id } = req.params;
    const result = await schoolService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Role deleted',
    });
  },

};
