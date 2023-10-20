const DiscordSDK = require('../class/discordAPI');
const { tokenBBC: tokenBot } = require('../../../config.json');

const discord = new DiscordSDK();
discord.SetAccessInfo('Bot', tokenBot);
const { user: User, sanction } = require('../models/index.mapper');

const type = {
  1: 'Warn',
  2: 'Kick',
  3: 'Ban',
};
module.exports = {
  async getAll(discordId = false) {
    const sanctions = await sanction.findAll({
      where: (discordId) ? { discord_id: discordId } : false,
    });
    return sanctions.map((s) => ({
      type: type[s.type],
      reason: s.reason,
      created_at: s.created_at,
      deleted_at: s.delete_at || false,
      author: s.author_discord_id,
      user: s.discord_id,
    }));
  },
  /**
   *
   * @param {String} discordId ID discord du sanctionné
   * @param {Number} typeId Input de l'ID de la sanction
   * @param {String} reason Les raisons de la sanction
   * @param {Number} authorId L'auteur
   * @returns {Object}
   */
  async createSanction(discordId, typeId, reason, authorId) {
    let infoMethod = 'GET';
    const userDiscord = await discord.Api('GET', `/users/${discordId}`);
    const author = await User.findByPk(authorId);
    // Crée une nouvelle sanction dans la base de données
    await Sanction.create({
      discord_id: discordId,
      type: typeId,
      reason,
      author: authorId,
    });
    if (typeId === 2) infoMethod = 'DELETE'; // Kick
    if (typeId === 3) infoMethod = 'PUT'; // BAN

    if (infoMethod !== 'GET') await discord.Api(infoMethod, `guilds/${process.env.guildId}/bans/${discordId}`);

    const returnJson = {
      author: author.username,
      completeName: `${userDiscord.username}#${userDiscord.discriminator}`,
      discordId,
      reason,
      typeName: type[typeId],
    };

    return returnJson;
  },
  async getAllSanctionFor(discordId) {
    const listSanctions = await Sanction.findAll({ where: { discord_id: discordId } });
    const userDiscord = await discord.Api('GET', `/users/${discordId}`);
    const parsedSanctions = JSON.parse(JSON.stringify(listSanctions));
    const sanctions = await Promise.all(parsedSanctions.map(async (sanction) => ({
      type: type[sanction.type],
      author: await User.findByPk(sanction.author),
      reason: sanction.reason,
      created_at: sanction.created_at,
      deleted_at: (sanction.delete_at) ? sanction.delete_at : false,
    })));
    return {
      user: userDiscord.username,
      discord_id: userDiscord.id,
      sanctions,
    };
  },

};
