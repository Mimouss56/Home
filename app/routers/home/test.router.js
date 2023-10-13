const router = require('express').Router();
const loginService = require('../../services/login.service');

router.get('/', loginService.getTokenNetatmo);

module.exports = router;
