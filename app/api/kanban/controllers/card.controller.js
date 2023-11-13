const cardServices = require('../services/card.services');

const cardController = {

  async post(req, res) {
    const {
      content, color, listId,
    } = req.body;

    const inputQuery = {
      content,
      color,
      list_id: listId,
      position: 0,
    };
    const result = await cardServices.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 201,
      message: 'Carte créée',
      data: await cardServices.getData(result.id),
    });
  },
  async update(req, res) {
    const { id } = req.params;
    const findByID = await cardServices.getData(id);
    console.log(findByID);
    const {
      content, color, listId, position,
    } = req.body;
    const inputQuery = {
      content: content || findByID.content,
      color: color || findByID.color,
      list_id: listId || findByID.list_id,
      position: position || findByID.position,
    };
    const result = await cardServices.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Carte updated',
      card: await cardServices.getData(id),
    });
  },
  async delete(req, res) {
    const { id } = req.params;
    const result = await cardServices.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Sanction deleted',
    });
  },
  // async addTag(req, res, next) {
  //   try {
  //     const card = await Card.findByPk(req.params.id);
  //     if (card) {
  //       arrayT = req.query.t;
  //       await card.addTags(arrayT);
  //     } else {
  //       next();
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  // async removeTag(req, res) {
  //   try {
  //     const card = await Card.findByPk(req.params.id);
  //     if (card) {
  //       arrayT = req.query.t;
  //       await card.removeTags(arrayT);
  //     } else {
  //       next();
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};

module.exports = cardController;
