// const { tag :Tag } = require('../models');
// const assert = require('assert');

// const tagController = {
//   async getAll(req, res, next) {
//     try {
//       const result = await Tag.findAll({
//         include: [{
//           association: 'cards',
//           include: 'list',
//         }],
//       });
//       res.json(result);
//     } catch (err) {
//       next(err);
//     }
//   },
//   async getById(req, res, next) {
//     try {
//       const result = await Tag.findByPk(req.params.id, {
//         include: [{
//           association: 'cards',
//           include: 'list',
//         }],
//       });
//       res.json(result);
//     } catch (err) {
//       next(err);
//     }
//   },
//   async post(req, res, next) {
//     try {
//       const { name, color } = req.body;
//       assert.ok(name, 'name is required');
//       const result = await Tag.create({
//         name,
//         color,
//       });
//       res.json(result);
//     } catch (err) {
//       next(err);
//     }
//   },
//   async update(req, res, next) {
//     try {
//       const tag = await Tag.findByPk(req.params.id);
//       if (tag) {
//         const { name, color } = req.body;
//         if (name) tag.name = name;
//         if (color) tag.color = color;
//         await tag.save();
//         res.json(tag);
//       } else {
//         next();
//       }
//     } catch (err) {
//       next(err);
//     }
//   },
//   async delete(req, res, next) {
//     try {
//       const tag = await Tag.findByPk(req.params.id);
//       if (tag) {
//         await tag.destroy();
//         res.json({
//           message: 'ok',
//         });
//       } else {
//         next();
//       }
//     } catch (err) {
//       next(err);
//     }
//   },
// };

// module.exports = tagController;
