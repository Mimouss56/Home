const { ent } = require('../models/index.mapper');

/**
 * @typedef {object} Ent - Description de l'entreprise
 * @property {integer} id - L'ID de l'entreprise
 * @property {string} name - Le nom de l'entreprise
 * @property {string} address - L'adresse de l'entreprise
 * @property {string} town - La ville de l'entreprise
 * @property {string} postalCode - Le code postal de l'entreprise
 * @property {string} urlImg - L'url de l'image de l'entreprise

 * @param {object} value details d'une entreprise
 * @returns
 */
const generateObject = async (value) => ({
  id: value.id,
  name: value.name,
  address: value.address,
  postalCode: value.postal_code,
  town: value.town,
  urlImg: value.url_img,
});
module.exports = {
  // Get Data
  async getData(id) {
    const jobByID = await ent.findByPk(id);
    if (!jobByID) {
      return {
        code: 404,
        message: 'Job not found',
      };
    }
    const returnValue = await generateObject(jobByID);
    return returnValue;
  },
  // Get All Data
  async getAllData() {
    const jobs = await ent.findAll();
    const returnValue = await Promise.all(jobs.map(generateObject));
    return returnValue;
  },

};
