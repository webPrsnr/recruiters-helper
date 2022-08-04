const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userID, refreshToken) {
    const tokenData = await tokenModel.findOne({
      where: { api_key: userID },
    });
    if (tokenData) {
      tokenData.refresh_token = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({
      api_key: userID,
      refresh_token: refreshToken,
    });
    return token;
  }
}

module.exports = new TokenService();
