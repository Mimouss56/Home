const { Events } = require('discord.js');
// votre regex
const regexQuoi = /\w+\s+quoi\s*\??/;
const regexCeSoir = /\bce\s+soir\b/;
module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.guild.id === '834291781511938110') {
      return;
    }
    const { author } = message;
    // si le message correspond à la regex
    if (regexQuoi.test(message.content) && !author.bot) {
      // envoyer une réponse
      message.reply(`Hey tu sais quoi !?!?! <@${author.id}>`);
      setTimeout(() => {
        message.channel.send('QUOICOUBEH ! ! !, (on me souffle à l\'oreille que normalement c\'est Cou A Cou B)');
      }, 3 * 1000);
    }
    // si le message correspond à la regex
    if (regexCeSoir.test(message.content) && !author.bot) {
      // envoyer une réponse
      message.reply(` La même chose que chaque nuit, <@${author.id}> : tenter de conquérir le monde ! `);
    }
  },
};
