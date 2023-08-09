
console.log(process.env.NODE_ENV);
const options = {
  info: {
    version: "1.0.0",
    title: "Mimouss Home API",
    description: "Détails de l'API de Mimouss",
  },

  servers: [
    {
      url: 'https://www.mimouss.fr/api',
      description: 'Production server',
      // variables: {
      //   port: {
      //     enum: [process.env.PORT, 3000],
      //     default: process.env.PORT
      //   },
      //   basePath: {
      //     default: 'api',
      //   },
      // },
    },
  ],
  security: {
    BearerAuth: {
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

if (process.env.NODE_ENV === 'dev') {
  const devoption =
  {
    url: `http://localhost:${process.env.PORT}/api`,
    description: 'Local server',
  };
  options.servers.push(devoption);
}
module.exports = options;