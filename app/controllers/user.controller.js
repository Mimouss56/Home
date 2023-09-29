const userService = require('../services/user.service');
const jobService = require('../services/job.service');
const schoolService = require('../services/school.service');
const sanctionService = require('../services/sanction.service');

module.exports = {
  async getAll(req, res) {
    const dataUsers = await userService.getAll();
    // promise.all
    const users = await Promise.all(
      dataUsers.map(async (user) => {
        const jobUser = await jobService.getAllByUser(user.id);
        const schoolUser = await schoolService.getAllByUser(user.id);
        const sanctionUser = (user.child) ? await sanctionService.getAll(user.id) : [];

        return {
          ...user,
          job: jobUser,
          school: schoolUser,
          sanction: sanctionUser,
        };
      }),
    );
    res.json(users);
  },
  async get(req, res) {
    const { id } = req.params;
    const user = await userService.getData(id);
    const jobUser = await jobService.getAllByUser(user.id);
    const schoolUser = await schoolService.getAllByUser(user.id);
    const sanctionUser = (user.child) ? await sanctionService.getAll(user.id) : [];

    res.json({
      ...user,
      job: jobUser,
      school: schoolUser,
      sanction: sanctionUser,
    });
  },

  async put(req, res) {
    const { id } = req.params;
    const userInfo = await userService.getData(id);
    const { role } = req.body;
    const updatedChild = Object.prototype.hasOwnProperty.call(req.body, 'child') ? !req.body.child : userInfo.child;
    const inputData = {
      id_role: Number(role) || Number(userInfo.role.id),
      child: updatedChild,
    };
    const data = await userService.update(id, inputData);
    if (data.code) {
      return res.status(data.code).json(
        { message: data.message, error: data.error.toString() },
      );
    }

    return res.json(data);
  },
};
