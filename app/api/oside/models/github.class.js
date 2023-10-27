require('dotenv').config();
const { request } = require('undici');

class GitHubSDK {
  authtype;

  authtoken;

  apibase;

  constructor() {
    this.apibase = false;
    this.authtoken = false;
    this.authtype = false;
  }

  SetAccessInfo(authtype, authtoken) {
    this.authtype = authtype;
    this.authtoken = authtoken;
    this.apibase = 'https://api.github.com';
  }

  /**
 *
 * @param {*} method
 * @param {*} apipath
 * @param {*} postvars
 * @returns
 */
  async Api(method, apipath, postvars = false) {
    const url = this.apibase + apipath;
    const headers = {
      Authorization: `${this.authtype} ${this.authtoken}`,
      'content-type': 'application/json',
      accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    const sendBody = {
      method,
      headers,
    };
    if (postvars) {
      sendBody.body = JSON.stringify(postvars);
    }
    try {
      const res = await fetch(url, sendBody);

      if (res.status === 204 || res.status === 203) return { statusText: res.statusText };
      if (res.ok) return await res.json();
      throw new Error(`Response status ${res.status}: ${await res.text()}`);
    } catch (error) {
      return error.message;
    }
  }

  static async getOauthTokenAccess() {
    const tokenResponseData = await request('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        // code,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
      }).toString(),
      headers: {
        Accept: 'application/json',
      },
    });
    const oauthData = await tokenResponseData.body.json();
    return oauthData;
  }
}
module.exports = GitHubSDK;
