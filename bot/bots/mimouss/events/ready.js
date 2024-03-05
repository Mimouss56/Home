const { Events, ActivityType } = require('discord.js');

module.exports = {
  // eslint-disable-next-line indent
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setActivity('vos commandes', { type: ActivityType.Listening });
    if (process.env.NODE_ENV === 'dev') console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
