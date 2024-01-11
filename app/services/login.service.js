const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models/index.mapper');

module.exports = {

  async login(email, password) {
    const userExist = await user.findOne({ where: { email } });
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
    const username = userExist.username ?? userExist.github_login;
    let message = `Connecté sous ${username} !`;
    // si delete_at est rempli on mets a jour la date de suppression par null
    if (userExist.deleted_at) {
      message = `Bon retour parmis nous ${username} !`;
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
      sessionToken: token,
      message,
      // githubAccessToken: '',

    };
    return userLogged;
  },
  // Callback Github Login (Front)
  // async loginWithGitHub(code) {
  //   const userGithub = await githubService.oauthToGithub(code);
  //   const userExist = await user.findOne({ where: { github_id: userGithub.id } });
  //   // Si l'utilisateur n'existe pas
  //   if (!userExist) {
  //     return {
  //       code: 403,
  //       message: 'Aucun compte n\'est associé à ce compte Github',
  //     };
  //   }
  //   // Création d'un token
  //   const token = jwt.sign({
  //     id: userExist.id,
  //   }, process.env.JWT_SECRET, {
  //     expiresIn: 24 * 60 * 60, // 24 hours
  //   });
  //   // Mettre à jour la date de la dernière connexion
  //   await user.update(userExist.id, {
  //     username: userGithub.login,
  //     github_id: userGithub.id,
  //     github_login: userGithub.login,
  //     last_visited: new Date(),
  //     delete_at: null,
  //   });
  //   // Return user && token
  //   const userLogged = {
  //     id: userExist.id,
  //     sessionToken: token,
  //     message: `Connecté sous ${userGithub.login} !`,
  //   };
  //   return userLogged;
  // },
};
