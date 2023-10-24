const { Events } = require('discord.js');

const regexQuoi = /\w+\s+quoi\s*\??/; // votre regex
const regexCeSoir = /\bce\s+soir\b/;
module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.guild.id === '827628489867264011') {
      return;
    }
    const { author } = message;
    if (regexQuoi.test(message.content) && !author.bot) { // si le message correspond à la regex
      message.reply(`Hey tu sais quoi !?!?! <@${author.id}>`); // envoyer une réponse
      setTimeout(() => {
        message.channel.send('QUOICOUBEH ! ! !, (on me souffle à l\'oreille que normalement c\'est Cou A Cou B)');
      }, 3 * 1000);
    }
    if (regexCeSoir.test(message.content) && !author.bot) { // si le message correspond à la regex
      message.reply(` La même chose que chaque nuit, <@${author.id}> : tenter de conquérir le monde ! `); // envoyer une réponse
    }
  },
};
