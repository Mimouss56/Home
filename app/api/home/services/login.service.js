const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/index.mapper');
const userService = require('./user.service');
const feedbackService = require('../../../services/feedback.service');
const sanctionService = require('./sanction.service');

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
    const dataNotif = {
      feedback: await feedbackService.getAll(),
      sanction: await sanctionService.getAll(userExist.id),
    };

    // Return user && token && dataNotif
    const userLogged = {
      sessionToken: token,
      message: `Connecté sous ${userExist.username} !`,
      data: {
        ...await userService.getData(userExist.id),
        dataNotif,
      },
      // id: userExist.id,
      // username: userExist.username,
      // email: userExist.email,
      // role: await roleService.getData(userExist.id_role),
    };
    return userLogged;
  },

  async getTokenNetatmo(req, res) {
    const body = {

      client_id: process.env.NETATMO_CLIENT_ID,
      client_secret: process.env.NETATMO_CLIENT_SECRET,
      grant_type: 'password',
      username: process.env.NETATMO_USERNAME,
      password: process.env.NETATMO_PASSWORD,
      scope: process.env.NETATMO_SCOPE,
    };
    const reponse = await fetch('https://api.netatmo.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: JSON.stringify(body),

    });
    const data = await reponse.json();
    res.json(data);
  },

};
