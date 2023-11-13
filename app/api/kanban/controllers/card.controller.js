const cardServices = require('../services/card.services');

const cardController = {

  // async getById(req, res, next) {
  //   try {
  //     const result = await Card.findByPk(req.params.id, {
  //       include: ['list', 'tags'],
  //     });
  //     return res.json(result);
  //   } catch (err) {
  //     next(err);
  //   }
  // },
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
  // async update(req, res, next) {
  //   try {
  //     const card = await Card.findByPk(req.params.id);
  //     if (card) {
  //       const {
  //         content, position, color, list_id,
  //       } = req.body;
  //       if (content) card.content = content;
  //       if (position) card.position = position;
  //       if (color) card.color = color;
  //       if (list_id) card.list_id = list_id;
  //       await card.save();

  //       res.json(card);
  //     } else {
  //       next();
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  // async delete(req, res) {
  //   try {
  //     const card = await Card.findByPk(req.params.id);
  //     if (card) {
  //       await card.destroy(),
  //         res.json(card);
  //     } else {
  //       next();
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
  // },
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
