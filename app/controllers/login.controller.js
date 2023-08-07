const loginService = require('../services/login.service');
const registerService = require('../services/register.service');

module.exports = {
  async login(req, res) {
    let data;
    const { email, password } = req.body;
    data = await loginService.login(email, password);

    if (data.code) return res.status(data.code).json(data.message);
    return res.json(data);
  },

  async register(req, res) {
    const {
      email, username, password, passwordConfirm,
    } = req.body;
    const inputData = {
      email,
      username,
      password,
      passwordConfirm,
    };
    const data = await registerService.register(inputData);
    if (data.code) return res.status(data.code).json(data.message);
    return res.json(data);
  },
}
