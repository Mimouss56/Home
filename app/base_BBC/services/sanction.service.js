const DiscordSDK = require('../class/discordAPI');
const { tokenBBC: tokenBot } = require('../../../config.json');
const { sanction } = require('../models/index.mapper');

const discord = new DiscordSDK();
discord.SetAccessInfo('Bot', tokenBot);

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
   * @param {string} discordId ID discord du sanctionné
   * @param {number} typeId Input de l'ID de la sanction
   * @param {string} reason Les raisons de la sanction
   * @param {number} authorId L'auteur
   * @returns {returnJson}
   */
  async createSanction(discordId, typeId, reason, authorId) {
    let infoMethod = 'GET';
    const userSanctionnedDiscord = await discord.Api('GET', `/users/${discordId}`);
    const authorSanctionDiscord = await discord.Api('GET', `/users/${authorId}`);
    // Crée une nouvelle sanction dans la base de données
    await sanction.create({
      discord_id: discordId,
      type: typeId,
      reason,
      author: authorId,
    });
    if (typeId === 2) infoMethod = 'DELETE'; // Kick
    if (typeId === 3) infoMethod = 'PUT'; // BAN

    if (infoMethod !== 'GET') { await discord.Api(infoMethod, `guilds/${process.env.guildId}/bans/${discordId}`); }

    const returnJson = {
      author: authorSanctionDiscord.username,
      completeName: `${userSanctionnedDiscord.username}#${userSanctionnedDiscord.discriminator}`,
      discordId,
      reason,
      typeName: type[typeId],
    };

    return returnJson;
  },
};
