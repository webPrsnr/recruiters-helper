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
    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.api_key, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
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
