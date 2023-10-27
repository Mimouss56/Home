const Joi = require('joi');
const { id } = require('./global.schema');

// const id = Joi.number().integer().required();
// check if technoProjet is an array of number
const technoProjet = Joi.array().items(
  Joi.number().integer(),
).optional();

const post = Joi.object({
  title: Joi.string().required().min(3).max(30),
  content: Joi.string().required().min(3),
  status: Joi.string().required().min(3).max(30),
  owner_id: Joi.number().integer().optional(),
  technoProjet,
});

const put = Joi.object({
  title: Joi.string().required().min(3).max(30),
  content: Joi.string().required().min(3),
  status: Joi.string().required().min(3).max(30),
  technoProjet,
});
const content = Joi.object({
  content: Joi.string().required().min(3),
});
module.exports = {
  post,
  put,
  id,
  content,
};
