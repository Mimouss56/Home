const { user: User, donator, don } = require('../models/index.mapper');
const DiscordSDK = require('../class/discordAPI');
const { guildIdBBC: guildID, masterRole, tokenBBC: tokenBot } = require('../../../config.json');

const discord = new DiscordSDK();
discord.SetAccessInfo('Bot', tokenBot);

module.exports = {
  async getData(idUser) {
    // 1. Récupérez d'abord les informations de userInfos.
    const userInfos = await User.findByPk(idUser);

    if (!userInfos) {
      // Gérez l'erreur si userInfos n'existe pas. Par exemple, retournez null ou lancez une erreur.
      return { error: 'User not found' };
    }

    // 2. Utilisez le discord_id de userInfos pour obtenir les informations de userDiscord.
    const guildRoles = await discord.Api('GET', `/guilds/${guildID}/roles`);
    const userDiscord = await discord.Api('GET', `/guilds/${guildID}/members/${userInfos.discord_id}`);

    // 3. Enrichissez les informations userInfos avec celles de userDiscord.
    const userReturn = {
      // Propriétés de userInfos
      id: userInfos.id,
      nom: userInfos.nom,
      prenom: userInfos.prenom,
      email: userInfos.email,
      is_admin: userInfos.is_admin,
      discordInfos: {
        username: userDiscord.nick || userDiscord.user.global_name || userDiscord.user.username,
        discord_id: userDiscord.user.id,
        locale: userDiscord.user.locale,
        url_avatar: `https://cdn.discordapp.com/avatars/${userDiscord.user.id}/${userDiscord.user.avatar}.png`,
        roles: guildRoles.filter((role) => userDiscord.roles.includes(role.id)).map((role) => ({
          id: role.id,
          name: role.name,
          color: `#${role.color.toString(16).padStart(6, '0')}`,
        })),
      },
    };
    // Si donateurInfos existe, ajoutez ces informations à userReturn.
    const donateurInfos = await donator.findByPk(idUser);
    if (donateurInfos) {
      userReturn.is_donator = donateurInfos;
      userReturn.dons = await don.findAll({ where: { user_id: idUser } });
    }
    return userReturn;
  },

  async getAll() {
    // 1. Récupérez tous les utilisateurs de votre base de données.
    const allUsers = await User.findAll();

    // 2. Récupérez les informations du serveur Discord.
    const guildRoles = await discord.Api('GET', `/guilds/${guildID}/roles`);
    const listUserDiscord = await discord.Api('GET', `/guilds/${guildID}/members?limit=1000`);

    // 3. Mappez les utilisateurs pour enrichir les informations avec celles de listUserDiscord.
    const usersReturn = await Promise.all(allUsers.map(async (userInfo) => {
      // Trouvez le membre Discord correspondant pour cet utilisateur.
      const userDiscord = listUserDiscord.find((ud) => ud.user.id === String(userInfo.discord_id));

      let discordInfos;
      if (userDiscord) {
        discordInfos = {
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
      } else {
        discordInfos = 'User Deleted';
      }

      return {
        // Propriétés de userInfo
        id: userInfo.id,
        nom: userInfo.nom,
        prenom: userInfo.prenom,
        email: userInfo.email,
        is_admin: userInfo.is_admin,
        discordInfos,

        // Si vous voulez inclure donateurInfos
        ...(await this.getDonatorInfo(userInfo.id)),
      };
    }));

    return usersReturn;
  },
  // Cette fonction helper peut être utilisée pour obtenir des informations sur le donateur.
  async getDonatorInfo(idUser) {
    const donateurInfos = await donator.findByPk(idUser);
    if (!donateurInfos) return {};

    return {
      is_donator: donateurInfos,
      dons: await don.findAll({ where: { user_id: idUser } }),
      // solde: await this.countSolde(idUser);  // Si vous voulez inclure cette logique.
    };
  },
};
