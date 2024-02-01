const path = require('path');
const express = require('express');
const expressSession = require('express-session');

const expressJSDocSwagger = require('express-jsdoc-swagger');
// const options = require('./swagger/option');
const optionsHome = require('./swagger/home.swagger');
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
app.use(require('./middlewares/cors.middleware'));

// Middleware pour le décodage des requêtes body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware pour servir des fichiers statiques depuis le répertoire app/public/images
app.use('/images', express.static(path.join(__dirname, '../app/public/images')));
// Middleware pour servir des fichiers statiques depuis le répertoire public du niveau supérieur
app.use(express.static(path.join(__dirname, '../public')));

// Middleware pour Swagger
// expressJSDocSwagger(app)(options);
expressJSDocSwagger(app)(optionsHome);

// Middleware Router
app.use(router);

module.exports = app;
