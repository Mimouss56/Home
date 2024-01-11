const { job } = require('../models/index.mapper');

const textValue = 'job';

module.exports = {
  async getAll() {
    const find = await job.findAll();
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = find.map((value) => {
      const one = {
        id: value.id,
        title: value.title,
        date: {
          debut: value.date_started,
          fin: value.date_ended,
        },
        lieu: {
          ville: value.town,
          departement: value.postal_code,
        },
        ent: value.ent,
        description: value.description,
      };
      return one;
    });
    return returnValue;
  },

  async getData(id) {
    try {
      const findByID = await job.findByPk(id);
      const returnValue = {
        id: findByID.id,
        title: findByID.title,
        date: {
          debut: findByID.date_started,
          fin: findByID.date_ended,
        },
        lieu: {
          ville: findByID.town,
          departement: findByID.postal_code,
        },
        ent: findByID.ent,
        description: findByID.description,
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
      const valueCreated = await job.create(inputQuery);
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
      const valueUpdated = await job.update(id, inputQuery);
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
      const valueDeleted = await job.delete(id);
      return valueDeleted;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },
};
