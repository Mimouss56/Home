const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setActivity('Mouss Dev, Je suis là', { type: ActivityType.Custom });
    if (process.env.NODE_ENV === 'development') console.log(`Ready! Logged in as ${client.user.tag}`);
    // on post un message d'avertissement dans le channel 1095689612195799072
    // const channel = client.channels.cache.get('1095689612195799072');
    // channel.send('<@356821625984909313> est en train de coder, donc il est possible que le bot soit instable. Merci de votre compréhension.');
  },
};
