const userService = require('../services/user.service');
const jobService = require('../services/job.service');
const schoolService = require('../services/school.service');
const sanctionService = require('../services/sanction.service');

module.exports = {
  async getAll(req, res) {
    const users = await userService.getAll();
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
      job : jobUser,
      school: schoolUser,
      sanction: sanctionUser
    });
  }
};
