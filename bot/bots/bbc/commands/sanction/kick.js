/* eslint-disable no-console */
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const sanctionService = require('../../../../../app/base_BBC/services/sanction.service');
const { sendEmbedSanction } = require('../../../../utils/sendEmbed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick un User')
    .addUserOption((user) => user
      .setName('user')
      .setDescription('Utilisateur à sanctionner')
      .setRequired(true))
    .addStringOption((reason) => reason
      .setDescription('Raison du Kick')
      .setName('reason')),

  async execute(interaction) {
    const isAdmin = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);

    if (!interaction.isChatInputCommand()) return;

    if (!isAdmin) {
      return interaction.reply({
        content: 'Tu n\'es pas autorisé à faire ça',
        ephemeral: true,
      });
    }

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const author = interaction.member;


    const jsonSanction = await sanctionService.createSanction(user.id, 1, reason, author.id);
    await sendEmbedSanction(interaction, jsonSanction.typeName);
  },
};
