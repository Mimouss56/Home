const cantineService = require('../../services/ESA/cantine.service');

const getAll = async (req, res) => {
  const date = req.query.date || new Date().toISOString().split('T')[0];
  const students = await cantineService.getStudentsByDate(date);
  res.json(students);
};
const toggleCantinePresence = async (req, res) => {
  const { studentId } = req.params;
  // si presence de req.query on récupère la date sinon on récupère la date du jour
  const date = req.query.date || new Date().toISOString().split('T')[0];
  const isPresent = await cantineService.toggleChildPresence(studentId, date);
  if (isPresent.code) return res.status(isPresent.code).json(isPresent);
  return res.json({ isPresent });
};

module.exports = {
  toggleCantinePresence,
  getAll,
};
