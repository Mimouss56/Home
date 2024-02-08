const { interaction } = require('../../models/index.mapper');
const statusService = require('./status.service');
/**
 * @typedef {object} Interaction - Interaction d'un contact
 * @property {number} id - id de l'interaction
 * @property {string} moyen - moyen de l'interaction
 * @property {string} reponse - Retour eventuel de l'interaction
 * @property {string } status - Statut de l'interaction
 * @property {string} createdAt - Date de l'interaction
 * @param {object} value
 * @returns
 */
const generateData = async (value) => ({
  id: value.id,
  moyen: value.moyen,
  reponse: value.reponse,
  status: await statusService.getStatusById(value.id_status),
  createdAt: value.created_at,
});
module.exports = {

  async getAllInteractionByContactId(contactId) {
    const find = await interaction.findAll({ where: { id_contact: contactId } });
    if (!find) {
      return [];
    }
    const data = Promise.all(find.map(async (value) => generateData(value)));

    return data;
  },

  async create(idContact, status, moyen, reponse) {
    const create = await interaction.create({
      id_contact: idContact, id_status: status, moyen, reponse,
    });
    return generateData(create);
  },
};
