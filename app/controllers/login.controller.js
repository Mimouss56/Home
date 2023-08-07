const loginService = require('../services/login.service');
const registerService = require('../services/register.service');

module.exports = {
  async login(req, res) {
    let data;
<<<<<<< HEAD
    const { username, password } = req.body;
    data = await loginService.login(username, password);
=======
    const { email, password } = req.body;
    data = await loginService.login(email, password);
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe

    if (data.code) return res.status(data.code).json(data.message);
    return res.json(data);
  },

  async register(req, res) {
    const {
<<<<<<< HEAD
      email, username, password, confirmPassword,
=======
      email, username, password, passwordConfirm,
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
    } = req.body;
    const inputData = {
      email,
      username,
      password,
<<<<<<< HEAD
      confirmPassword,
=======
      passwordConfirm,
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
    };
    const data = await registerService.register(inputData);
    if (data.code) return res.status(data.code).json(data.message);
    return res.json(data);
  },
}
