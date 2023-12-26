const Joi = require('joi');

const fileSchema = Joi.object({
  file: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    size: Joi.number().required(),
    buffer: Joi.binary().required(),
  }).required(),
});

module.exports = {
  fileSchema,
};
