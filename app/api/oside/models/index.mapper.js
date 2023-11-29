const client = require('./pg.client');

const Projet = require('./projet.mapper');
const Techno = require('./techno.mapper');
const Role = require('./role.mapper');
const User = require('./user.mapper');
const Comment = require('./comment.mapper');
const MemberTechno = require('./user.techno.mapper');
const MemberProjet = require('./user.projet.mapper');
const TechnoProjet = require('./techno.projet.mapper');
// const MemberRole = require('./user.role.mapper');

// On en profite pour ce servir de l'instanciation pour injecter le client de connexion à la BDD aux
// différents datamapper. Et on exporte le tout !

module.exports = {
  projet: new Projet(client),
  techno: new Techno(client),
  role: new Role(client),
  user: new User(client),
  comment: new Comment(client),
  memberTechno: new MemberTechno(client),
  memberProjet: new MemberProjet(client),
  technoProjet: new TechnoProjet(client),
//   MemberRole: new MemberRole(client),
};
