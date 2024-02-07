const contactService = require('../../services/suivi/contact.service');

module.exports = {
  async getContact(req, res) {
    const { id } = req.params;
    const data = await contactService.getContact(id);
    if (data.code) return res.status(data.code).json(data);
    return res.json(data);
  },
};
