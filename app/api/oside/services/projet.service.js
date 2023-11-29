const { projet, memberProjet, technoProjet } = require('../models/index.mapper');
const userService = require('./user.service');
const commentService = require('./comment.service');

module.exports = {

  async getAll() {
    const allProjet = await projet.findAll();
    if (!allProjet) {
      return {
        code: 404,
        message: 'Empty Projets',
      };
    }
    const projets = await Promise.all(allProjet.map(async (projetInfo) => {
      const projetByID = await this.getData(projetInfo.id);
      return projetByID;
    }));
    return projets;
  },

  async getData(id) {
    // Recuperer un projet
    const projetByID = await projet.findByPk(id);
    if (!projetByID) {
      return {
        code: 404,
        message: 'Projet not found',
      };
    }
    // Recupere tous les technos d'un projet
    const returnTechnoProjet = await this.getViewTechnosProjet(projetByID.id);
    // Recupere l'auteur d'un projet
    const author = await userService.getData(projetByID.owner_id);
    // Recupere tous les membres d'un projet
    const memberProjetList = await this.getViewMembersProjet(projetByID.id);
    // Recupere les commentaires d'un projet
    const commentProjet = await commentService.getCommentProject(projetByID.id);

    const updatedProjet = {
      ...projetByID,
      author,
      technoProjet: returnTechnoProjet,
      memberProjet: memberProjetList,
      comment: commentProjet,
    };
    delete updatedProjet.owner_id;
    return updatedProjet;
  },
  async getViewTechnosProjet(idProjet) {
    const technosProjet = await projet.viewTechnosProjet(idProjet);
    const renderTechnoProjet = technosProjet.map((techno) => {
      const oneTechno = {
        id: techno.id,
        label: techno.label,
        color: techno.color,
      };
      return oneTechno;
    });
    return renderTechnoProjet;
  },

  async getViewMembersProjet(idProjet) {
    const memberProjetList = await projet.viewMembersProjet(idProjet);
    const renderMemberProjet = await Promise.all(memberProjetList.map(async (member) => {
      const oneMember = await userService.getData(member.id);
      return oneMember;
    }));
    return renderMemberProjet;
  },

  async post(inputQuery) {
    try {
      const projetCreated = await projet.create(inputQuery);
      return projetCreated;
    } catch (error) {
      return {
        code: 500,
        message: 'Projet not created',
      };
    }
  },
  async update(id, inputQuery) {
    const projetByID = await this.getData(id);
    try {
      const projetUpdated = await projet.update(projetByID.id, inputQuery);
      return projetUpdated;
    } catch (error) {
      return {
        code: 500,
        message: 'Projet not updated',
      };
    }
  },
  async delete(id) {
    const projetByID = await this.getData(id);
    try {
      await memberProjet.removeProjet(projetByID.id);
      await technoProjet.removeProjet(projetByID.id);
      const projetDeleted = await projet.delete(projetByID.id);
      return projetDeleted;
    } catch (error) {
      return {
        code: 500,
        message: 'Projet not deleted',
      };
    }
  },
  async participate(idProjet, idUser) {
    // check if user is already participate
    const projetByID = await this.getData(idProjet);
    const isParticipate = projetByID.memberProjet.find((member) => member.id === idUser);
    if (isParticipate) {
      return {
        code: 500,
        message: 'Vous participez déjà au projet',
      };
    }
    // check if user is already owner
    const isOwner = projetByID.author.id === idUser;
    if (isOwner) {
      return {
        code: 500,
        message: 'Vous êtes le propriétaire du projet',
      };
    }
    try {
      const projetParticipate = await memberProjet.participate(idProjet, idUser);
      return projetParticipate;
    } catch (error) {
      return {
        code: 500,
        message: 'Vous ne participez pas au projet',
      };
    }
  },
  async leave(idProjet, idUser) {
    // check if user is already participate
    const projetByID = await this.getData(idProjet);
    const isParticipate = projetByID.memberProjet.find((member) => member.id === idUser);
    if (!isParticipate) {
      return {
        code: 500,
        message: 'Vous ne participez pas au projet',
      };
    }
    // check if user is already owner
    const isOwner = projetByID.author.id === idUser;
    if (isOwner) {
      return {
        code: 500,
        message: 'Vous êtes le propriétaire du projet',
      };
    }
    try {
      const projetLeave = await memberProjet.leave(idProjet, idUser);
      return projetLeave;
    } catch (error) {
      return {
        code: 500,
        message: 'Projet not leave',
      };
    }
  },
};
