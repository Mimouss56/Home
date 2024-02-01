const path = require('path');

const options = {
  defaultModelsExpandDepth: -1,
  info: {
    version: '2.0.0',
    title: 'Home API',
    description: "Détails de l'API de Home",
    contact: {
      name: 'Matthieu Le Priol',
      url: 'https://www.mimouss.fr',
      email: 'lepriol.matthieu@gmail.com',
    },

  },
  name: 'Home',
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  baseDir: path.join(__dirname, '../'),
  explorer: true,
  exposeSwaggerUI: true,
  exposeApiDocs: true,
  swaggerUIPath: '/swagger-home',
  filePattern: [
    path.join(__dirname, '../routers/*.js'),
    path.join(__dirname, '../api/home/**/*.js'),
    // path.join(__dirname, '../swagger/docs/*.js'),
  ],
  swaggerUiOptions: {
    customSiteTitle: 'Swagger UI Mimouss API',
  },
  swaggerOptions: {
    defaultModelsExpandDepth: -1,
    defaultModelExpandDepth: -1,
  },
};
module.exports = options;
