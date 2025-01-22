const { Events, ActivityType } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setActivity('/bonjour', { type: ActivityType.Playing });
    if (process.env.NODE_ENV === 'development') console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
