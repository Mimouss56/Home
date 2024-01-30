const router = require('express').Router();
const feedbackController = require('../controllers/feedback.controller');

router.get('/', feedbackController.getAll);
router.post('/', feedbackController.post);
router.put('/:id', feedbackController.put);
router.delete('/:id', feedbackController.delete);
router.put('/:id/read', feedbackController.read);
module.exports = router;
