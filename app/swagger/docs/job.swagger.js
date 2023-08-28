/**
 * Un job
 * @typedef {object} Job
 * @property {integer} id - ID
 * @property {string} title - Titre de l'emploi
 * @property {DateJob} date - Date de début et de fin dans l'entreprise
 * @property {Lieu} lieu - Lieu de l'entreprise
 * @property {string} ent - Nom de l'entreprise
 * @property {string} description - Description de l'emploi
 * @property {array<string>} competences - Liste des compétences acquises
*/

/**
 * PostJob
 * @typedef {object} JobPost
 * @property {string} ent - Nom de l'entreprise
 * @property {string} title - Titre de l'emploi
 * @property {string} description - Description de l'emploi
 * @property {string} debut - Date de début dans l'entreprise
 * @property {string} fin - Date de fin dans l'entreprise
 * @property {string} ville - Ville de l'entreprise
 * @property {integer} departement - Département de l'entreprise
 */
// Routes for Job
/**
 * GET /job
 * @summary Récupère tous les emplois
 * @tags Job
 * @link /job
 * @return {array<Job>} 200
 * @return 500 - Erreur serveur
*/

/**
 * GET /job/@me
 * @summary Récupère tous les emplois de l'utilisateur
 * @tags Job
 * @security BearerAuth
 * @return {array<Job>} 200
 * @return 500 - Erreur serveur
*/

/**
 * POST /job/@me
 * @summary Ajoute un emploi à l'utilisateur
 * @tags Job
 * @security BearerAuth
 * @param {JobPost} request.body.required - L'emploi à ajouter
 * @return {Job} 200 - L'emploi ajouté
 * @return 500 - Erreur serveur
 */
