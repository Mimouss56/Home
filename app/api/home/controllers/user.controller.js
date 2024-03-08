const userService = require('../services/user.service');

module.exports = {
  async getAll(req, res) {
    const dataUsers = await userService.getAll();

    res.json(dataUsers);
  },
  async get(req, res) {
    const { id } = req.params;
    const user = await userService.getData(id);

    res.json({ user });
  },

  async put(req, res) {
    const { id } = req.params;
    const userInfo = await userService.getData(id);
    const {
      info,
      main,
      passwordEdit,
      option,
    } = req.body;

    if (passwordEdit) {
      const inputData = {
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      };
      const dataPassword = await userService.updatePassword(id, inputData);
      if (dataPassword.code) {
        return res.status(dataPassword.code).json(
          { message: dataPassword.message, error: dataPassword.error },
        );
      }
      return res.json(dataPassword);
    }
    if (main) {
      const inputDataGeneral = {
        last_name: req.body.lastName || userInfo.lastName,
        first_name: req.body.firstName || userInfo.firstName,
        email: req.body.email || userInfo.email,
        avatar: req.body.avatar || userInfo.avatar,
      };
      const dataMain = await userService.updateGeneral(id, inputDataGeneral);
      if (dataMain.code) {
        return res.status(dataMain.code).json(
          { message: dataMain.message, error: dataMain.error },
        );
      }
      return res.json(dataMain);
    }
    if (info) {
      const inputDataInfos = {
        linkedin: req.body.linkedin || userInfo.linkedin,
        github: req.body.github || userInfo.github,
        website: req.body.website || userInfo.website,
        address: req.body.address || userInfo.address,
        phone: req.body.phone || userInfo.phone,
        prez: req.body.prez || userInfo.prez,
      };
      const dataInfo = await userService.updateInfo(userInfo.id, inputDataInfos);
      if (dataInfo.code) {
        return res.status(dataInfo.code).json(
          { message: dataInfo.message, error: dataInfo.error },
        );
      }
      return res.json(dataInfo);
    }
    if (option) {
      const updatedFamily = Object.prototype.hasOwnProperty.call(req.body, 'family') ? req.body.family : userInfo.family;
      const updatedChild = Object.prototype.hasOwnProperty.call(req.body, 'child') ? req.body.child : userInfo.child;
      const inputData = {
        id_role: Number(req.body.role) || Number(userInfo.role.id),
        family: updatedFamily,
        child: updatedChild,
      };
      const dataOption = await userService.updateOption(id, inputData);
      if (dataOption.code) {
        return res.status(dataOption.code).json(
          { message: dataOption.message, error: dataOption.error },
        );
      }
      return res.json(dataOption);
    }
    return res.json({ message: 'No data to update' });
  },
  async delete(req, res) {
    const { id } = req.params;
    const data = await userService.delete(id);
    if (data.code) {
      return res.status(data.code).json(
        { message: data.message, error: data.error.toString() },
      );
    }

    return res.json(data);
  },
};
