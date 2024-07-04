const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/index.mapper');

module.exports = {

  async register(inputData) {
    const userExist = await this.checkUserExist(inputData.email, inputData.username);

    if (userExist.emailExist.length !== 0) {
      return {
        code: 400,
        message: 'Email already exist',
      };
    }
    if (userExist.usernameExist.length !== 0) {
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
    const countUser = await user.base.count();

    try {
      const data = await user.base.create({
        ...dataInput,
        password: hash,
      });
      await user.option.create({
        id_user: data.id,
        id_role: countUser === 1 ? 1 : 2,
      });
      await user.infos.create({
        user_id: data.id,
      });
      const token = jwt.sign(
        {
          id: data.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN, // 24 hours
        },
      );
      const userRegistered = {
        sessionToken: token,
        message: `Utilisateur créé sous ${data.username} !`,
      };
      return userRegistered;
      // return {
      //   ...await userService.getData(data.id),
      // };
    } catch (error) {
      return {
        code: 500,
        message: `Erreur pendant la création du compte : ${error}`,
        error,
      };
    }
  },
  async checkUserExist(email, username) {
    const userExist = await user.base.findOne({ where: { email } });
    const usernameExist = await user.base.findOne({ where: { username } });
    return {
      emailExist: userExist,
      usernameExist,
    };
  },
};
