const userService = require('../services/user.service');

const userController = {
  async getAllUser(req, res) {
    // Promise de userService.getAllUser
    const users = await userService.getAll();
    res.json(users);
  },
  async infosUser(req, res) {
    const viewUser = await userService.getData(req.params.id);
    res.json(viewUser);
    // res.render('admin/user.ejs', { viewUser });
  },
};

module.exports = userController;
