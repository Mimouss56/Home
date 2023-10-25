const { Events, ActivityType } = require('discord.js');
// const { textActivity } = require('../../../../config.json');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setActivity("vos commandes", { type: ActivityType.Listening });
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
