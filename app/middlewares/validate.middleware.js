const userService = require('../services/user.service');
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

const isOwner = (schema, provider) => [
  ...isLogged(schema, provider),
  async (req, res, next) => {
    const { user } = req;
    const userInfo = await userService.getData(user.id);
    const projetInfo = await projetService.getData(req.params.id);

    if (userInfo.role.id === 3) return next();

    if (userInfo.id !== projetInfo.author.id) {
      return res.status(403).json({
        message: 'Pas les droits nécessaire',
      });
    }
    return next();
  },
];

module.exports = {
  validate,
  isLogged,
  isAdminPost,
  isOwner,
};
