const jobService = require('../services/job.service');

module.exports = {
  async getAll(req, res) {
    const data = await jobService.getAll();
    res.json(data);
  },
  async get(req, res) {
    const { id } = req.params;
    const dataRole = await jobService.getData(id);
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
      departement,
    } = req.body;

    const inputQuery = {
      ent,
      title,
      description,
      date_started: debut,
      date_ended: fin,
      town: ville,
      postal_code: departement,
    };
    const result = await jobService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 201,
      message: 'Nouvel Emploi créé',
    });
  },
  async put(req, res) {
    const { id } = req.params;
    const { label, color } = req.body;

    const inputQuery = { label, color };
    const result = await jobService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Role updated',
    });
  },
  async delete(req, res) {
    const { id } = req.params;
    const result = await jobService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Role deleted',
    });
  },

};
