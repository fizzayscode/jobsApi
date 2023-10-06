const { customAPIError, customAPIErrorfn } = require("../errors/apiError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof customAPIError) {
    throw new customAPIError(err.message, err.statusCode);
  } else {
    throw res.status(500).send("error error error");
  }
};

module.exports = errorHandlerMiddleware;
