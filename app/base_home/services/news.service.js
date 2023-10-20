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
        content: newsByID.content,
        image: newsByID.image,
        author: authorInfo,
        draft: newsByID.draft,
        created_at: newsByID.created_at,
        updated_at: newsByID.updated_at,
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

  async update(id, inputQuery) {
    try {
      const newsByID = await news.findByPk(id);
      if (!newsByID) {
        return {
          code: 404,
          message: 'News not found',
        };
      }
      await news.update(newsByID.id, inputQuery);
      return {
        code: 201,
        message: 'News updated',
      };
    } catch (error) {
      return {
        code: 500,
        message: 'News not updated',
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
      if (!newsByID) {
        return {
          code: 404,
          message: 'News not found',
        };
      }
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
