const User = require("../models/User");
const {
  customBadRequestError,
  customUnauthenticatedError,
} = require("../errors/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new customBadRequestError(
      "email, password firstname,last name must be provided"
    );
  }
  try {
    const hash = 10;
    const newPassword = await bcrypt.hash(password, hash);

    // console.log(newPassword);
    //   console.log(firstName, lastName, email, password);

    const user = await User.create({ ...req.body, password: newPassword });
    const token = jwt.sign(
      { firstName, lastName, email, id: user.id },
      process.env.SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );
    console.log(token);

    res.status(200).json({ msg: "user created", token: token });
  } catch {
    console.log("an error occered in creating your user");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throw new customBadRequestError("provide a username or password");
  }
  if (password == "" || email == "") {
    throw new customBadRequestError("provide a username or password");
  }
  try {
    const userFind = await User.findOne({
      where: {
        email: email,
      },
    });
  } catch (error) {
    throw new customUnauthenticatedError("this user is not valid");
  }
  const { firstName, lastName, id } = userFind;
  // console.log(firstName, lastName, id);
  //   console.log(userFind.password);
  const rightPassword = await bcrypt.compare(password, userFind.password);
  console.log(rightPassword);
  if (!rightPassword) {
    throw new customBadRequestError(
      "youve entered a wrong email or password try again"
    );
  }
  const token = jwt.sign(
    { firstName, lastName, email, id },
    process.env.SECRET_KEY,
    {
      expiresIn: "5h",
    }
  );
  res.status(200).json({
    msg: "you have logged in succesfully",
    user: firstName,
    token: token,
  });
};

module.exports = { register, login };
