const express = require('express');
require('dotenv').config();

const app = express();
const expressSession = require('express-session');
const path = require('path');
const router = require('./routers');

app.set('views', './app/views');

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: process.env.CLIENT_SECRET,
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60), // ça fait une heure
  },
}));
// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Decodage des request.body
app.use(express.json());

// Chargement des fichiers 'Médias'
app.use(express.static(path.join(__dirname, './public')));

// Chargement Router
app.use(router);

// Lancement serveur
module.exports = app;
