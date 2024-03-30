const express = require('express');

const router = express.Router();
const hardSkillController = require('../controllers/hardSkill.controller');
const { loggedAs } = require('../../../middlewares/auth.middleware');
const { validate } = require('../../../middlewares/validate.middleware');
const { skillPost } = require('../schemas/skill.schema');

router.route('/')
  /**
   * GET /api/home/hardskill
   * @summary Get all skills
   * @tags Skill
   * @return {array<HardSkill>} 200 - Skills list

   */
  .get(hardSkillController.getAll)
  /**
   * POST /api/home/hardskill
   * @summary Create a new skill
   * @tags Skill
   * @param {HardSkill} request.body.required - Skill object
   * @return {HardSkill} 200 - Skill created
   * @return 400 - Invalid skill supplied
   * @return 500 - Unexpected error
   */
  .post(loggedAs, validate(skillPost), hardSkillController.post);

module.exports = router;
