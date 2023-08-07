const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user, role } = require('../models/index.mapper');

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
    const token = jwt.sign({
      id: userExist.id,
    }, process.env.JWT_SECRET, {
      expiresIn: 24 * 60 * 60, // 24 hours
    });
      // Mettre à jour la date de la dernière connexion
    await user.update(userExist.id, {
      last_visited: new Date(),
      delete_at: null,
    });

  
    // Return user && token
    const userLogged = {
      id: userExist.id,
      username: userExist.username,
      email: userExist.email,
      sessionToken: token,
      message : `Connecté sous ${userExist.username} !`,
      role : await role.findByPk(userExist.id_role),
    };
    return userLogged;
  },

};
