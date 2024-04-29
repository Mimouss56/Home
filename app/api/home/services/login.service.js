const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/index.mapper');
const userService = require('./user.service');
const feedbackService = require('./feedback.service');
const sanctionService = require('./sanction.service');

module.exports = {

  /**
* Logged
* @typedef {object} Logged - Utilisateur connecté
* @property {string} sessionToken - Token de connexion
* @property {string} message - Message de connexion
* @property {User} data - Données de l'utilisateur
* @property {array<Feedback>} dataNotif - Les notifications pour l'utilisateur

* @param {string} username
* @param {string} password
* @return {Logged} 200
* @return 400 - Invalid username/password supplied
* @return 401 - Unauthorized
* @return 500 - Unexpected error
  */
  async login(username, password) {
    const userExist = await user.base.findOne({ where: { username } });

    if (!userExist || userExist.length === 0) {
      return {
        code: 403,
        message: 'Username or password is incorrect',
      };
    }
    const userInfo = await userService.getData(userExist.id);
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (!passwordMatch) {
      return {
        code: 403,
        message: 'Username or password is incorrect',
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
    await user.base.update(userExist.id, {
      last_visited: new Date(),
      delete_at: null,
    });
    const dataNotif = {
      sanction: await sanctionService.getAll(userExist.id),
    };

    dataNotif.feedback = (userInfo.role.id === 1) ? await feedbackService.getAll() : [];

    // Return user && token && dataNotif
    const userLogged = {
      sessionToken: token,
      message: `Connecté sous ${userExist.username} !`,
      data: {
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
