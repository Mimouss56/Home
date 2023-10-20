/* eslint-disable no-unused-vars */
const { user: User, donator, don } = require('../models/index.mapper');
const DiscordSDK = require('../class/discordAPI');
const { guildIdBBC, masterRole, tokenBBC } = require('../../../config.json');

const discord = new DiscordSDK();
discord.SetAccessInfo('Bot', tokenBBC);

module.exports = {
  async getData(idUser) {
    const guildRoles = await discord.Api('GET', `/guilds/${guildIdBBC}/roles`);

    const userInfos = await User.findByPk(idUser);
    const donateurInfos = await donator.findByPk(idUser);

    const userDiscord = await discord.Api('GET', `/guilds/${guildIdBBC}/members/${userInfos.discord_id}`);
    const listRoles = userDiscord.roles;
    const isRoleMaster = listRoles.includes(masterRole);

    const userReturn = {
      username: userDiscord.user.username,
      discord_id: userDiscord.user.id,
      locale: userDiscord.user.locale,
      url_avatar: `https://cdn.discordapp.com/avatars/${userDiscord.user.id}/${userDiscord.user.avatar}.png`,
      status: isRoleMaster,
      id: userInfos.id,
      nom: userInfos.nom,
      prenom: userInfos.prenom,
      email: userInfos.email,
      is_admin: userInfos.is_admin,
      roles: guildRoles.filter((role) => listRoles.includes(role.id)).map((role) => ({
        id: role.id,
        name: role.name,
        color: `#${role.color.toString(16).padStart(6, '0')}`,
      })),
    };
    // if donateurInfos not null add donateurInfos and donUser to userReturn
    if (donateurInfos) {
      userReturn.is_donator = donateurInfos;
      userReturn.dons = await don.findAll({ where: { user_id: idUser } });
      userReturn.solde = await this.countSolde(idUser);
    }

    return userReturn;
  },

  async getAll() {
    const users = await User.findAll();

    // promise all de getData
    const usersReturn = await Promise.all(users.map((user) => this.getData(user.id)));
    return usersReturn;
  },
};
