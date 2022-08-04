const userService = require("../services/userService");

class UserController {
  async registration(req, res, nex) {
    try {
      const { login, password } = req.body;
      const data = await userService.registration(login, password);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async login(req, res, nex) {
    try {
    } catch (error) {}
  }
  async logout(req, res, nex) {
    try {
    } catch (error) {}
  }
  async refresh(req, res, nex) {
    try {
    } catch (error) {}
  }
  async getAllCV(req, res, nex) {
    try {
      res.json(["123"]);
    } catch (error) {}
  }
}

module.exports = new UserController();
