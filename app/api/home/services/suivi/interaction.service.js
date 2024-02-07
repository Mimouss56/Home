const { interaction } = require('../../models/index.mapper');

module.exports = {

  async getAllInteractionByContactId(contactId) {
    const find = await interaction.findAll({ where: { id_contact: contactId } });
    if (!find) {
      return [];
    }
    return find;
  },
};
