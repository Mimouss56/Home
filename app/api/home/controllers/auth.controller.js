const loginService = require('../services/login.service');
const registerService = require('../services/register.service');

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;
    const data = await loginService.login(username, password);

    if (data.code) return res.status(data.code).json(data.message);
    return res.json(data);
  },

  async register(req, res) {
    const {
      email, username, password, confirmPassword,
    } = req.body;
    const inputData = {
      email,
      username,
      password,
      confirmPassword,
    };
    const data = await registerService.register(inputData);
    if (data.code) return res.status(data.code).json(data.message);
    return res.json({ message: 'Utilisateur créé', data });
  },

  async getMe(req, res) {
    if (!req.user) return res.json({});
    return res.json(req.user);
  },
};
