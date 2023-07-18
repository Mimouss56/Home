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

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // response to preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Decodage des request.body
app.use(express.json());

// Chargement des fichiers 'Médias'
app.use(express.static(path.join(__dirname, '../public')));

// Chargement Router
app.use(router);

// Lancement serveur
module.exports = app;
