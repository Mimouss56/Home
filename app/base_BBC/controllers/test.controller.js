/* eslint-disable max-len */
// const discordController = require('./discord');
const DiscordSDK = require('../../models/discordApi');

const testController = {
  async renderTest(req, res) {
    const discord = new DiscordSDK();
    // discord.SetAccessInfo(
    // 'Bot', 'MTA5NjE1MjQ4OTMxODk0ODk2NA.GNubci.zYxDskUjsnSufS5NCn0EY4UWlOSwreIe3M0Utk'
    // );
    discord.SetAccessInfo('Bot', 'OTAzMzEyMjMyOTU4NTU4Mjg5.GseWMS.jlphQXP9njJ0y4xGr7Te8O6F5_1P8qRR9iaF20');

    // invites
    // const result = await discord.Api('GET', '/guilds/827628489867264011/invites');
    // const guildInfo = await discord.Api('GET', '/guilds/827628489867264011/roles/997522808273916024');
    // const result = await discord.Api('GET', '/users/356821625984909313');
    // Switch Role Master For Mouss
    const result = await discord.Api('put', '/guilds/827628489867264011/members/356821625984909313/roles/830200754832801843');
    // const result = await discord.Api('PATCH', '/guilds/827628489867264011/members/261908938897752065', { nick: '🐖 MyLittleLardon 🐖' });
    res.json(result);
  },
};

module.exports = testController;
