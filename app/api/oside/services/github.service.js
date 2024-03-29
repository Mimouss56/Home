const GitHubSDK = require('../models/github.class');

const github = new GitHubSDK();
module.exports = {
  /**
     * @param {string} id Id Github User
     * @returns {object} Github User
     */
  async getData(id, login) {
    // Github Info
    const githubInfo = (login)
      ? {
        login,
        id,
      }
      : null;
    return githubInfo;
  },

  async oauthToGithub(code) {
    const tokenResponseData = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
      }).toString(),
      headers: {
        Accept: 'application/json',
      },
    });
    const oauthData = await tokenResponseData.body.json();

    if (oauthData.error) {
      return {
        code: 400,
        message: oauthData.error_description,
      };
    }
    github.SetAccessInfo('Bearer', oauthData.access_token);
    // Get User Github Info

    const userGithub = await github.Api('GET', '/user');
    return userGithub;
  },

};
