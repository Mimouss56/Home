const options = {
  info: {
    version: "1.0.0",
    title: "Mimouss Home API",
    description: "Détails de l'API de Mimouss",
  },
  servers: [
    {
      url: 'http://localhost:{port}/{basePath}',
      description: 'Local server',
      variables: {
        port: {
          enum: [process.env.PORT, 3000],
          default: process.env.PORT
        },
        basePath: {
          default: 'api',
        },
        schemes: {
          enum: ['HTTP'],
          default: 'http',
        }
      },
    },
    {
      url: 'https://www.mimouss.fr/{basePath}',
      description: 'Production server',
      variables: {
        basePath: {
          default: 'api',
        },
        schemes: {
          enum: ['HTTPS'],
          default: 'HTTPS',
        }
      },
    },
  ],
  security: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    }
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: __dirname,
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/swagger-ui',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/swagger/docs',
  notRequiredAsNullable: false,
};

module.exports = options;