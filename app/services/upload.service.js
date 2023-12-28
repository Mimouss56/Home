const fs = require('fs');
const path = require('path');

module.exports = {
  async create(inputQuery) {
    // on récupère la date du jour pour créer des dossiers par année et par mois et par jour
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const appDir = path.dirname(require.main.filename);

    const movedPath = `${appDir}\\src\\assets\\images\\${year}\\${month}\\${day}`;
    // on créee le dossier images s'il n'existe pas en fonction de la date du jour
    if (!fs.existsSync(movedPath)) {
      fs.mkdirSync(movedPath, { recursive: true });
    }
    // on déplace le fichier dans le dossier images
    fs.rename(inputQuery.path, `${movedPath}\\${inputQuery.originalname.replace(/ /g, '_')}`, (err) => {
      if (err) throw err;
      return {
        code: 501,
        message: 'file not moved',
      };
    });
    const returnPath = `${year}/${month}/${day}/${inputQuery.originalname.replace(/ /g, '_')}`;
    // on retourne le chemin du fichier
    return returnPath;
  },
};
/*
      fieldname: 'image',
  originalname: 'IMG_20210906_111137.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: '../../src/images',
  filename: 'e28bb7de7ce32da695ba6aa684746e65',
  path: '..\\..\\src\\images\\e28bb7de7ce32da695ba6aa684746e65',
  size: 2518498
 */
