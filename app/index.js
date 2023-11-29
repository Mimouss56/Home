const path = require('path');
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const expressSession = require('express-session');
const options = require('./swagger/option');
// const optionsHome = require('./swagger/home.swagger');
// const optionsOside = require('./swagger/oside.swagger');

require('dotenv').config();
const app = express();
const router = require('./routers');

// app.set('views', './app/views');

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

  // response to preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }

// Decodage des request.body
app.use(express.json());

// Chargement des fichiers 'Médias'
app.use(express.static(path.join(__dirname, '../public')));

// app.use((req, res, next) => {
//   // const expressSwagger = expressJSDocSwagger(app);
//   const { query } = req;
//   const primaryName = query['urls.primaryName'];
//   // console.log(primaryName);
//   let newOptions;
//   if (primaryName === 'Oside') {
//     newOptions = { ...options, ...optionsOside };
//   } else if (primaryName === 'Home') {
//     newOptions = { ...options, ...optionsHome };
//   }
//   // expressSwagger(newOptions);
//   next();
// });
// Swagger
expressJSDocSwagger(app)(options);

// Chargement Router
app.use(router);

// Lancement serveur
module.exports = app;
