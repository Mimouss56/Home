const { checkRole, loggedAs } = require('./auth.middleware');

const validate = (schema, provider = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[provider]);
  if (error) {
    return res.status(401).json({
      message: error.details[0].message,
      details: error.details[0].message,
    });
  }
  req[provider] = value;
  return next();
};

const isLogged = (schema, provider) => ([
  loggedAs,
  validate(schema, provider),
]);

const isAdminPost = (schema, provider) => [
  loggedAs,
  checkRole(1),
  validate(schema, provider),
];

module.exports = {
  validate,
  isLogged,
  isAdminPost,
};
