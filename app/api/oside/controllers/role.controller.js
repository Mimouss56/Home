const roleService = require('../services/role.service');

module.exports = {
  async getAll(req, res) {
    const data = await roleService.getAll();
    res.json(data);
  },
  async get(req, res) {
    const { id } = req.params;
    const dataRole = await roleService.getData(id);
    return res.json(dataRole);
  },

  async post(req, res) {
    const { label, color } = req.body;

    const checkedRole = await roleService.checkRole(label);
    if (checkedRole) {
      return res.status(400).json({
        code: 400,
        message: 'Role already exists',
      });
    }

    const inputQuery = { label, color };
    const result = await roleService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 201,
      message: 'Role created',
    });
  },
  async put(req, res) {
    const { id } = req.params;
    const { label, color } = req.body;

    const inputQuery = { label, color };
    const result = await roleService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Role updated',
    });
  },
  async delete(req, res) {
    const { id } = req.params;
    const result = await roleService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Role deleted',
    });
  },

};
