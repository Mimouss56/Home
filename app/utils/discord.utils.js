const axios = require('axios');
const { user: User } = require('../base_BBC/models/index.mapper');
const {
  clientIdBBC, redirectUriBBC, scopeBBC, clientSecretBBC,
} = require('../../config.json');

const Utils = {
  async oauthData(code) {
    const tokenResponseData = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: clientIdBBC,
        client_secret: clientSecretBBC,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUriBBC,
        scope: scopeBBC,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    // const tokenResponseData = await axios.post('https://discord.com/api/oauth2/token', {
    //   body: new URLSearchParams({
    //     client_id: clientIdBBC,
    //     client_secret: clientSecretBBC,
    //     code,
    //     grant_type: 'authorization_code',
    //     redirect_uri: redirectUriBBC,
    //     scope: scopeBBC,
    //   }).toString(),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // });
    const oauthData = await tokenResponseData.data;
    return oauthData;
  },
  /**
 *
 * @param {*} user
 * @returns {Object} Object User BDD
 */
  async updateUserBdd(user) {
    const findUser = await User.findOne({
      where: {
        discord_id: user.id,
      },
    });
    if (!findUser) {
      await User.create({
        email: user.email,
        username: user.username,
        discord_id: user.id,
      });
    }
    return findUser;
  },
};
module.exports = Utils;
