class customAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const customAPIErrorfn = (message, statusCode) => {
  return new customAPIError(message, statusCode);
};

module.exports = { customAPIError, customAPIErrorfn };
