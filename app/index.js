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
<<<<<<< HEAD
// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
=======

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
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe
});

// Decodage des request.body
app.use(express.json());

// Chargement des fichiers 'Médias'
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, './public')));
=======
app.use(express.static(path.join(__dirname, '../public')));
>>>>>>> 07764e19d3de1573d3072b5886d889345b9347fe

// Chargement Router
app.use(router);

// Lancement serveur
module.exports = app;
