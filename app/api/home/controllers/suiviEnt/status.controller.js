const statusService = require('../../services/suivi/status.service');

module.exports = {
  async getAllStatus(req, res) {
    const status = await statusService.getAllStatus();
    return res.status(200).json(status);
  },
  async getStatus(req, res) {
    const { id } = req.params;
    const status = await statusService.getStatusById(id);
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }
    return res.status(200).json(status);
  },
};
