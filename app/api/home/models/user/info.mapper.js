const CoreDatamapper = require('../../../../models/core.mapper');

module.exports = class Infos extends CoreDatamapper {
  tableName = 'user_infos';

  relationTable = 'user';
};
