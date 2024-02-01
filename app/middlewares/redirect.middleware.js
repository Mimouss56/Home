const path = require('path');

const renderIndex = (req, res, next) => {
  const publicPath = path.resolve(__dirname, '../public');
  // Modification ici pour prendre en compte les sous-dossiers
  if (req.originalUrl.startsWith('/images')) {
    next();
  } else {
    // Modification ici pour servir index.html uniquement si le fichier n'est pas trouvé
    res.sendFile(path.join(publicPath, 'index.html'));
  }
};

module.exports = renderIndex;
