const CoreDatamapper = require('../../../../models/core.mapper');

module.exports = class INfos extends CoreDatamapper {
  tableName = 'user_infos';

  relationTable = 'user';
};
