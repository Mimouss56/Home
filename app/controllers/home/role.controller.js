const roleService = require('../../services/home/role.service');

module.exports = {
  async getAll(req, res) {
    try {
      const roles = await roleService.getAll();
      return res.json(roles);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: error,
      });
    }
  },
};
