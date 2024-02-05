const { site } = require('../models/index.mapper');

const textValue = 'site';
const generateObject = async (value) => ({
  id: value.id,
  name: value.name,
  url: value.url,
  maintenance: value.maintenance,
  ban: value.ban,
  ban_at: value.ban_at,
  created_at: value.created_at,
  updated_at: value.updated_at,
});
module.exports = {
  async getData(id) {
    try {
      const result = await site.findByPk(id);
      const returnValue = await generateObject(result);
      return returnValue;
    } catch (error) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
  },
  async find(url) {
    try {
      const result = await site.findOne({
        where: { url },
      });
      return result;
    } catch (error) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
  },
  async getAll() {
    const find = await site.findAll();
    if (!find || find.length === 0) {
      return [];
    }
    const returnValue = await Promise.all(find.map(generateObject));
    return returnValue;
  },
  async create(inputQuery) {
    try {
      const result = await site.create(inputQuery);
      const returnValue = await generateObject(result);
      return returnValue;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not created`,
      };
    }
  },
  async update(id, inputQuery) {
    try {
      const result = await site.findByPk(id);
      const valueUpdated = await site.update(result.id, inputQuery);
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
      const result = await site.delete(id);
      return result;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },
};
