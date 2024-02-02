const CoreDatamapper = require('../../../models/core.mapper');

module.exports = class Option extends CoreDatamapper {
  tableName = 'options';
};

// /**
//  * @typedef {object} DataOption - Option d'un utilisateur
//  * @property {integer} id - L'ID de l'option
//  * @property {integer} id_user - L'ID de l'utilisateur
//  * @property {boolean} child - Un enfant ?
//  * @property {boolean} family - De la famille ?
//  * @property {integer} id_role - L'ID du rôle
//  */
