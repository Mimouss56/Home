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
<<<<<<< HEAD
    if (inputData.password !== inputData.confirmPassword) {
=======
    if (inputData.password !== inputData.passwordConfirm) {
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
      return {
        code: 400,
        message: 'Password and password confirm must be the same',
      };
    }
<<<<<<< HEAD
    delete inputData.confirmPassword;
=======
    delete inputData.passwordConfirm;
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe

    const hash = await bcrypt.hash(inputData.password, 10);
    try {
      const data = await user.create({
        ...inputData,
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
