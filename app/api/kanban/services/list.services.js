const textValue = 'list';
const { list, card } = require('../models');

module.exports = {
  async getAll(idUser) {
    try {
      const findByIDUser = await list.findAll({
        where: {
          id_user: idUser,
        },
      });
      const findAll = await Promise.all(findByIDUser.map(async (findOne) => {
        const findByID = await this.getData(findOne.id);
        return findByID;
      }));
      // trier par date.complete
      findAll.sort((a, b) => b.position - b.position);

      return findAll;
    } catch (error) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
  },
  async getData(idList) {
    try {
      const findByID = await list.findByPk(idList);
      const cardsList = await card.findAll({
        where: {
          list_id: findByID.id,
        },
      });
      const returnValue = {
        id: findByID.id,
        name: findByID.name,
        position: findByID.position,
        cards: cardsList,
      };
      return returnValue;
    } catch (error) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
  },
  async create(data) {
    try {
      const newList = await list.create(data);
      return newList;
    } catch (error) {
      return {
        code: 500,
        message: `Error when you create ${textValue}`,
      };
    }
  },
  async update(idList, data) {
    const returnValue = await list.update(idList, data);
    return returnValue;
  },
  async delete(id) {
    try {
      const valueDeleted = await list.delete(id);
      return valueDeleted;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },

};
