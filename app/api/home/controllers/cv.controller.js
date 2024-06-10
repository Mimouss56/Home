const cvService = require('../services/cv.service');

module.exports = {

  async getAll(req, res) {
    const { type } = req.query;

    if (type === 'job') {
      const data = await cvService.getAll(type);
      return res.json(data);
    }
    if (type === 'school') {
      const data = await cvService.getAll(type);
      return res.json(data);
    }
    const returnValue = await cvService.getAll();

    return res.json(returnValue);
  },
  async getAllByUser(req, res) {
    const { id } = req.user;
    const data = await cvService.getAllByUser(id);
    if (data.code) return res.status(data.code).json(data);
    return res.json(data);
  },

  async get(req, res) {
    const { id } = req.params;
    const data = await cvService.get(id);
    if (data.code) return res.status(data.code).json(data);
    return res.json(data);
  },
  async post(req, res) {
    let message = '';
    let result = {};

    const {
      competences,
      ent: { id: idEnt },
      title,
      description,
      date: {
        debut,
        fin,
      },
      type,
    } = req.body;

    const inputQuery = {
      id_ent: idEnt,
      competences,
      type,
      title,
      description,
      date_started: debut,
      date_ended: fin,
      id_user: req.user.id,
    };
    if (req.params && req.params.id !== undefined && req.params.id !== 'undefined') {
      result = await cvService.update(req.params.id, inputQuery);
      if (result.code) return res.status(result.code).json(result);
      message = 'Emploi updated';
    } else {
      result = await cvService.create(inputQuery);
      if (result.code) return res.status(result.code).json(result);
      message = 'Nouvel Emploi créé';
    }
    return res.status(200).json({
      message,
      ...result,
    });
  },
  // async put(req, res) {
  //   const { id } = req.params;
  //   const {
  //     competence,
  //     id_ent: idEnt,
  //     title,
  //     description,
  //     debut,
  //     fin,
  //     type,
  //   } = req.body;

  //   const inputQuery = {
  //     competence,
  //     idEnt,
  //     title,
  //     description,
  //     debut,
  //     fin,
  //     id_user: req.user.id,
  //     type,
  //   };
  //   const
  //   if (result.code) return res.status(result.code).json(result);
  //   return res.json({
  //     message: 'Emploi updated',
  //   });
  // },
};
