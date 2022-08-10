const ApiError = require("../exeptions/api-error");
const tokenService = require("../services/tokenService");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const data = tokenService.validateAccessToken(accessToken);
    if (!data) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = data;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
