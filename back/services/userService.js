const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user-model");
const tokenService = require("./tokenService");
const UserDto = require("../dto/user-dto");
const ApiError = require("../exeptions/api-error");

class UserService {
  async registration(userLogin, userPassword) {
    const candidate = await UserModel.findOne({ where: { login: userLogin } });
    if (candidate) {
      throw ApiError.BadRequest(`User ${userLogin} is exist`);
    }
    const apiKey = uuidv4();
    const hashPassword = await bcrypt.hash(userPassword, 3);
    const newUser = await UserModel.create({
      login: userLogin,
      password: hashPassword,
      api_key: apiKey,
    });
    const response = await this.saveToken(newUser);
    console.log(response);
    return response;
  }

  async login(userLogin, userPassword) {
    const candidate = await UserModel.findOne({ where: { login: userLogin } });
    if (!candidate) {
      throw ApiError.BadRequest(`User ${userLogin} does not exist`);
    }

    const isPassEquals = await bcrypt.compare(userPassword, candidate.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Invalid password`);
    }
    const response = await this.saveToken(candidate);
    return response;
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const data = tokenService.validateRefreshToken(refreshToken);
    const token = await tokenService.findToken(refreshToken);
    if (!data && !token) {
      throw ApiError.UnauthorizedError();
    }

    const candidate = await UserModel.findOne({
      where: { api_key: token.api_key },
    });
    const response = await this.saveToken(candidate);
    return response;
  }

  async saveToken(candidate) {
    const userDto = new UserDto(candidate);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.api_key, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }
}

module.exports = new UserService();
