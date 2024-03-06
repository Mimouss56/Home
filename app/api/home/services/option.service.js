const { option } = require('../models/index.mapper');

const textValue = 'option';
module.exports = {
  getAll: async () => {
    const options = await option.findAll();
    return options;
  },
  get: async (object) => {
    const options = await option.findAll(object);
    return options;
  },
  getOne: async (query) => {
    const options = await option.findOne({
      where: {
        name: query,
      },
    });
    return options;
  },
  getBotInfo: async (nameBot) => {
    const bot = await option.findOne({
      where: {
        name: nameBot,
      },
    });
    const botClientid = await option.findOne({
      where: {
        name: `${nameBot}ClientID`,
      },
    });
    const returnValue = {
      name: bot.name,
      token: bot.value,
      clientID: botClientid.value,
    };

    return returnValue;
  },
  create: async (body) => {
    try {
      const options = await option.create(body);
      return options;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not created`,
        error,
      };
    }
  },
  update: async (id, body) => {
    try {
      const optionByID = await option.findByPk(id);

      await option.update(optionByID.id, body);
      return {
        code: 201,
        message: `${textValue} updated`,
      };
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not updated`,
        error,
      };
    }
  },
  async delete(id) {
    try {
      const newsByID = await option.findByPk(id);

      await option.delete(newsByID.id);
      return {
        message: `${textValue} deleted`,
      };
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
        error,
      };
    }
  },
  async close() {
    await option.close();
  },
};
