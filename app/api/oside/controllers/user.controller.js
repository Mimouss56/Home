/* eslint-disable camelcase */
const userService = require('../services/user.service');
const loginService = require('../services/login.service');
const registerService = require('../services/register.service');
const datamappers = require('../models/index.mapper');
const githubService = require('../services/github.service');

module.exports = {
  async getAll(_, res) {
    const data = await userService.getAll();
    res.json(data);
  },

  async get(req, res) {
    const { id } = req.params;
    const data = await userService.getData(id);
    if (data.code) return res.status(data.code).json(data.message);
    return res.json(data);
  },
  async put(req, res) {
    const { id } = req.params;
    const {
      email, password, passwordConfirm, first_name, last_name, bio, github_id,
    } = req.body;
    const user = await userService.getData(id);
    if (user.code) return res.status(user.code).json(user.message);

    // ability user
    // MAJ de la liste des user_techno avec en 1er lieu la suppression
    const { ability } = req.body;
    // MAJ de la liste des ability
    if (ability) await datamappers.user.addTechno(user.id, ability);

    //check if github_id is not already used
    
    // if (github_id) {
    //   const githubUser = await githubService.getUser(github_id);
    //   if (githubUser.code) return res.status(githubUser.code).json(githubUser.message);
    //   if (githubUser.login !== user.github_id) {
    //     const githubUserExist = await userService.getDataByGithubId(githubUser.login);
    //     if (githubUserExist.code) return res.status(githubUserExist.code).json(githubUserExist.message);
    //     if (githubUserExist) return res.status(409).json({ message: 'Github id already used' });
    //   }
    // }
    

    const inputQuery = {
      email: email || user.email,
      password,
      passwordConfirm,
      first_name: first_name || user.first_name,
      last_name: last_name || user.last_name,
      bio: bio || user.bio,
      github_id: github_id || user.github_id,
    };

    // Update
    const result = await userService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result.message);
    // Recupère les nouvelles données
    const data = await userService.getData(result.id);

    return res.json({
      message: 'Profil updated',
      data,
    });
  },

  async delete(req, res) {
    const { id } = req.params;
    const user = await userService.getData(id);

    const data = await userService.safeDelete(user.id);
    if (data.code) return res.status(data.code).json(data.message);
    return res.json({
      message: data.message,
    });
  },

  async login(req, res) {
    let data;
    const codeGithub = req.query.code;
    if (codeGithub) {
      data = await loginService.loginWithGitHub(codeGithub);
    } else {
      const { email, password } = req.body;
      data = await loginService.login(email, password);
    }
    if (data.code) return res.status(data.code).json(data.message);
    return res.json(data);
  },

  async register(req, res) {
    const {
      email, username, password, passwordConfirm, first_name, last_name,
    } = req.body;
    const inputData = {
      email,
      username,
      password,
      passwordConfirm,
      first_name,
      last_name,
    };
    const data = await registerService.register(inputData);
    if (data.code) return res.status(data.code).json(data.message);
    return res.json(data);
  },

};
