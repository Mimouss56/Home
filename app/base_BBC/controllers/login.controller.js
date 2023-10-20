const DiscordSDK = require('../class/discordAPI');

const discord = new DiscordSDK();
const Utils = require('../../utils/discord.utils');
const userServices = require('../services/user.service');

const urlAuthorize = 'https://discord.com/api/oauth2/authorize';

const {
  clientIdBBC, redirectUriBBC, scopeBBC, guildIdBBC,
} = require('../../../config.json');

module.exports = {
  async login(req, res) {
    if (req.query.action === 'login') {
      const paramsLogin = new URLSearchParams({
        client_id: clientIdBBC,
        redirect_uri: redirectUriBBC,
        response_type: 'code',
        scope: scopeBBC,
      });
      const url = `${urlAuthorize}?${paramsLogin.toString()}`;

      return res.redirect(url);
    }
    if (req.query.code) {
      const oauthData = await Utils.oauthData(req.query.code);
      req.session.accessToken = oauthData.access_token;
      if (oauthData.access_token) {
        discord.SetAccessInfo(oauthData.token_type, oauthData.access_token);
        const userDiscord = await discord.Api('GET', '/users/@me');

        // isMemberGuild
        // discord.SetAccessInfo('BOT', process.env.BOT_TOKEN);
        const isMember = await discord.Api('GET', `/users/@me/guilds/${guildIdBBC}/member`);
        if (!isMember) {
          const inviteUrl = 'https://discord.gg/hpyYt5aYxZ';
          return res.json(`
          Vous n'êtes pas présent sur le serveur.
          Pour accéder à toutes les fonctionnalités, veuillez rejoindre notre serveur Discord
          à cette adresse ${inviteUrl}
          `);
        }

        const infoUser = await Utils.updateUserBdd(userDiscord);
        const user = await userServices.getData(infoUser.id);
        req.session.user = user;

        req.session.logged = {
          id: user.id,
          accessToken: oauthData.access_token,
          isAdmin: infoUser.isAdmin,
        };

        return res.json({
          type: 'success',
          message: `Vous êtes bien connecté sous le pseudo ${userDiscord.username}`,
          session: {
            logged: {
              id: user.id,
              accessToken: oauthData.access_token,
              isAdmin: user.is_admin,
            },
            user,
          },
        });
      }
    }
    return res.redirect('/');
  },

  logout(req, res) {
    //* Clear user session
    req.session.logged = null;
    req.session.accessToken = null;
    delete req.session.user;
    req.session.flash = [{ type: 'info', message: 'Vous êtes déconnecté' }];
    res.redirect('/');
  },

};
