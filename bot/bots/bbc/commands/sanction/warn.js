/* eslint-disable no-console */
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const sanctionService = require('../../../../../app/base_BBC/services/sanction.service');
const { sendEmbedSanction } = require('../../../../utils/sendEmbed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn un User')
    .addUserOption((user) => user
      .setName('user')
      .setDescription('Utilisateur à sanctionner')
      .setRequired(true))
    .addStringOption((reason) => reason
      .setDescription('Raison du Warn')
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


    const jsonSanction = await sanctionService.createSanction(user.id, 1, reason, author.id, interaction.guild.id);
    await sendEmbedSanction(interaction, jsonSanction.typeName);
  },
};
