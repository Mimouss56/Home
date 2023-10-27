const { eSAParent } = require('../models/index.mapper');

module.exports = {

  async getData(idParent) {
    try {
      const parentByID = await eSAParent.findByPk(idParent);
      const returnValue = {
        id: parentByID.id,
        firstName: parentByID.first_name,
        lastName: parentByID.last_name,
        email: parentByID.email,
        street: parentByID.street,
        town: parentByID.town,
        zipcode: parentByID.zipcode,
        child: await eSAParent.getChild(parentByID.id),
      };

      return returnValue;
    } catch (error) {
      return {
        code: 404,
        message: 'Parent not found',
      };
    }
  },
  async getAll() {
    const dataInfo = await eSAParent.findAll();
    if (!dataInfo || dataInfo.length === 0) {
      return [];
    }
    const promises = dataInfo.map(
      // Use this.getData to get detailed info
      async (newsInfo) => this.getData(newsInfo.id),
    );
    const returnNews = await Promise.all(promises);
    return returnNews;
  },

  async create(inputQuery) {
    const inputData = {
      first_name: inputQuery.first_name,
      last_name: inputQuery.last_name,
    };
    if (inputQuery.email) inputData.email = inputQuery.email;
    if (inputQuery.street) {
      inputData.street = inputQuery.street;
      inputData.town = inputQuery.town;
      inputData.zipcode = inputQuery.zipcode;
    }
    try {
      const parentCreated = await eSAParent.create(inputData);
      inputQuery.child.forEach(async (childId) => {
        await eSAParent.addChild(parentCreated.id, childId);
      });
      return parentCreated;
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  },

  async update(id, inputQuery) {
    const parentByID = await eSAParent.findByPk(id);
    const inputData = {
      first_name: inputQuery.first_name || parentByID.first_name,
      last_name: inputQuery.last_name || parentByID.last_name,
    };
    if (inputQuery.email) inputData.email = inputQuery.email;
    if (inputQuery.street) {
      inputData.street = inputQuery.street;
      inputData.town = inputQuery.town;
      inputData.zipcode = inputQuery.zipcode;
    }
    try {
      const parentUpdated = await eSAParent.update(id, inputData);
      inputQuery.child.forEach(async (childId) => {
        await eSAParent.addChild(parentUpdated.id, childId);
      });
      return parentUpdated;
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  },
};
