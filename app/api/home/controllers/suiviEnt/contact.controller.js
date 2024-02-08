const contactService = require('../../services/suivi/contact.service');

module.exports = {
  async getContact(req, res) {
    const { id } = req.params;
    const data = await contactService.getContact(id);
    if (data.code) return res.status(data.code).json(data);
    return res.json(data);
  },

  async create(req, res) {
    const {
      phone, idEnt, nom, prenom, role, email,
    } = req.body;
    const inputData = {
      phone_number: phone,
      id_ent: idEnt,
      nom,
      prenom,
      role,
      email,
    };
    const data = await contactService.create(inputData);
    if (data.code) return res.status(data.code).json(data);
    return res.json({
      code: 201,
      message: 'Nouveau contact créé',
      ...data,
    });
  },
};
