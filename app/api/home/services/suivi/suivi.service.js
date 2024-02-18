const { ent } = require('../../models/index.mapper');
const entService = require('../ent.service');
const contactService = require('./contact.service');

const textValue = 'ent';

/**
 * @typedef {object} Suivi - Suivi de l'entreprise
 * @property {integer} id - L'ID de l'entreprise
 * @property {string} name - Le nom de l'entreprise
 * @property {string} address - L'adresse de l'entreprise
 * @property {string} town - La ville de l'entreprise
 * @property {string} postalCode - Le code postal de l'entreprise
 * @property {string} urlImg - L'url de l'image de l'entreprise
 * @property {array<Contact>} contact - Le contact de l'entreprise
 * @param {object} value
 * @returns
 */

const generateObject = async (value) => ({
  ...await entService.getData(value.id),
  contact: await contactService.getAllContactByEntId(value.id),
});

module.exports = {

  async getAllEnt() {
    const find = await ent.findAll();
    if (!find) {
      return [];
    }
    const returnValue = await Promise.all(find.map(generateObject));
    return returnValue;
  },

  async getEnt(id) {
    const find = await ent.findByPk(id);
    if (!find) {
      return {
        code: 404,
        message: `${textValue} not found`,
      };
    }
    const returnValue = await generateObject(find);
    return returnValue;
  },

  async create(inputQuery) {
    try {
      const valueCreated = await ent.create(inputQuery);
      const returnValue = await generateObject(valueCreated);
      return returnValue;
    } catch (error) {
      return {
        code: 500,
        message: `${textValue} not created`,
      };
    }
  },
};
