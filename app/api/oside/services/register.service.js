const bcrypt = require('bcrypt');
const { user } = require('../models/index.mapper');

// const GitHubSDK = require('../models/github.class');

// const github = new GitHubSDK();
// github.SetAccessInfo('token', process.env.GITHUB_TOKEN);

module.exports = {

  async register(inputData) {
    const userExist = await this.checkUserExist(inputData.email, inputData.username);

    if (userExist.emailExist) {
      return {
        code: 400,
        message: 'Email already exist',
      };
    }
    if (userExist.usernameExist) {
      return {
        code: 400,
        message: 'Username already exist',
      };
    }
    if (inputData.password !== inputData.passwordConfirm) {
      return {
        code: 400,
        message: 'Password and password confirm must be the same',
      };
    }
    // eslint-disable-next-line no-param-reassign
    delete inputData.passwordConfirm;

    const hash = await bcrypt.hash(inputData.password, 10);
    try {
      const data = await user.create({
        ...inputData,
        first_name: inputData.first_name || null,
        last_name: inputData.last_name || null,
        github_login: inputData.username,
        password: hash,
      });
      return data;
    } catch (error) {
      return {
        code: 500,
        message: 'Erreur pendant la création du compte',
      };
    }
  },
  async checkUserExist(email, username) {
    const userExist = await user.findOne({ where: { email } });
    const usernameExist = await user.findOne({ where: { username } });
    return {
      emailExist: userExist,
      usernameExist,
    };
  },
};
