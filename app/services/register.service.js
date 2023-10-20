const bcrypt = require('bcrypt');
const { user, userOption } = require('../models/index.mapper');
const userService = require('./user.service');

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
    if (inputData.password !== inputData.confirmPassword) {
      return {
        code: 400,
        message: 'Password and password confirm must be the same',
      };
    }
    // on delete le confirmPassword
    const { confirmPassword, ...dataInput } = inputData;

    const hash = await bcrypt.hash(dataInput.password, 10);

    // On attribut le role d'admin pour le 1er user
    const countUser = await user.count();

    try {
      const data = await user.create({
        ...dataInput,
        password: hash,
      });
      await userOption.create({
        id_user: data.id,
        id_role: countUser === 1 ? 1 : 2,
      });
      return {
        ...await userService.getData(data.id),
      };
    } catch (error) {
      return {
        code: 500,
        message: `Erreur pendant la création du compte : ${error}`,
        error,
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
