module.exports = class UserDto {
  constructor(model) {
    this.login = model.login;
    this.api_key = model.api_key;
  }
};
