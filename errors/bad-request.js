const { customAPIError } = require("./apiError");
const http_status_code = require("http-status-codes");

class customBadRequestError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = http_status_code.BAD_REQUEST;
  }
}

module.exports = customBadRequestError;
