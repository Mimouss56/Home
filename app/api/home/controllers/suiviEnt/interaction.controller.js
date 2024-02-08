const interactionService = require('../../services/suivi/interaction.service');

module.exports = {
  // async getInteraction(req, res) {
  //   const { id } = req.params;
  //   const interaction = await interactionService.getInteractionById(id);
  //   if (!interaction) {
  //     return res.status(404).json({ message: 'Interaction not found' });
  //   }
  //   return res.status(200).json(interaction);
  // },
  async create(req, res) {
    const {
      id_contact: idContact, status, moyen, reponse,
    } = req.body;
    const interaction = await interactionService.create(idContact, status, moyen, reponse);
    return res.status(201).json(interaction);
  },

};
