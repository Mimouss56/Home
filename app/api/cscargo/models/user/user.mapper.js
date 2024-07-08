/* eslint-disable no-tabs */
const CoreDatamapper = require('../../../../models/core.mapper');

/**
 * Table user_role
 * @property {number} id
 * @property {number} user_id related to user.id
 * @property {number} role_id related to roles.id
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * Table roles
 * @property {number} id
 * @property {string} name
 */

/**
 * Table user
 * @property {number} id
 * @property {string} username
 * @property {string} password
 * @property {string} email
 * @property {Data} created_at
 * @property {Data} updated_at
 */
module.exports = class User extends CoreDatamapper {
  tableName = 'user';

  userRole = 'user_role';

  roleTable = 'roles';

  async getUserRole(idUser) {
    const preparedQuery = {
      text: `
				SELECT r.name
				FROM "${this.tableName}" u
				JOIN "${this.userRole}" ur ON u.id = ur.user_id
				JOIN "${this.roleTable}" r ON ur.role_id = r.id
				WHERE u.id = $1				
				`,
      values: [idUser],
    };
    const result = await this.client.query(preparedQuery);
    if (!result.rows[0]) {
      return null;
    }
    return result.rows[0];
  }
};
