const interactionService = require('../../services/suivi/interaction.service');

module.exports = {

  async create(req, res) {
    const {
      id_contact: idContact, status, moyen, reponse,
    } = req.body;

    const interaction = await interactionService.create(idContact, status, moyen, reponse);
    return res.status(201).json(interaction);
  },

};
