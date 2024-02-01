const router = require('express').Router();
const { loggedAs } = require('../../../middlewares/auth.middleware');
const roleController = require('../controllers/role.controller');

/**
 * GET /api/home/role
 * @summary Récupère tous les rôles
 * @tags Role
 * @return {array<Role>} 200
 * @return 500 - Unexpected error
 * @security BearerAuth
 */
router.get('/', loggedAs, roleController.getAll);

module.exports = router;
