const { SlashCommandBuilder } = require('discord.js');
const { randomItem } = require('../../../../utils/random');
const { role } = require('../../../../../config.json');

const bonjourSimple = [
  'Wesh ma gueule',
  'Hello',
  'Salut',
  'Konnichiwa',
  'Demat',
  'Vas-y Frère arrête de spam',
  'Bouh tu n\'es pas donateur',
  'Oui quoi ?',
];
const bonjourAdmin = [
  'Oh Bonjour à vous grand chef',
  'Excusez moi mon impertinence je ne vous ai pas vu avant',
  'Bonjour Maître',
  'Ah enfin de retour tu m\'avais manqué',
  'Le soleil vient de se lever et je te souhaite une belle journée',
  'Belle journée beauté !',
  'Un café et deux doses d\'espoir s\'il te plait',
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName('bonjour')
    .setDescription('Hmmm Bonjour ?!'),

  async execute(interaction) {
    // LordMojo
    const arrayBonjour = (interaction.member.roles.resolve('952328803991031870') || interaction.member.roles.resolve(role.quarks))
      ? bonjourAdmin
      : bonjourSimple;
    await interaction.reply(randomItem(arrayBonjour));
  },
};
