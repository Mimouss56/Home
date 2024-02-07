const { contact } = require('../../models/index.mapper');
const interactionService = require('./interaction.service');

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
    const find = await contact.findByPk(id);
    if (!find) {
      return {
        code: 404,
        message: 'contact not found',
      };
    }
    const returnValue = await generateObject(find);
    return returnValue;
  },
};
