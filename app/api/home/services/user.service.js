// eslint-disable-next-line no-unused-vars
const bcrypt = require('bcrypt');
const { user } = require('../models/index.mapper');
const { upload } = require('../../../models/index.mapper');
const roleService = require('./role.service');
const jobService = require('./job.service');
const schoolService = require('./school.service');
const sanctionService = require('./sanction.service');

/**
 * Avatar
 * @typedef {object} Avatar
 * @property {integer} id - L'ID de l'avatar
 * @property {string} name - Le nom de l'avatar
 * @property {string} path - Le chemin de l'avatar
 */

/**
 * @typedef {object} User - Utilisateur
 * @property {integer} id - L'ID de l'utilisateur
 * @property {string} username - Le nom d'utilisateur
 * @property {string} email - L'email de l'utilisateur
 * @property {string} last_name - Le nom de famille de l'utilisateur
 * @property {string} first_name - Le prénom de l'utilisateur
 * @property {string} password - Le mot de passe de l'utilisateur
 * @property {Avatar} avatar - L'avatar de l'utilisateur
 * @property {string} createdAt - La date de création de l'utilisateur
 * @property {string} updatedAt - La date de modification de l'utilisateur
 * @property {string} deleteAt - La date de suppression de l'utilisateur
 * @property {Role} role - Le rôle de l'utilisateur
 * @property {array<Job>} job - Les jobs de l'utilisateur
 * @property {array<School>} school - Les écoles de l'utilisateur
 * @property {array<Sanction>} sanction - Les sanctions de l'utilisateur
 * @property {boolean} family - De la famille ?
 * @property {boolean} child - Un enfant ?

 * @param {object} data
 * @param {object} dataOption
 * @returns
 */
const generateByDefault = async (data, dataOption) => ({
  id: data.id,
  username: data.username,
  email: data.email,
  last_name: data.last_name,
  first_name: data.first_name,
  role: await roleService.getData(data.id_role),
  avatar: await upload.findByPk(data.avatar),
  family: dataOption.family,
  child: dataOption.child,
  sanction: dataOption.child ? await sanctionService.getAll(data.id) : null,
  job: data.username === 'Mouss' ? await jobService.getAllByUser(data.id) : null,
  school: data.username === 'Mouss' ? await schoolService.getAllByUser(data.id) : null,
});
module.exports = {

  async getData(id) {
    const userByID = await user.findByPk(id);
    if (!userByID) {
      return {
        code: 404,
        message: 'User not found',
      };
    }
    // Ingo Général User
    const userOptionByID = await user.option(id);
    const returnUser = await generateByDefault(userByID, userOptionByID);
    return returnUser;
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
    // Check if email not already exist in database

    const emailExist = await user.findOne({ where: { email: inputData.email } });
    if (emailExist && emailExist.id !== userByID.id) {
      return { code: 409, message: 'Email already exist' };
    }
    // check if password exist in object
    if (inputQuery.password !== undefined) {
      // check if password and passwordConfirm are the same
      if (inputQuery.password && inputQuery.password !== inputQuery.passwordConfirm) {
        return ({
          code: 409,
          message: 'Le mot de passe et la confirmation doivent être identique',
        });
      }

      // check if password and old password are the same
      if (bcrypt.compareSync(inputQuery.password, userByID.password)) {
        return ({
          code: 409,
          message: 'Le nouveau mot de passe doit être différent de l\'ancien',
        });
      }
      inputData.password = bcrypt.hash(inputQuery.password, 10);
    }

    const inputOption = {
      id_role: inputData.id_role,
      child: inputData.child,
      family: inputData.family,
    };
    const inputUser = {
      last_name: inputData.last_name,
      first_name: inputData.first_name,
      email: inputData.email,
      avatar: inputData.avatar,
      // password: inputData.password,
    };

    try {
      await user.updateOption(userByID.id, inputOption);
      await user.update(userByID.id, inputUser);
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
