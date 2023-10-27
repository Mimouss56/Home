const datamappers = require('../models/index.mapper');
const projetService = require('../services/projet.service');
const commentService = require('../services/comment.service');

module.exports = {
  async getAll(_, res) {
    const data = await projetService.getAll();
    res.json(data);
  },
  async get(req, res) {
    const { id } = req.params;
    const dataProjet = await projetService.getData(id);
    res.json(dataProjet);
  },

  async post(req, res) {
    const inputQuery = {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      owner_id: req.body.owner_id,
    };
    const result = await projetService.post(inputQuery);
    if (result.code) return res.status(result.code).json(result);

    // MAJ de la liste des techno_projet
    if (req.body.technoProjet) await datamappers.projet.add(result.id, req.body.technoProjet);

    return res.json({
      message: 'Projet créé',
      result,
    });
  },

  async put(req, res) {
    const { id } = req.params;
    const projet = await projetService.getData(id);
    if (projet.code) return res.status(projet.code).json(projet);

    const inputQuery = {
      title: req.body.title || projet.title,
      content: req.body.content || projet.content,
      status: req.body.status || projet.status,
    };

    const result = await projetService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);

    const { technoProjet } = req.body;
    // MAJ de la liste des techno_projet avec en 1er lieu la suppression
    if (technoProjet) await datamappers.projet.add(result.id, technoProjet);
    // Recupère les nouvelles données
    const dataProjet = await projetService.getData(result.id);
    return res.json({
      message: 'Projet mis à jour',
      result: dataProjet,
    });
  },

  async delete(req, res) {
    // const { user } = req;
    const { id } = req.params;
    const projet = await projetService.getData(id);
    if (projet.code) return res.status(projet.code).json(projet);

    await datamappers.technoProjet.removeProjet(id);
    await datamappers.projet.remove(id);

    const result = await projetService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.status(201).json({ message: 'Arrete de supprimer des projets' });
  },

  async participate(req, res) {
    const { id } = req.params;
    const { user } = req;
    const result = await projetService.participate(id, user.id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({ message: 'Participation enregistrée' });
  },

  async leave(req, res) {
    const { id } = req.params;
    const { user } = req;
    const result = await projetService.leave(id, user.id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({ message: 'Participation annulée' });
  },
  async addComment(req, res) {
    // id du projet
    const { id } = req.params;
    // projet existe ?
    const projet = await projetService.getData(id);
    if (projet.code) return res.status(projet.code).json(projet);

    // user connecté
    const { user } = req;
    const { content } = req.body;

    const data = {
      projet_id: projet.id,
      user_id: user.id,
      content,
    };
    const result = await commentService.post(data);
    if (result.code) return res.status(result.code).json(result);
    return res.json({ message: 'Commentaire ajouté', data: result });
  },
  async deleteComment(req, res) {
    // id du projet
    const { id } = req.params;
    const commentById = await commentService.getData(id);
    // user connecté
    const { user } = req;
    const result = await commentService.delete(commentById.id, user.id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({ message: 'Commentaire supprimé' });
  },
};
