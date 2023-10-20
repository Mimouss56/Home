const sanctionService = require('../services/sanction.service');

const userController = {
  async getAll(req, res) {
    // Promise de userService.getAllUser
    const users = await sanctionService.getAll();
    res.json(users);
  },
  // async infosUser(req, res) {
  //   const viewUser = await userService.getData(req.params.id);
  //   res.json(viewUser);
  //   // res.render('admin/user.ejs', { viewUser });
  // },
};

module.exports = userController;
