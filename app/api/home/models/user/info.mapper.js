const CoreDatamapper = require('../../../../models/core.mapper');

module.exports = class Infos extends CoreDatamapper {
  tableName = 'user_infos';

  relationTable = 'user';

  async updateInfos(id, inputData) {
    // on transforme l'obejt en array
    const values = [
      inputData.prez,
      inputData.phone,
      inputData.address,
      inputData.linkedin,
      inputData.github,
      inputData.website,
      id,
    ];
    const query = {
      text: `
      UPDATE ${this.tableName}
      SET prez = $1, phone =$2, address = $3, linkedin = $4, github = $5, website = $6
      WHERE user_id = $7`,
      values,
    };
    await this.client.query(query);
  }
};
