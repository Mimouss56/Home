const { news } = require('../models/index.mapper');
const userService = require('./user.service');

const textValue = 'news';

/**
 * @typedef {object} News - Description de la news
 * @property {integer} id - L'ID de la news
 * @property {string} title - Le titre de la news
 * @property {string} content - Le contenu de la news
 * @property {Author} author - L'auteur de la news
 * @property {boolean} draft - La news est-elle un brouillon ?
 * @property {string} created_at - Date de création
 * @property {string} updated_at - Date de modification
 * @param {object} value
 * @returns
 */

/**
 * Author
 * @typedef {object} Author
 * @property {integer} id - L'ID de l'auteur
 * @property {string} username - Le nom d'utilisateur de l'auteur
 * @property {string} email - L'email de l'auteur
 * @property {string} last_name - Le nom de famille de l'auteur
 * @property {string} first_name - Le prénom de l'auteur
 * @property {Avatar} avatar - L'avatar de l'auteur
 */
const generateObject = async (value) => {
  const authorInfo = await userService.getData(value.id_author);
  const author = {
    id: authorInfo.id,
    username: authorInfo.username,
    email: authorInfo.email,
    last_name: authorInfo.last_name,
    first_name: authorInfo.first_name,
    avatar: authorInfo.avatar,
  };

  return {
    id: value.id,
    title: value.title,
    content: value.content,
    image: value.image,
    author,
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
