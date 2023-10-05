const { news, user, role } = require('../models/index.mapper');
// const userService = require('./user.service');

module.exports = {
  async getAll() {
    const dataInfo = await news.findAll();

    if (!dataInfo || dataInfo.length === 0) {
      return [];
    }

    // Map over dataInfo and get an array of promises
    const promises = dataInfo.map(
      // Use this.getData to get detailed info
      async (newsInfo) => this.getData(newsInfo.id),
    );

    // Await all promises to resolve
    const returnNews = await Promise.all(promises);

    return returnNews;
  },

  async getData(id) {
    try {
      const newsByID = await news.findByPk(id);
      if (!newsByID) {
        return {
          code: 404,
          message: 'News not found',
        };
      }
      const authorInfo = await user.findByPk(newsByID.id_author);
      const userRole = await role.findByPk(authorInfo.id_role);
      authorInfo.role = userRole;
      delete authorInfo.id_role;
      delete authorInfo.password;
      const returnValues = {
        id: newsByID.id,
        title: newsByID.title,
        description: newsByID.description,
        image: newsByID.image,
        author: authorInfo,
      };
      return returnValues;
    } catch (error) {
      return {
        code: 404,
        message: 'News not found',
      };
    }
  },
  async create(inputQuery) {
    try {
      const newsCreated = await news.create(inputQuery);
      return newsCreated;
    } catch (error) {
      return {
        code: 500,
        message: 'News not created',
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
    const newsByID = await this.getData(id);
    try {
      await news.delete(newsByID.id);
      return {
        message: 'News deleted',
      };
    } catch (error) {
      return {
        code: 500,
        message: 'News not deleted',
      };
    }
  },
};
