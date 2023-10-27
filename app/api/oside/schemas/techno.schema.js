const Joi = require('joi');
const {
  label, color, id,
} = require('./global.schema');

const put = Joi.object({
  label,
  color,
});

const post = Joi.array().items(
  put,
);

module.exports = {
  post, put, id,
};
