const parentService = require('../services/parent.service');

module.exports = {
  async getAll(req, res) {
    try {
      const parents = await parentService.getAll();
      return res.json(parents);
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: error,
      });
    }
  },
  async getOne(req, res) {
    const { id } = req.params;
    try {
      const parent = await parentService.getData(id);
      return res.status(200).json({
        code: 200,
        data: parent,
      });
    } catch (error) {
      return res.status(404).json({
        code: 404,
        message: error,
      });
    }
  },
  async create(req, res) {
    const {
      firstName,
      lastName,
      email,
      street,
      town,
      zipCode,
      child,
    } = req.body;

    const inputData = {
      first_name: firstName,
      last_name: lastName,
      email,
      street,
      town,
      zipcode: zipCode,
      child,
    };
    try {
      const parentCreated = await parentService.create(inputData);
      const data = await parentService.getData(parentCreated.id);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: error,
      });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      street,
      town,
      zipCode,
      child,
    } = req.body;

    const inputData = {
      first_name: firstName,
      last_name: lastName,
      email,
      street,
      town,
      zipcode: zipCode,
      child,
    };
    try {
      const parentUpdated = await parentService.update(id, inputData);
      const data = await parentService.getData(parentUpdated.id);
      return res.json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: error,
      });
    }
  },

};
