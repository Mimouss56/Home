const path = require('path');
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const expressSession = require('express-session');
const options = require('./swagger/option');
require('dotenv').config();

const app = express();
const router = require('./routers');

// Middleware pour la gestion de sessions
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.CLIENT_SECRET,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // Une heure
    },
  }),
);

// Middleware pour permettre les requêtes CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // Réponse à une requête preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware pour le décodage des requêtes body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir des fichiers statiques depuis le répertoire app/public/images
const publicImagesPath = path.join(__dirname, 'public');
app.use('/images', express.static(path.join(publicImagesPath, 'images')));
// Middleware pour servir des fichiers statiques depuis le répertoire public du niveau supérieur
app.use(express.static(path.join(__dirname, '../public')));
// Middleware pour Swagger
expressJSDocSwagger(app)(options);

// Middleware Router
app.use(router);

module.exports = app;
