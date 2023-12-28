const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');
const uploadController = require('../../../controllers/upload.controller');
const { fileSchema } = require('../schemas/fileUpload.schema');
const { validate } = require('../../../middlewares/validate.middleware');
// on récupère le dossier du projet
const appDir = path.dirname(require.main.filename);

const upload = multer({ dest: `${appDir}/tmp` });

router.route('/')
  .post(validate(fileSchema, 'file'), upload.single('image'), uploadController.upload);

module.exports = router;
