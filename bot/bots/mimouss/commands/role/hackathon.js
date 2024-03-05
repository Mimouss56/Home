const { SlashCommandBuilder } = require('discord.js');
const { role } = require('../../../../../config.json');

const welcomeMessages = [
  'Bienvenue parmi les participants du hackathon !',
  'Félicitations ! Tu fais désormais partie de notre équipe de développement !',
  'Le hackathon est encore plus brillant avec toi ! Bienvenue !',
  'Nous sommes ravis de t\'accueillir pour le hackathon !',
  'L\'esprit du hackathon s\'enrichit avec ta présence ! Bienvenue !',
  'Ton arrivée apporte une nouvelle énergie au hackathon ! Bienvenue parmi nous !',
];
const alreadyRoleMessage = [
  'Hey, tu participes déjà au hackathon, tu veux en faire deux ?',
  'Tu es déjà dans l\'équipe du hackathon, prêt à coder ?',
  'Déjà un participant au hackathon ? Tu es un élément clé de notre équipe !',
  'Hey, tu es tellement dédié au hackathon que tu as déjà le rôle !',
  'La participation au hackathon te va bien, mais tu l\'as déjà !',
  'Participer au hackathon ? C\'est dépassé, tu es déjà un membre actif de l\'équipe !',
  'Désolé, une seule participation au hackathon par personne !',
];
const incorrectResponses = [
  'Désolé, ce n\'est pas la bonne réponse. Consulte les informations du hackathon !',
  'Raté ! Tu as besoin de plus d\'infos sur le hackathon. Essaye encore !',
  'Non, non, non... tu es loin de la bonne réponse. Révise tes connaissances sur le hackathon !',
  'C\'est une réponse décevante. Tu devrais te renseigner davantage sur le hackathon...',
  'Tu as besoin d\'une leçon sur le hackathon. Essaie encore, si tu en as le courage !',
  'Je suis désolé, tu as échoué. Peut-être que le hackathon est trop avancé pour toi...',
  'Tu ne peux pas avoir de chance tout le temps. Tu as échoué au hackathon !',
  'Tu as déçu les participants au hackathon... tu vas devoir en apprendre davantage.',
  'Je suis désolé, mais tu n\'es pas assez informé sur le hackathon pour comprendre la réponse.',
  'Hmm... je pense que tu as besoin de plus de connaissances sur le hackathon. Dommage !',
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName('hackathon')
    .setDescription('Rôle secret des dev de l\'Hackathon')
    .addStringOption((option) => option
      .setName('response')
      .setDescription('Donne moi le nom de l\'équipe que tu appartenais')),

  async execute(interaction) {
    const response = interaction.options.getString('response');

    const roleHack = ['niji', 'open', 'cgi'];
    // verifie si la response est parmis l'array pour attrbuer le role hackathon
    if (roleHack.includes(response)) {
      // Récupère le membre Discord
      const { member } = interaction;
      const hasHackathonRole = interaction.guild.roles.cache.find((roleDetails) => roleDetails.id === roleDetails.hackathon);
      // Vérifie si l'utilisateur a le rôle "Hackathon"
      if (member.roles.cache.has(hasHackathonRole.id)) {
        const message = welcomeMessages[Math.floor(Math.random() * alreadyRoleMessage.length)];
        // L'utilisateur a le rôle "Quarks"
        await interaction.reply(message);
      }
      else {
        // L'utilisateur n'a pas le rôle "Quarks"
        await interaction.member.roles.add([role.hackathon]);
        const message = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

        await interaction.reply(message);
      }

      // Envois message de confirmation
    }
    else {
      const message = incorrectResponses[Math.floor(Math.random() * incorrectResponses.length)];
      await interaction.reply(message);
    }


  },
};