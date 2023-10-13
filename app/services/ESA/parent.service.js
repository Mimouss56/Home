const { eSAParent } = require('../../models/ESA/index.mapper');

module.exports = {

  async getData(idParent) {
    try {
      const parentByID = await eSAParent.findByPk(idParent);
      parentByID.child = await eSAParent.getChild(parentByID.id);

      return parentByID;
    } catch (error) {
      return {
        code: 404,
        message: 'Parent not found',
      };
    }
  },
  async create(inputQuery) {
    const inputData = {
      first_name: inputQuery.first_name,
      last_name: inputQuery.last_name,
      email: inputQuery.email,
    };
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
};
