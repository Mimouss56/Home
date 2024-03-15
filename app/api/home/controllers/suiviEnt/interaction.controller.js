const interactionService = require('../../services/suivi/interaction.service');

module.exports = {

  async create(req, res) {
    const {
      id_contact: idContact, idStatus, moyen, reponse,
    } = req.body;
    const inputData = {
      moyen,
      reponse,
      id_status: Number(idStatus),
      id_contact: idContact,
    };

    const interaction = await interactionService.create(inputData);
    return res.status(201).json(interaction);
  },

};
