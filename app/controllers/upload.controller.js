const uploadService = require('../services/upload.service');

module.exports = {
  async upload(req, res) {
    const {
      originalname, mimetype, filename, path,
    } = req.file;
    const inputQuery = {
      originalname,
      mimetype,
      filename,
      path,
    };

    const result = await uploadService.create(inputQuery);
    if (result.code) return res.status(result.code).json(result);
    return res.json(result);
  },
};

/*
      fieldname: 'image',
  originalname: 'IMG_20210906_111137.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: '../../src/images',
  filename: 'e28bb7de7ce32da695ba6aa684746e65',
  path: '..\\..\\src\\images\\e28bb7de7ce32da695ba6aa684746e65',
  size: 2518498
 */
