const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const sanctionService = require('../../../../../app/base_BBC/services/sanction.service');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('sanction')
    .setDescription('Liste des sanction d\'un user')
    .addUserOption((user) => user
      .setName('user')
      .setDescription('choix du user')
      .setRequired(true))
    .addBooleanOption((option) => option.setName('embed')
      .setDescription('affichage pour soi')),

  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const user = interaction.options.getUser('user');

    const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
    if (!isAdmin && interaction.user.id !== user.id) {
      return interaction.reply({ content: 'Tu n\'es pas autorisé à faire ça', ephemeral: true });
    }
    const returnListSanction = await sanctionService.getAll(user.id);
    if (returnListSanction.length === 0) return interaction.reply({
      content: 'Aucune sanction pour cet utilisateur',
      ephemeral: true
    });
    const sanctionField = returnListSanction.sanctions.map((sanction) => ({
      name: sanction.type,
      value: sanction.reason,
    }));
    const createSanctionDate = returnListSanction.sanctions.map((sanction) => ({
      name: 'Crée le : ',
      value: sanction.created_at,
      inline: true,
    }));
    const deleteSanctionDate = returnListSanction.sanctions.map((sanction) => ({
      name: 'Supprimée le : ',
      value: sanction.deleted_at,
      inline: true,
    }));
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle(`Liste des Sanction de ${returnListSanction.user}`)
      .addFields(sanctionField, createSanctionDate, deleteSanctionDate);
    interaction.reply({ embeds: [embed], ephemeral: true });

  },
};
