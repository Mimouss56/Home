const bcrypt = require('bcrypt');
const { user, memberTechno, memberProjet } = require('../models/index.mapper');
const roleService = require('./role.service');
const githubService = require('./github.service');

module.exports = {

  async getData(id) {
    const userByID = await user.findByPk(id);
    if (!userByID) {
      return {
        code: 404,
        message: 'User not found',
      };
    }
    const returnTechnoUser = await this.getViewTechnoUser(userByID.id);

    const role = await roleService.getData(userByID.role_id);
    const gitHubInfo = await githubService.getData(userByID.github_id, userByID.github_login);
    const avatarUrl = (gitHubInfo.id)
      ? `https://avatars.githubusercontent.com/u/${gitHubInfo.id}?v=4`
      : 'https://pluspng.com/img-png/github-octocat-logo-vector-png--896.jpg';
    const userDetails = {
      ...userByID,
      avatar_url: avatarUrl,
      role,
      ability: returnTechnoUser,
      github: gitHubInfo,
    };
    delete userDetails.github_login;
    // delete userDetails.github_id;
    delete userDetails.password;
    delete userDetails.role_id;
    return userDetails;
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
        // si delete_at est rempli on modifie le username par "utilisateur supprimé"
        if (oneUser.deleted_at) {
          oneUser.username = 'Utilisateur supprimé';
        }
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
    if (emailExist && emailExist.id !== userByID.id) return { code: 409, message: 'Email already exist' };
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

    try {
      const result = await user.update(userByID.id, inputData);
      return { message: 'User updated', result };
    } catch (error) {
      return {
        code: 500,
        message: 'Error while updating user',
      };
    }
  },
  async safeDelete(id) {
    const userByID = await this.getData(id);
    // on supprime les technos de l'utilisateur à delete
    await memberTechno.removeUser(userByID.id);
    // on supprime de la listes des projets de l'utilisateur à delete participe
    await memberProjet.removeUser(userByID.id);
    // on supprime l'utilisateur
    const result = await user.safeDelete(userByID.id);
    if (!result) {
      return ({
        code: 500,
        message: 'Error while deleting user',
      });
    }
    return { message: 'User deleted' };
  },
  async checkUserExist(email, username, githubLogin) {
    const userExist = {
      emailExist: await user.findOne({ where: { email } }),
      usernameExist: await user.findOne({ where: { username } }),
      githubLoginExist: await user.findOne({ where: { github_login: githubLogin } }),
    };

    return userExist;
  },
  async getViewTechnoUser(idUser) {
    const technoUser = await user.viewTechnoUser(idUser);
    const renderTechnoUser = technoUser.map((techno) => {
      const oneTechno = {
        id: techno.id,
        label: techno.label,
        color: techno.color,
      };
      return oneTechno;
    });
    return renderTechnoUser;
  },
};
