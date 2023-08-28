/**
 * Formation
 * @typedef {object} Formation
 * @property {integer} id - ID
 * @property {string} title - Titre de la Formation
 * @property {DateJob} date - Date de début et de fin dans la formation
 * @property {Lieu} lieu - Lieu de la formation
 * @property {string} ent - Nom de la formation
 * @property {string} niveau - Niveau de la formation
 * @property {array<string>} competences - Liste des compétences acquises
*/

/**
 * PostSchool
 * @typedef {object} PostSchool
 * @property {string} ent - Nom de la formation
 * @property {string} title - Titre de la formation
 * @property {string} description - Description de la formation
 * @property {string} debut - Date de début dans la formation
 * @property {string} fin - Date de fin dans la formation
 * @property {string} ville - Ville de la formation
 * @property {integer} departement - Département de la formation
 */
// Routes for Job
/**
 * GET /job
 * @summary Récupère tous les formations
 * @tags School
 * @return {array<Formation>} 200
 * @return 500 - Erreur serveur
*/

/**
 * GET /job/@me
 * @summary Récupère tous les formations de l'utilisateur
 * @tags School
 * @security BearerAuth
 * @return {array<Job>} 200
 * @return 500 - Erreur serveur
*/

/**
 * POST /job/@me
 * @summary Ajoute une formation à l'utilisateur
 * @tags School
 * @security BearerAuth
 * @param {JobPost} request.body.required - La formation à ajouter
 * @return {Job} 200 - La formation ajouté
 * @return 500 - Erreur serveur
 */
