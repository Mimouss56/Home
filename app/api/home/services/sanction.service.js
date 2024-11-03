/* eslint-disable camelcase */

const textValue = 'sanction';
const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');
const isoWeek = require('dayjs/plugin/isoWeek');
const { sanction, user } = require('../models/index.mapper');

dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);

/**
 * @typedef {object} Child
 * @property {integer} id - Child id
 * @property {string} username - Child username
 */

/**
 * @typedef {object} Sanction
 * @property {integer} id - Sanction ID
 * @property {string} label.required - Sanction label
 * @property {Author} author - Author
 * @property {integer} created_at - date de Creation
 * @property {Child} child - Child
 * @property {boolean} warn.required - Warn
 * @property {boolean} read - Read
 * @property {boolean} paid - Paid
 * @param {object} value
 * @returns
 */
const generateObject = async (value) => {
  const author = await user.base.findByPk(value.author_id);
  const child = await user.base.findByPk(value.id_child);
  const returnValue = {
    id: value.id,
    label: value.label,
    author: {
      id: author.id,
      username: author.username,
      email: author.email,
      role: author.role,
    },
    created_at: value.created_at,
    child: {
      id: child.id,
      username: child.username,
    },
    warn: value.warn,
    read: value.read,
    paid: value.paid,
  };
  return returnValue;
};

module.exports = {
  async getAll(id_child = false) {
    const data = id_child
      ? await sanction.findAll({ where: { id_child } })
      : await sanction.findAll();
    if (!data) return [];
    const returnValue = await Promise.all(data.map(generateObject));
    returnValue.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return returnValue;
  },

  async getData(id) {
    try {
      const findByID = await sanction.findByPk(id);
      const returnValue = await generateObject(findByID);
      return returnValue;
    } catch (error) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
  },
  async create(inputQuery) {
    const valueCreated = await sanction.create(inputQuery);
    const returnValue = await generateObject(valueCreated);
    return returnValue;

    // try {
    //   const valueCreated = await sanction.create(inputQuery);
    //   const returnValue = await generateObject(valueCreated);
    //   return returnValue;
    // } catch (error) {
    //   return {
    //     code: 500,
    //     message: `${textValue} not created`,
    //   };
    // }
  },
  async update(id, inputQuery) {
    try {
      const valueUpdated = await sanction.update(id, inputQuery);
      const returnValue = await generateObject(valueUpdated);
      return returnValue;
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

  async read(id) {
    try {
      const valueRead = await sanction.update(id, { read: true });
      return valueRead;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not read`,
      };
    }
  },
  async paid(id, paid) {
    try {
      const valuePaid = await sanction.update(id, { paid });
      return valuePaid;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not paid`,
      };
    }
  },
};
