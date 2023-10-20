const { user: User, donator, don } = require('../models/index.mapper');
const DiscordSDK = require('../class/discordAPI');
const { guildIdBBC: guildID, masterRole, tokenBBC: tokenBot } = require('../../../config.json');

const discord = new DiscordSDK();
discord.SetAccessInfo('Bot', tokenBot);

module.exports = {
  async getData(idUser) {
    const guildRoles = await discord.Api('GET', `/guilds/${guildID}/roles`);

    const userInfos = await User.findByPk(idUser);
    const donateurInfos = await donator.findByPk(idUser);

    const userDiscord = await discord.Api('GET', `/guilds/${guildID}/members/${userInfos.discord_id}`);

    const userReturn = {
      username: userDiscord.user.username,
      discord_id: userDiscord.user.id,
      locale: userDiscord.user.locale,
      url_avatar: `https://cdn.discordapp.com/avatars/${userDiscord.user.id}/${userDiscord.user.avatar}.png`,
      status: userDiscord.roles.includes(masterRole),
      roles: guildRoles.filter((role) => userDiscord.roles.includes(role.id)).map((role) => ({
        id: role.id,
        name: role.name,
        color: `#${role.color.toString(16).padStart(6, '0')}`,
      })),
      id: userInfos.id,
      nom: userInfos.nom,
      prenom: userInfos.prenom,
      email: userInfos.email,
      is_admin: userInfos.is_admin,
    };
    // if donateurInfos not null add donateurInfos and donUser to userReturn
    if (donateurInfos) {
      userReturn.is_donator = donateurInfos;
      userReturn.dons = await don.findAll({ where: { user_id: idUser } });
      // userReturn.solde = await this.countSolde(idUser);
    }

    return userReturn;
  },

  async getAll() {
    const guildRoles = await discord.Api('GET', `/guilds/${guildID}/roles`);
    const listUserDiscord = await discord.Api('GET', `/guilds/${guildID}/members?limit=1000`);

    // Mapper chaque utilisateur Discord à l'objet désiré
    const usersReturn = await Promise.all(listUserDiscord.map(async (userDiscord) => {
      const userInfos = await User.findOne({ where: { discord_id: Number(userDiscord.user.id) } });

      const userReturn = {
        username: userDiscord.nick || userDiscord.user.global_name || userDiscord.user.username,
        discord_id: userDiscord.user.id,
        locale: userDiscord.user.locale,
        url_avatar: `https://cdn.discordapp.com/avatars/${userDiscord.user.id}/${userDiscord.user.avatar}.png`,
        status: userDiscord.roles.includes(masterRole),
        roles: guildRoles.filter((role) => userDiscord.roles.includes(role.id)).map((role) => ({
          id: role.id,
          name: role.name,
          color: `#${role.color.toString(16).padStart(6, '0')}`,
        })),
      };
      if (userInfos) {
        const donateurInfos = await donator.findByPk(userInfos.id);
        userReturn.siteBBC = {

          id: userInfos.id,
          nom: userInfos.nom,
          prenom: userInfos.prenom,
          email: userInfos.email,
          is_admin: userInfos.is_admin,
        };
        if (donateurInfos) {
          userReturn.is_donator = donateurInfos;
          userReturn.dons = await don.findAll({ where: { user_id: userInfos.id } });
          // userReturn.solde = await this.countSolde(idUser);
        }
      }

      return userReturn;
    }));

    return usersReturn;
  },
};
