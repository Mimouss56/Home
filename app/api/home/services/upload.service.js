const fs = require('fs');
const path = require('path');
const { upload } = require('../../../models/index.mapper');

module.exports = {
  async create(inputQuery) {
    // on récupère la date du jour pour créer des dossiers par année et par mois et par jour
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const appDir = path.dirname(require.main.filename);
    let fileName = inputQuery.originalname;

    const movedPath = `${appDir}/app/public/images/${year}/${month + 1}/${day}`;
    // on créee le dossier images s'il n'existe pas en fonction de la date du jour
    if (!fs.existsSync(movedPath)) {
      fs.mkdirSync(movedPath, { recursive: true });
    }
    // on verifie sur le fichier existe déjà pour éviter les doublons et on ajoute _1 ou _2 etc...
    if (fs.existsSync(`${movedPath}/${inputQuery.originalname.replace(/ /g, '_')}`)) {
      let i = 1;
      while (fs.existsSync(`${movedPath}/${inputQuery.originalname.replace(/ /g, '_').replace('.', `_${i}.`)}`)) {
        i += 1;
      }
      fileName = inputQuery.originalname.replace('.', `_${i}.`);
    }

    // on déplace le fichier dans le dossier images
    fs.rename(inputQuery.path, `${movedPath}/${inputQuery.originalname.replace(/ /g, '_')}`, (err) => {
      if (err) throw err;
      return {
        code: 501,
        message: 'file not moved',
      };
    });
    const returnPath = `${year}/${month + 1}/${day}/${inputQuery.originalname.replace(/ /g, '_')}`;
    const inputData = {
      name: fileName,
      path: returnPath,
    };
    // importation des infos dans la bdd
    const result = await upload.create(inputData);
    if (result.code) return result;
    // on retourne le chemin du fichier
    return result;
  },
};
