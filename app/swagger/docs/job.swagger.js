/**
 * Un job
 * @typedef {object} Job
 * @property {integer} id - ID
 * @property {string} title - Titre de l'emploi
 * @property {DateJob} date - Date de début et de fin dans l'entreprise
 * @property {Lieu} lieu - Lieu de l'entreprise
 * @property {string} ent - Nom de l'entreprise
 * @property {string} description - Description de l'emploi
 * @property {array<Skill>} competences - Liste des compétences acquises
*/

// Routes for Job
/**
 * GET /job
 * @summary Récupère tous les emplois
 * @tags Job
 * @link /job
 * @return {array<Job>} 200
 * @return {Error} 404
 * @return {Error} 500
*/

/**
 * GET /job/@me
 * @summary Récupère tous les emplois de l'utilisateur
 * @tags Job
 * @security BearerAuth
 * @return {array<Job>} 200
 * @return {Error} 404
 * @return {Error} 500
 * @return {Error} 401
*/

