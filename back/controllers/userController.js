const userService = require("../services/userService");

class UserController {
  async registration(req, res, next) {
    try {
      const { login, password } = req.body;
      const data = await userService.registration(login, password);
      console.log(data);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const data = await userService.login(login, password);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await userService.refresh(refreshToken);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async getAllCV(req, res, next) {
    try {
      res.json(["123"]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
