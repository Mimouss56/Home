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
    const contact = await contactService.create(inputData);
    if (contact.code) return res.status(contact.code).json(contact);
    return res.status(201).json(contact);
  },

  async updateContact(req, res) {
    const { id } = req.params;
    const {
      phone, nom, prenom, role, email,
    } = req.body;
    const getContactInfo = await contactService.getContact(id);
    const inputData = {
      phone_number: phone || getContactInfo.phone_number,
      nom: nom || getContactInfo.nom,
      prenom: prenom || getContactInfo.prenom,
      role: role || getContactInfo.role,
      email: email || getContactInfo.email,
    };
    const contact = await contactService.updateContact(id, inputData);
    if (contact.code) return res.status(contact.code).json(contact);
    return res.status(200).json(contact);
  },
};
