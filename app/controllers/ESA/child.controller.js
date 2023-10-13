const ESAChildService = require("../../services/ESA/child.service");

module.exports = {
  async getAllChild(req, res) {
    try {
      const child = await ESAChildService.findall();
      res.status(200).json(child);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async create(req, res) {
    try {
      const child = await ESAChildService.create(req.body);
      res.status(201).json(child);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getOne(req, res) {
    try {
      const child = await Child.findById(req.params.id);
      res.status(200).json(child);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async delete(req, res) {
    try {
      const child = await Child.findByIdAndDelete(req.params.id);
      res.status(200).json(child);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
