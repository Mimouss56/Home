const renderIndex = (req, res, next) => {
  // Modification ici pour prendre en compte les sous-dossiers
  if (req.originalUrl.startsWith('/images')) {
    next();
  } else {
    // Modification ici pour servir index.html uniquement si le fichier n'est pas trouvé
    res.json('Welcome to the Mouss\'s API');
  }
};

module.exports = renderIndex;
