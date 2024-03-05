const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const sanctionService = require('../../../../../app/base_BBC/services/sanction.service');
const dayjs = require('dayjs');
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
    if (returnListSanction.length === 0) {
      return interaction.reply({
        content: 'Aucune sanction pour cet utilisateur',
        ephemeral: true,
      });
    }

    const sanctionField = returnListSanction.flatMap((sanction) => {
      const authorMember = interaction.guild.members.cache.get(sanction.author);
      return [
        {
          name: `${sanction.type} mis en place par ${authorMember.user.username}`,
          value: sanction.reason,
        },
        {
          name: 'Crée le : ',
          value: `${dayjs(sanction.created_at).format('DD/MM/YYYY')}`,
          inline: true,
        },
        {
          name: 'Supprimée le : ',
          value: sanction.deleted ? `${dayjs(sanction.deleted).format('DD/MM/YYYY')}` : '---',
          inline: true,
        },
        {
          name: 'Par : ',
          value: `${authorMember.user.username}`,
          inline: true,
        },
      ];
    });
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle(`Liste des Sanction de ${user.username}`)
      .addFields(
        sanctionField,
      );
    return interaction.reply({ embeds: [embed], ephemeral: true });

  },
};
