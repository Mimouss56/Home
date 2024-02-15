const CoreDatamapper = require('../core.mapper');

module.exports = class Visitor extends CoreDatamapper {
  tableName = 'stat_visitor';

  relationTable = 'stat_view';
};
