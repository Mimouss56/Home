const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/index.mapper');
// const jobService = require('./job.service');
// const schoolService = require('./school.service');
// const roleService = require('./role.service');
const userService = require('./user.service');

module.exports = {

  async login(username, password) {
    const userExist = await user.findOne({ where: { username } });
    if (!userExist) {
      return {
        code: 403,
        message: 'Email or password is incorrect',
      };
    }
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (!passwordMatch) {
      return {
        code: 403,
        message: 'Email or password is incorrect',
      };
    }
    // Création d'un token
    const token = jwt.sign(
      {
        id: userExist.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN, // 24 hours
      },
    );
    // Mettre à jour la date de la dernière connexion
    await user.update(userExist.id, {
      last_visited: new Date(),
      delete_at: null,
    });

    // const jobUser = await jobService.getAllByUser(userExist.id);
    // const schoolUser = await schoolService.getAllByUser(userExist.id);

    // Return user && token
    const userLogged = {
      sessionToken: token,
      message: `Connecté sous ${userExist.username} !`,
      data: {
        ...await userService.getData(userExist.id),
      },
      // id: userExist.id,
      // username: userExist.username,
      // email: userExist.email,
      // role: await roleService.getData(userExist.id_role),
    };
    return userLogged;
  },

};
