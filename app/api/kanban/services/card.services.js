const textValue = 'card';
const { list, card } = require('../models');

module.exports = {
  async getData(idCard) {
    try {
      const findByID = await card.findByPk(idCard);
      const listCard = await list.findByPk(findByID.list_id);
      const returnValue = {
        id: findByID.id,
        content: findByID.content,
        position: findByID.position,
        color: findByID.color,
        list_id: findByID.list_id,
        list_name: listCard.name,
      };
      return returnValue;
    } catch (error) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
  },
  async create(inputQuery) {
    try {
      const result = await card.create(inputQuery);
      return result;
    } catch (error) {
      return {
        code: 500,
        message: `Error when you create ${textValue}`,
      };
    }
  },
  async update(id, inputQuery) {
    console.log(inputQuery);
    console.log(id);
    try {
      const valueUpdated = await card.update(id, inputQuery);
      return valueUpdated;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not updated`,
      };
    }
  },
  async delete(id) {
    try {
      const valueDeleted = await card.delete(id);
      return valueDeleted;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },

};
