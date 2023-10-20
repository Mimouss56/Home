/* eslint-disable camelcase */

const textValue = 'sanction';
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');
const isoWeek = require('dayjs/plugin/isoWeek');
const { sanction, user } = require('../../models/index.mapper');

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

module.exports = {
  async getAll(id_child = false) {
    let data;
    if (id_child) {
      data = await sanction.findAll({ where: { id_child } });
    } else {
      data = await sanction.findAll();
    }
    // const data = await sanction.findAll({where});
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
    // trier par date.complete
    findAll.sort((a, b) => new Date(b.date.complete) - new Date(a.date.complete));

    return findAll;
  },

  async getData(id) {
    try {
      const findByID = await sanction.findByPk(id);
      const author = await user.findByPk(findByID.author_id);
      const child = await user.findByPk(findByID.id_child);
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
          complete: findByID.created_at,
        },
        child: {
          id: child.id,
          username: child.username,
        },
        warn: findByID.warn,
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
        message: `${textValue} not updated : ${error}}`,
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
