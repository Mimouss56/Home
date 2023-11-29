const technoService = require('../services/techno.service');

module.exports = {
  async getAll(_, res) {
    const data = await technoService.getAll();
    res.json(data);
  },
  async get(req, res) {
    const { id } = req.params;
    const dataTechno = await technoService.getData(id);
    return res.json(dataTechno);
  },

  async post(req, res) {
    req.body.forEach(async (object) => {
      const { label, color } = object;
      const checkTechno = await technoService.checkTechno(label);
      if (checkTechno) {
        return res.status(400).json({
          code: 400,
          message: 'Techno already exists',
        });
      }
      const result = await technoService.create({ label, color });
      if (result.code) return res.status(result.code).json(result);
      return result;
    });
    return res.json({
      message: 'Techno created',
    });
  },
  async put(req, res) {
    const { id } = req.params;
    const { label, color } = req.body;

    const inputQuery = { label, color };
    const result = await technoService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({ message: `la Techno: ${label} a été modifié` });
  },
  async delete(req, res) {
    const { id } = req.params;
    const result = await technoService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.status(201).json({ message: 'Arrete de supprimer des technos' });
  },
};
