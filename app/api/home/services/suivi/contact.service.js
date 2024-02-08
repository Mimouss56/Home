const { contact } = require('../../models/index.mapper');
const interactionService = require('./interaction.service');

/**
 * @typedef {object} Contact - Contact d'une entreprise
 * @property {number} id - id du contact
 * @property {string} nom - Nom du contact
 * @property {string} prenom - Prénom du contact
 * @property {string} email - Email du contact
 * @property {string} phone - Téléphone du contact
 * @property {string} role - Role du contact
 * @property {Interaction[]} interaction - Liste des interactions du contact
 * @param {object} value
 * @returns
 */
const generateObject = async (value) => ({
  id: value.id,
  nom: value.nom,
  prenom: value.prenom,
  email: value.email,
  phone: value.phone_number,
  role: value.role,
  interaction: await interactionService.getAllInteractionByContactId(value.id),
});
module.exports = {

  async getAllContactByEntId(entId) {
    const find = await contact.findAll({ where: { id_ent: entId } });
    if (!find) {
      return [];
    }
    const returnValue = await Promise.all(find.map(generateObject));
    return returnValue;
  },

  async getContact(id) {
    try {
      const find = await contact.findByPk(id);
      const returnValue = await generateObject(find);
      return returnValue;
    } catch (error) {
      return {
        code: 404,
        message: 'contact not found',
      };
    }
  },

  async create(data) {
    try {
      const find = await contact.create(data);
      const returnValue = await generateObject(find);
      return returnValue;
    } catch (error) {
      return {
        code: 500,
        message: `error while creating contact: ${error}`,
      };
    }
  },
};
