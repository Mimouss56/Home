const express = require('express');

const router = express.Router();
const softSkillController = require('../controllers/softSkill.controller');
const { loggedAs } = require('../../../middlewares/auth.middleware');
const { validate } = require('../../../middlewares/validate.middleware');
const { skillPost } = require('../schemas/skill.schema');

router.route('/')
  /**
   * GET /api/home/skill
   * @summary Get all skills
   * @tags Skill
   * @return {array<Skill>} 200 - Skills list

   */
  .get(softSkillController.getAll)
  /**
   * POST /api/home/skill
   * @summary Create a new skill
   * @tags Skill
   * @param {Skill} request.body.required - Skill object
   * @return {Skill} 200 - Skill created
   * @return 400 - Invalid skill supplied
   * @return 500 - Unexpected error
   */
  .post(loggedAs, validate(skillPost), softSkillController.post);

module.exports = router;
