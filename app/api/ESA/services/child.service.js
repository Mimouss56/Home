const { eSAChild } = require('../models/index.mapper');

module.exports = {
  async getData(id) {
    try {
      const childrenbyID = await eSAChild.findByPk(id);
      childrenbyID.parents = await eSAChild.getParents(id);
      return childrenbyID;
    } catch (error) {
      return {
        code: 404,
        message: 'Children not found',
      };
    }
  },

  async getAll() {
    const dataInfo = await eSAChild.findAll();
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

  async create(inputQuery) {
    const inputData = {
      first_name: inputQuery.firstName,
      last_name: inputQuery.lastName,
      classe: inputQuery.classe,
    };
    try {
      const childCreated = await eSAChild.create(inputData);
      return {
        code: 200,
        data: childCreated,
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  },

  async update(id, inputQuery) {
    const childByID = await eSAChild.findByPk(id);
    const inputData = {
      classe: inputQuery.classe || childByID.classe,
      first_name: inputQuery.firstName || childByID.first_name,
      last_name: inputQuery.lastName || childByID.last_name,
    };
    try {
      const childUpdated = await eSAChild.update(id, inputData);
      return {
        code: 200,
        data: childUpdated,
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  },
  async findByIdAndDelete(id) {
    try {
      const childDeleted = await eSAChild.delete(id);
      return {
        code: 200,
        data: childDeleted,
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  },
};
