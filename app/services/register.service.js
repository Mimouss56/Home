const bcrypt = require('bcrypt');
const { user } = require('../models/index.mapper');

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
    const { passwordConfirm, ...restInput } = inputData;

    const hash = await bcrypt.hash(restInput.password, 10);
    try {
      const data = await user.create({
        ...restInput,
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
