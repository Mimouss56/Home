/* eslint-disable max-len */
const assert = require('assert');
const listService = require('../services/list.services');

const listController = {
  async getAll(req, res) {
    const { id } = req.user;
    const result = await listService.getAll(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },
  async get(req, res) {
    const { id } = req.params;
    const result = await listService.getData(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },
  // async getCardsInList(req, res) {
  //   try {
  //     const listId = req.params.id;
  //     const cards = await List.findByPk(listId, {
  //       include: {
  //         association: 'cards',
  //         include: 'tags',
  //       },
  //       order: [
  //         ['position', 'ASC'],
  //         ['cards', 'position', 'ASC'],
  //       ],
  //     });

  //     if (!cards) {
  //       res.status(404).json(`Cant find cards with list_id ${listId}`);
  //     } else {
  //       res.json(cards);
  //     }
  //   } catch (error) {
  //     console.trace(error);
  //     res.status(500).json(error);
  //   }
  // },
  async create(req, res, next) {
    try {
      const { name, position } = req.body;
      const { id } = req.user;
      // tester les params
      assert.ok(name, 'Name is required');
      // assert equivalent à ça :
      // if(!name) {
      //   throw new Error("Name is required");
      // }

      const newList = await listService.create({
        id_user: id,
        name,
        position: position || 0,
      });

      res.json(newList);
    } catch (err) {
      next(err); // Je passe a la suite avec l'erreur en param -> Déclanche une erreur avec express
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { name, position } = req.body;
    const listData = await listService.getData(id);
    const inputQuery = {
      name: name || listData.name,
      position: position || listData.position,
    };
    const result = await listService.update(id, inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      message: 'Emploi updated',
    });
  },
  async delete(req, res) {
    const { id } = req.params;
    const result = await listService.delete(id);
    if (result.code) return res.status(result.code).json(result);
    return res.json({
      code: 200,
      message: 'Sanction deleted',
    });
  },
};

module.exports = listController;
