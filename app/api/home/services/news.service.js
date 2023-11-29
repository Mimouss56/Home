const { news, user, role } = require('../models/index.mapper');
// const userService = require('./user.service');
const textValue = 'news';

const generateObject = async (value) => {
  const authorInfo = await user.findByPk(value.id_author);
  const userRole = await role.findByPk(authorInfo.id_role);
  authorInfo.role = userRole;
  delete authorInfo.id_role;
  delete authorInfo.password;

  return {
    id: value.id,
    title: value.title,
    content: value.content,
    image: value.image,
    author: authorInfo,
    draft: value.draft,
    created_at: value.created_at,
    updated_at: value.updated_at,
  };
};

module.exports = {
  async getAll() {
    const find = await news.findAll();
    if (!find || find.length === 0) {
      return [];
    }
    const returnValue = await Promise.all(find.map(generateObject));
    return returnValue;
  },

  async getData(id) {
    try {
      const newsByID = await news.findByPk(id);
      const returnValue = await generateObject(newsByID);
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
      const newsCreated = await news.create(inputQuery);
      const returnValue = await generateObject(newsCreated);
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
      const newsByID = await news.findByPk(id);
      const valueUpdated = await news.update(newsByID.id, inputQuery);
      return valueUpdated;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not updated`,
      };
    }
  },

  async addTags(id, tags) {
    try {
      const newsByID = await news.findByPk(id);
      if (!newsByID) {
        return {
          code: 404,
          message: 'News not found',
        };
      }
      const promises = tags.map(
        async (tag) => newsByID.addTag(tag),
      );
      await Promise.all(promises);
      return {
        code: 201,
        message: 'Tags added',
      };
    } catch (error) {
      return {
        code: 500,
        message: 'Tags not added',
      };
    }
  },

  async delete(id) {
    try {
      const newsByID = await news.findByPk(id);
      await news.delete(newsByID.id);
      return {
        message: 'News deleted',
      };
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not deleted`,
      };
    }
  },
};
