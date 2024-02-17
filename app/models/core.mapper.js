module.exports = class CoreDatamapper {
  tableName;

  constructor(client) {
    this.client = client;
  }

  async findByPk(id) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.tableName}" WHERE id = $1`,
      values: [id],
    };

    const result = await this.client.query(preparedQuery);

    if (!result.rows[0]) {
      return null;
    }

    return result.rows[0];
  }

  async findAll(object = false) {
    // Include WHERE OBJECT dans requete puis return
    if (object.where) {
      const fields = [];
      const placeholders = [];
      const values = [];
      let indexPlaceholder = 1;

      Object.entries(object.where).forEach(([prop, value]) => {
        fields.push(`"${prop}"`);
        placeholders.push(`$${indexPlaceholder}`);
        indexPlaceholder += 1;
        values.push(value);
      });
      const where = `WHERE ${fields} = ${placeholders}`;
      const sql = `SELECT * FROM "${this.tableName}" ${where}`;
      const result = await this.client.query(sql, values);
      return result.rows;
    }

    // Include INCLUDE OBJECT dasn requete puis return
    if (object.include) {
      const fields = [];
      const placeholders = [];
      const values = [];
      let indexPlaceholder = 1;

      Object.entries(object.include).forEach(([prop, value]) => {
        fields.push(`"${prop}"`);
        placeholders.push(`$${indexPlaceholder}`);
        indexPlaceholder += 1;
        values.push(value);
      });
      const where = `WHERE ${fields} = ${placeholders}`;
      const result = await this.client.query(`SELECT * FROM "${this.tableName}" ${where}`, values);
      return result.rows;
    }

    const result = await this.client.query(`SELECT * FROM "${this.tableName}"`);

    return result.rows;
  }

  /**
     * Permet de récupérer l'ensemble des enregistrement d'une table ou une liste d'enregistrement
     * @return {array<object>} une liste d'enregistrements
     * @param {object} object
     * @param {object} object.where
     * @param {object} object.include
*/
  async findOne(object) {
    if (object.where) {
      const fields = [];
      const placeholders = [];
      const values = [];
      let indexPlaceholder = 1;

      Object.entries(object.where).forEach(([prop, value]) => {
        fields.push(`"${prop}"`);
        placeholders.push(`$${indexPlaceholder}`);
        indexPlaceholder += 1;
        values.push(value);
      });

      const whereClause = fields.map((field, index) => `${field} = ${placeholders[index]}`).join(' AND ');
      const preparedQuery = {
        text: `SELECT * FROM "${this.tableName}" WHERE ${whereClause}`,
        values,
      };
      const result = await this.client.query(preparedQuery);

      return result.rows[0];
    }
    const result = await this.client.query(`SELECT * FROM "${this.tableName}"`);
    return result.rows[0];
  }

  /**
         * Insertion de données dans la table
         * @param {object} inputData données à insérer dans la table
         * @returns {object} l'enregistrement créé
         */
  async create(inputData) {
    const fields = [];
    const placeholders = [];
    const values = [];
    let indexPlaceholder = 1;

    Object.entries(inputData).forEach(([prop, value]) => {
      fields.push(`"${prop}"`);
      placeholders.push(`$${indexPlaceholder}`);
      indexPlaceholder += 1;
      values.push(value);
    });

    const preparedQuery = {
      text: `
            INSERT INTO "${this.tableName}"
            (${fields})
            VALUES (${placeholders})
            RETURNING *
          `,
      values,
    };
    const result = await this.client.query(preparedQuery);
    const row = result.rows[0];

    return row;
  }

  async findOrCreate(inputData) {
    // find if the record exists
    const search = await this.findOne({ where: inputData });
    if (search) return search;
    const result = await this.create(inputData);
    return result;
  }

  /**
         * Modification de données dans la table
         * @param {object} param0 données à mettre à jour dans la table comprenant également
         * l'identifiant de l'enregistrement
         * @returns {object} l'enregistrement mis à jour
         */
  async update(id, inputData) {
    const fieldsAndPlaceholders = [];
    let indexPlaceholder = 1;
    const values = [];

    // Check if the column "updated_at" exists
    const reqUpdateColumn = await this.client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = $1
      AND column_name = 'updated_at';
    `, [this.tableName]);

    const updateColumnExists = reqUpdateColumn.rows.length > 0;
    const updateColumn = updateColumnExists ? 'updated_at = now()' : '';
    Object.entries(inputData).forEach(([prop, value]) => {
      fieldsAndPlaceholders.push(`"${prop}" = $${indexPlaceholder}`);
      indexPlaceholder += 1;
      values.push(value);
    });

    values.push(id);

    const preparedQuery = {
      text: `
            UPDATE "${this.tableName}" SET
            ${fieldsAndPlaceholders}
            ${updateColumn ? ',' : ''}
            ${updateColumn}
            WHERE id = $${indexPlaceholder}
            RETURNING *
          `,
      values,
    };

    const result = await this.client.query(preparedQuery);
    const row = result.rows[0];
    return row;
  }

  async delete(id) {
    const result = await this.client.query(`DELETE FROM "${this.tableName}" WHERE id = $1`, [id]);
    return result.rowCount;
  }
};
