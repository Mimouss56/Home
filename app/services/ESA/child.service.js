const { eSAChild } = require('../../models/ESA/index.mapper');

module.exports = {
  async getData(id) {
    try {
      const childrenbyID = await eSAChild.findByPk(id);
      childrenbyID.parents = await eSAChild.getParents(id);
      return {
        code: 200,
        data: childrenbyID,
      };
    } catch (error) {
      return {
        code: 404,
        message: 'Children not found',
      };
    }
  },

  async getAllData() {
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
      class: inputQuery.classe,
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
};
