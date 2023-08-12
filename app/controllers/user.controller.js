const userService = require('../services/user.service');

module.exports = {
  async getAll(req, res) {
    const users = await userService.getAll();
    res.json(users);
  },
  async get(req, res) {
    const { id } = req.params;
    const user = await userService.getData(id);
    res.json(user);
  }
}
