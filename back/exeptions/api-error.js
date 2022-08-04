module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new AppiError(401, "The user is not logged in");
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
