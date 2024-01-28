const { SlashCommandBuilder } = require('discord.js');
const { role } = require('../../../../../config.json');

const welcomeMessages = [
  'Bienvenue parmi les particules élémentaires du serveur !',
  'Les Quarks ne sont rien comparés à toi ! Bienvenue !',
  'Félicitations ! Tu es maintenant un élément clé de notre univers discordien !',
  'L\'univers tout entier est plus stable grâce à ta présence parmi nous ! Bienvenue !',
  'Je sens de l\'énergie dans l\'air ! Bienvenue parmi les particules élémentaires du serveur !',
  'Ton arrivée a fait vibrer les particules du serveur ! Bienvenue parmi nous !',
];
const alreadyRoleMessage = [
  'Hey, tu as déjà le rôle de Quarks, tu veux deux Quarks ?',
  'Je vois que tu es déjà un Quarks, prêt à gouverner l\'univers ?',
  'Déjà un Quarks ? Il semblerait que tu sois un élément clé de notre serveur !',
  'Hey, t\'es tellement quarky que tu as déjà le rôle !',
  'La particule de Dieu est géniale, mais tu as déjà le rôle de Quarks !',
  'Le rôle Quarks ? C\'est dépassé, tu es déjà une particule élémentaire à part entière sur le serveur !',
  'Désolé, vous êtes déjà un super-héros des particules élémentaires. Aucun double rôle autorisé !',
];
const incorrectResponses = [
  "Désolé, tu n'as pas la bonne réponse. Tu ferais mieux de retourner à l'école des Quarks !",
  "Raté ! Tu n'as pas le QI d'un Quark. Essaye encore !",
  "Non, non, non... tu es loin d'être un Quark ! Mais au moins, tu as essayé.",
  "C'est une réponse décevante. Les Quarks ne sont pas fiers de toi...",
  "Tu as besoin d'une leçon de physique élémentaire. Essaie encore, si tu en as le courage !",
  'Je suis désolé, tu as échoué. Peut-être que les Quarks sont simplement trop avancés pour toi...',
  'Tu ne peux pas avoir une particule de chance tout le temps. Tu as échoué !',
  'Tu as déçu les Quarks... tu vas devoir réviser tes connaissances.',
  "Je suis désolé, mais tu n'es pas assez subatomique pour comprendre la réponse.",
  'Hmm... je pense que tu as besoin de plus de masse cérébrale pour comprendre la réponse. Dommage !',
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName('chaussons')
    .setDescription('Rôle secret des apprenants de O\'Clock')
    .addStringOption((option) => option
      .setName('response')
      .setDescription('Vois avec Kourou pour la réponse')),

  async execute(interaction) {
    const response = interaction.options.getString('response');
    if (response === 'particule') {
      const { member } = interaction; // Récupère le membre Discord
      const hasquarksRole = interaction.guild.roles.cache.find((role) => role.id === role.quarks);
      if (member.roles.cache.has(hasquarksRole.id)) { // Vérifie si l'utilisateur a le rôle "Quarks"
        const message = welcomeMessages[Math.floor(Math.random() * alreadyRoleMessage.length)];
        // L'utilisateur a le rôle "Quarks"
        await interaction.reply(message);
      } else {
        // L'utilisateur n'a pas le rôle "Quarks"
        await interaction.member.roles.add([role.quarks]);
        const message = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

        await interaction.reply(message);
      }

      // Envois message de confirmation
    } else {
      const message = incorrectResponses[Math.floor(Math.random() * incorrectResponses.length)];
      await interaction.reply(message);
    }
  },

};