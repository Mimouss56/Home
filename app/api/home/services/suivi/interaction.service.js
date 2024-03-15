const { suivi } = require('../../models/index.mapper');
const statusService = require('./status.service');
/**
 * @typedef {object} Interaction - Interaction d'un contact
 * @property {number} id - id de l'interaction
 * @property {string} moyen - moyen de l'interaction
 * @property {string} reponse - Retour eventuel de l'interaction
 * @property {Status } status - Statut de l'interaction
 * @property {string} createdAt - Date de l'interaction
 * @param {object} value
 * @returns
 */
const generateData = async (value) => ({
  id: value.id,
  moyen: value.moyen,
  reponse: value.reponse,
  status: await statusService.get(value.id_status),
  createdAt: value.created_at,
});
module.exports = {

  async getAllInteractionByContactId(contactId) {
    const find = await suivi.interaction.findAll({ where: { id_contact: contactId } });
    if (!find) {
      return [];
    }
    const data = Promise.all(find.map(async (value) => generateData(value)));

    return data;
  },

  async create(inputData) {
    const create = await suivi.interaction.create(inputData);
    return generateData(create);
  },
};
