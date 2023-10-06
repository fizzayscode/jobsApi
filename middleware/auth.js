const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  customUnauthenticatedError,
  customBadRequestError,
} = require("../errors");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const myheader = req.headers.authorization;

  const header = myheader.split(" ");

  if (!header) {
    throw new customUnauthenticatedError("there is no toekn passed");
  }
  if (header.length !== 2) {
    throw new customUnauthenticatedError("token is invalid");
  }
  if (header[0] !== "Bearer") {
    throw new customUnauthenticatedError("token doesnt bare a bearer");
  }
  token = header[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // const { firstName, lastName, email, id } = decoded;
    // attaching this user object i got back from decoded to to req.user which is very smart
    // so where its going to next can have it

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      throw new customUnauthenticatedError(
        "this user is not authorized to access this page"
      );
    }
    req.user = user;

    // its better i find that particular user thats sending the request here in my database
    // to actually know hes a particular using sending this request

    next();
  } catch (err) {
    throw new customBadRequestError(
      "user not unauthorized to access this page"
    );
  }
};

module.exports = authMiddleware;
