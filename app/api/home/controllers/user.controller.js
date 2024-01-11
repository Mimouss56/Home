const userService = require('../services/user.service');
// const jobService = require('../services/home/job.service');
// const schoolService = require('../services/home/school.service');
// const sanctionService = require('../services/home/sanction.service');

module.exports = {
  async getAll(req, res) {
    const dataUsers = await userService.getAll();
    // promise.all
    // const users = await Promise.all(
    //   dataUsers.map(async (user) => {
    //     const jobUser = await jobService.getAllByUser(user.id);
    //     const schoolUser = await schoolService.getAllByUser(user.id);
    //     const sanctionUser = (user.child) ? await sanctionService.getAll(user.id) : [];

    //     return {
    //       ...user,
    //       job: jobUser,
    //       school: schoolUser,
    //       sanction: sanctionUser,
    //     };
    //   }),
    // );
    res.json(dataUsers);
  },
  async get(req, res) {
    const { id } = req.params;
    const user = await userService.getData(id);

    res.json({ user });
  },

  async put(req, res) {
    const { id } = req.params;
    const userInfo = await userService.getData(id);
    const {
      role, last_name: lastName, first_name: firstName, email, password, passwordConfirm,
    } = req.body;
    const updatedFamily = Object.prototype.hasOwnProperty.call(req.body, 'family') ? req.body.family : userInfo.family;
    const updatedChild = Object.prototype.hasOwnProperty.call(req.body, 'child') ? req.body.child : userInfo.child;
    const inputData = {
      id_role: Number(role) || Number(userInfo.role.id),
      family: updatedFamily,
      child: updatedChild,
      last_name: lastName || userInfo.lastName,
      first_name: firstName || userInfo.firstName,
      email: email || userInfo.email,
      password,
      passwordConfirm,
    };
    const data = await userService.update(id, inputData);
    if (data.code) {
      return res.status(data.code).json(
        { message: data.message, error: data.error },
      );
    }

    return res.json(data);
  },
  async delete(req, res) {
    const { id } = req.params;
    const data = await userService.delete(id);
    if (data.code) {
      return res.status(data.code).json(
        { message: data.message, error: data.error.toString() },
      );
    }

    return res.json(data);
  },
};
