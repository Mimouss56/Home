const Joi = require('joi');

const id = Joi.object({
  id: Joi.number().integer().required(),
});

const register = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])(?=.*[a-zA-Z]).{8,}$/).required(),
  passwordConfirm: Joi.ref('password'),
  first_name: Joi.string().optional().allow(''),
  last_name: Joi.string().optional().allow(''),
  //   github_login: Joi.string().required(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])(?=.*[a-zA-Z]).{8,}$/).required(),
});
const put = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?/])(?=.*[a-zA-Z]).{8,}$/).required(),
  passwordConfirm: Joi.ref('password'),
  first_name: Joi.string().optional().allow(''),
  last_name: Joi.string().optional().allow(''),
  bio: Joi.string().optional().allow(''),
  //   github_login: Joi.string().required(),
});

module.exports = {
  put, register, login, id,
};
