const CoreDatamapper = require('../core.mapper');

module.exports = class Page extends CoreDatamapper {
  tableName = 'stat_page';

  relationTable = 'view';
};
