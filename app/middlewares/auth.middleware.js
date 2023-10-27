const jwt = require('jsonwebtoken');
const userService = require('../api/home/services/user.service');

const loggedAs = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }
  const [typetoken, token] = req.headers.authorization.split(' ');
  if (!token || typetoken !== 'Bearer') {
    return res.status(401).json({
      message: 'No Bearer provided',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // verifie si le token n'est pas expiré
    if (decoded.exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        message: 'Token expired',
      });
    }
    const userById = await userService.getData(decoded.id);
    req.user = userById;

    return next();
  } catch (error) {
    return res.status(401).json({
      statusCode: 401,
      message: 'You are not logged',
    });
  }
};

const checkRole = (minimumRole) => async (req, res, next) => {
  const { user } = req;
  const userInfo = await userService.getData(user.id);
  if (userInfo.role.id !== minimumRole) {
    return res.status(401).json({
      message: 'Pas les droits nécessaires',
    });
  }
  return next();
};
const isHimself = () => [
  loggedAs,
  async (req, res, next) => {
    const { user } = req;
    const userInfo = await userService.getData(user.id);

    if (userInfo.role.id === 1) return next(); // admin

    if (userInfo.id !== Number(req.params.id)) {
      return res.status(401).json({
        message: 'Pas les droit nécessaire',
      });
    }
    return next();
  },
];

const loggedESA = (req, res, next) => {
  loggedAs(req, res, async () => {
    const { user } = req;
    const userInfo = await userService.getData(user.id);

    if (userInfo.role.id === 1) return next(); // admin

    if (userInfo.role.id !== 3) {
      return res.status(401).json({
        message: 'Pas les droit nécessaire',
      });
    }
    return next();
  });
};

module.exports = {
  isHimself,
  checkRole,
  loggedAs,
  loggedESA,
};
