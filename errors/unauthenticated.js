const { customAPIError } = require("./apiError");
const http_status_code = require("http-status-codes");

class customUnauthenticatedError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = customUnauthenticatedError;
