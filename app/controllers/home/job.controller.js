const jobService = require('../../services/home/job.service');

module.exports = {
  async getAll(req, res) {
    const data = await jobService.getAll();
    res.json(data);
  },
  async getAllByUser(req, res) {
    const { id } = req.user;
    const data = await jobService.getAllByUser(id);
    return res.json(data);
  },

  async get(req, res) {
    const { id } = req.params;
    const data = await jobService.getData(id);
    return res.json(data);
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
      urlImg,
    } = req.body;

    const inputQuery = {
      ent,
      title,
      description,
      date_started: debut,
      date_ended: fin,
      town: ville,
      postal_code: Number(departement),
      id_user: req.user.id,
      url_img: urlImg,
    };
    const result = await jobService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.status(200).json({
      message: 'Nouvel Emploi créé',
      ...result,
    });
  },
  async put(req, res) {
    const { id } = req.params;
    const {
      ent,
      title,
      description,
      debut,
      fin,
      ville,
      departement,
      imgUrl,
    } = req.body;

    const inputQuery = {
      ent,
      title,
      description,
      debut,
      fin,
      ville,
      departement,
      id_user: req.user.id,
      img_url: imgUrl,
    };
    const result = await jobService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Emploi updated',
    });
  },
  async delete(req, res) {
    const { id } = req.params;
    const result = await jobService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Emploi deleted',
    });
  },

  async deleteJobUser(req, res) {
    const { id } = req.params;
    const { id: idUser } = req.user;
    const result = await jobService.deleteJobUser(id, idUser);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Emploi deleted',
    });
  },

};
