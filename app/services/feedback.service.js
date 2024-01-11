const { feedback } = require('../models/index.mapper');

const textValue = 'feedback';

module.exports = {

  async getData(id) {
    try {
      const result = await feedback.findByPk(id);
      return result;
    } catch (error) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
  },
  async getAll() {
    const data = await feedback.findAll();
    if (!data) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    return data;
  },

  async create(inputQuery) {
    try {
      const result = await feedback.create(inputQuery);
      return {
        message: 'Merci pour votre feedback ! Je vais le lire attentivement et vous répondre au plus vite !',
        data: result,
      };
    } catch (error) {
      return {
        code: 500,
        message: 'Je n\'ai pas réussi à enregistrer votre feedback',
      };
    }
  },
  async update(id, inputQuery) {
    try {
      feedback.update(id, inputQuery);
      return {
        message: `${textValue} updated`,
      };
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not updated`,
      };
    }
  },
  async delete(id) {
    const getInfo = await feedback.getData(id);
    try {
      const result = await feedback.delete(getInfo.id);
      return result;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },
};
