// eslint-disable-next-line no-unused-vars
const bcrypt = require('bcrypt');
const { user } = require('../models/index.mapper');
const roleService = require('./role.service');
const jobService = require('./job.service');
const schoolService = require('./school.service');
const sanctionService = require('./sanction.service');

module.exports = {

  async getData(id) {
    const userByID = await user.findByPk(id);
    if (!userByID) {
      return {
        code: 404,
        message: 'User not found',
      };
    }

    const userOptionByID = await user.option(id);
    userByID.family = userOptionByID.family;
    userByID.child = userOptionByID.child;
    userByID.role = await roleService.getData(userOptionByID.id_role);

    if (userOptionByID.child) {
      userByID.sanction = await sanctionService.getAll(userByID.id);
    }

    if (userByID.username === 'Mouss') {
      userByID.job = await jobService.getAllByUser(userByID.id);
      userByID.school = await schoolService.getAllByUser(userByID.id);
    }

    delete userByID.password;
    delete userByID.id_role;
    return userByID;
  },

  async getAll() {
    const allUsers = await user.findAll();
    if (!allUsers) {
      return {
        code: 404,
        message: 'Users not found',
      };
    }
    const users = await Promise.all(
      allUsers.map(async (userInfo) => {
        const oneUser = await this.getData(userInfo.id);
        return oneUser;
      }),
    );
    return users;
  },

  async update(id, inputQuery) {
    const inputData = { ...inputQuery };
    delete inputData.password;
    delete inputData.passwordConfirm;
    const userByID = await user.findByPk(id);
    // // Check if email not already exist in database
    // const emailExist = await user.findOne({ where: { email: inputData.email } });
    // if (emailExist && emailExist.id !== userByID.id) {
    //   return { code: 409, message: 'Email already exist' };
    // }
    // // check if password exist in object
    // if (inputQuery.password !== undefined) {
    //   // check if password and passwordConfirm are the same
    //   if (inputQuery.password && inputQuery.password !== inputQuery.passwordConfirm) {
    //     return ({
    //       code: 409,
    //       message: 'Le mot de passe et la confirmation doivent être identique',
    //     });
    //   }

    //   // check if password and old password are the same
    //   if (bcrypt.compareSync(inputQuery.password, userByID.password)) {
    //     return ({
    //       code: 409,
    //       message: 'Le nouveau mot de passe doit être différent de l\'ancien',
    //     });
    //   }
    //   inputData.password = bcrypt.hash(inputQuery.password, 10);
    // }
    try {
      await user.updateOption(userByID.id, inputData);
      return { message: 'Données mises à jour' };
    } catch (error) {
      return {
        code: 500,
        message: 'Error while updating user',
        error,
      };
    }
  },

  async delete(id) {
    const userByID = await user.findByPk(id);
    if (!userByID) {
      return {
        code: 404,
        message: 'User not found',
      };
    }
    try {
      await user.destroy({ where: { id } });
      return { message: 'Utilisateur supprimé' };
    } catch (error) {
      return {
        code: 500,
        message: 'Error while deleting user',
        error,
      };
    }
  },

  async checkUserExist(email, username) {
    const userExist = {
      emailExist: await user.findOne({ where: { email } }),
      usernameExist: await user.findOne({ where: { username } }),
    };

    return userExist;
  },
};