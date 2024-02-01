const { feedback } = require('../models/index.mapper');

const textValue = 'feedback';

/**
 * @typedef {object} Feedback - Feedback
 * @property {integer} id - L'ID du feedback
 * @property {string} message - Le message du feedback
 * @property {string} name - Le nom de l'utilisateur du feedback
 * @property {string} email - L'email de l'utilisateur du feedback
 * @property {string} path - Le chemin de la page du feedback
 * @property {boolean} draft - Le brouillon du feedback
 * @property {boolean} read - Le lu du feedback
 * @property {string} createdAt - La date de création du feedback
 */
const generateByDefault = async (data) => ({
  id: data.id,
  message: data.message,
  name: data.name,
  email: data.email,
  path: data.path,
  draft: data.draft,
  read: data.read,
  createdAt: data.createdAt,
});

module.exports = {
  async getAll() {
    const data = await feedback.findAll();
    if (!data) return [];
    // attention a la promise
    const result = await Promise.all(
      data.map(async (item) => {
        const oneUser = await generateByDefault(item);
        return oneUser;
      }),
    );
    return result;
  },

  async create(inputQuery) {
    try {
      const result = await feedback.create(inputQuery);
      const data = generateByDefault(result);
      return {
        message: 'Merci pour votre feedback ! Je vais le lire attentivement et vous répondre au plus vite !',
        data,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'Je n\'ai pas réussi à enregistrer votre feedback',
      };
    }
  },

  async draft(id) {
    const getInfo = await feedback.getData(id);
    try {
      const result = await feedback.update(getInfo.id, { draft: !getInfo.draft });
      return result;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not updated`,
      };
    }
  },

  async read(id) {
    const getInfo = await feedback.getData(id);
    try {
      const result = await feedback.update(getInfo.id, { read: true });
      return result;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not updated`,
      };
    }
  },
};
