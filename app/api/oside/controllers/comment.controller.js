const commentService = require('../services/comment.service');

module.exports = {
  async get(req, res) {
    const { id } = req.params;
    const dataComment = await commentService.getData(id);
    res.json(dataComment);
  },

  async getAll(_, res) {
    const AllComment = await commentService.getAll();
    res.json(AllComment);
  },

  // Signalement d'un commentaire
  async flag(req, res) {
    const { id } = req.params;
    const commentByID = await commentService.getData(id);
    if (commentByID.code) return res.status(commentByID.code).json(commentByID);

    const { user } = req;
    const result = await commentService.flag(commentByID.id, user.id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({ message: 'Commentaire signalé' });
  },
  // Suppression d'un commentaire signalé
  async deleteFlagged(req, res) {
    const { id } = req.params;
    const commentByID = await commentService.getData(id);
    if (commentByID.code) return res.status(commentByID.code).json(commentByID);

    const { user } = req;
    const result = await commentService.delete(commentByID.id, user.id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({ message: 'Commentaire supprimé' });
  },

  // async post(req, res) {
  //   const inputQuery = {
  //     content: req.body.content,
  //     status: req.body.status,
  //     owner_id: req.body.owner_id,
  //   };
  //   const result = await projetService.post(inputQuery);
  //   if (result.code) return res.status(result.code).json(result);

  //   MAJ de la liste des techno_projet
  //   if (req.body.technoProjet) await datamappers.projet.add(result.id, req.body.technoProjet);

  //   return res.json({
  //     message: 'Projet créé',
  //     result,
  //   });
  // },

  //   async put(req, res) {
  //     const { id } = req.params;
  //     const projet = await projetService.getData(id);
  //     if (projet.code) return res.status(projet.code).json(projet);

  //     const inputQuery = {
  //       title: req.body.title || projet.title,
  //       content: req.body.content || projet.content,
  //       status: req.body.status || projet.status,
  //     };

  //     const result = await projetService.update(id, inputQuery);
  //     if (result.code) return res.status(result.code).json(result);

  //     const { technoProjet } = req.body;
  //     // MAJ de la liste des techno_projet avec en 1er lieu la suppression
  //     if (technoProjet) await datamappers.projet.add(result.id, technoProjet);
  //     // Recupère les nouvelles données
  //     const dataProjet = await projetService.getData(result.id);
  //     return res.json({
  //       message: 'Projet mis à jour',
  //       result: dataProjet,
  //     });
  //   },

  //   async delete(req, res) {
  //     // const { user } = req;
  //     const { id } = req.params;
  //     const projet = await projetService.getData(id);
  //     if (projet.code) return res.status(projet.code).json(projet);

  //     await datamappers.technoProjet.removeProjet(id);
  //     await datamappers.projet.remove(id);

  //     const result = await projetService.delete(id);
  //     if (result.code) return res.status(result.code).json(result);
  //     return res.status(201).json({ message: 'Arrete de supprimer des projets' });
  //   },

};
