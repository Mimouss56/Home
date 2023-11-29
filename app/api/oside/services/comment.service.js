const { comment } = require('../models/index.mapper');
const userService = require('./user.service');

module.exports = {
  async getAll() {
    const allComment = await comment.findAll();
    if (!allComment) {
      return {
        code: 404,
        message: 'Empty Comments',
      };
    }
    const comments = await Promise.all(allComment.map(async (commentaire) => {
      const commentDetails = await this.getData(commentaire.id);
      return commentDetails;
    }));
    return comments;
  },
  async getData(id) {
    // recupere les données du commentaire
    const commentByID = await comment.findByPk(id);
    if (!commentByID) {
      return {
        code: 404,
        message: 'Comment not found',
      };
    }
    // recupere les données de l'utilisateur
    const user = await userService.getData(commentByID.user_id);
    // formatte les données du commentaire
    const commentDetails = {
      ...commentByID,
      user,
    };
    delete commentDetails.user_id;

    return commentDetails;
  },
  /**
   * @typedef {object} postComment
   * @property {string} content.required - content
   *
   * @param {postComment} data
   * @return {objet} content
   */
  async post(data) {
    const newComment = await comment.create(data);
    if (!newComment) {
      return {
        code: 500,
        message: 'Internal error',
      };
    }
    return newComment;
  },
  async delete(id) {
    try {
      const deletedComment = await comment.delete(id);
      return deletedComment;
    } catch (error) {
      return {
        code: 500,
        message: 'Commentaire non supprimé',
      };
    }
  },
  // Update comment warned
  async flag(id) {
    const flaggedComment = await comment.update(id, { flag: true });
    if (!flaggedComment) {
      return {
        code: 500,
        message: 'Internal error',
      };
    }
    return flaggedComment;
  },

  async getCommentProject(id) {
    const allComment = await comment.findAll({ where: { projet_id: id } });

    const renderComment = await Promise.all(allComment.map(async (commentaire) => {
      const userInfo = await userService.getData(commentaire.user_id);
      const user = {
        id: userInfo.id,
        username: userInfo.username,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        delete_at: userInfo.delete_at,
        avatar_url: userInfo.avatar_url,
      };
      const oneComment = {
        id: commentaire.id,
        content: commentaire.content,
        created_at: commentaire.created_at,
        delete_at: commentaire.delete_at,
        projet_id: commentaire.projet_id,
        commentUser: user,
      };
      delete oneComment.user_id;
      return oneComment;
    }));
    return renderComment;
  },
};
