const schoolService = require('../../services/school.service');

module.exports = {
  async getAll(req, res) {
    const data = await schoolService.getAll();
    if (data.code) return res.status(data.code).json(data);
    return res.json(data);
  },
  async getAllByUser(req, res) {
    const { id } = req.user;
    const data = await schoolService.getAllByUser(id);
    if (data.code) return res.status(data.code).json(data);
    return res.json(data);
  },
  async get(req, res) {
    const { id } = req.params;
    const data = await schoolService.getData(id);
    if (data.code) return res.status(data.code).json(data);
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
      niveau: description,
      date_started: debut,
      date_ended: fin,
      town: ville,
      postal_code: Number(departement),
      id_user: req.user.id,
      url_img: urlImg,
    };
    const result = await schoolService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 201,
      message: 'Nouvelle formation créée',
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
      urlImg,
    } = req.body;

    const inputQuery = {
      ent,
      title,
      niveau: description,
      date_started: debut,
      date_ended: fin,
      town: ville,
      postal_code: Number(departement),
      id_user: req.user.id,
      img_url: urlImg,
    };
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
