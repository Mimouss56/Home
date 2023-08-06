const { sanction, user } = require('../models/index.mapper');
const textValue = "sanction"
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat')
const isoWeek = require('dayjs/plugin/isoWeek')
dayjs.extend(advancedFormat)
dayjs.extend(isoWeek)

module.exports = {
  async getAll() {
    const data = await sanction.findAll();
    if (!data) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const findAll = await Promise.all(data.map(async (findOne) => {
      const findByID = await this.getData(findOne.id);
      return findByID;
    }));
    return findAll;
  },

  async getData(id) {
    try {
      const findByID = await sanction.findByPk(id);
      const author = await user.findByPk(findByID.author_id);
      const returnValue = {
        id: findByID.id,
        label: findByID.label,
        author: {
          id: author.id,
          username: author.username,
          email: author.email,
          role: author.role,
        },
        date: {
          year: findByID.created_at.getFullYear(),
          week: dayjs(findByID.created_at).isoWeek(),
          complete : dayjs(findByID.created_at).format('DD/MM/YYYY'),
        },
      };
      delete returnValue.author_id;
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
      const valueCreated = await sanction.create(inputQuery);
      return valueCreated;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not created`,
      };
    }
  },
  async update(id, inputQuery) {

    try {
      const valueUpdated = await sanction.update(id, inputQuery);
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
      const valueDeleted = await sanction.delete(id);
      return valueDeleted;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },
};
