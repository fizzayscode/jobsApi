const { DataTypes, UUID, UUIDV1, UUIDV4 } = require("sequelize");
const { sequelize } = require("../db/config");

const userSchema = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 17, // only allow values <= 23
      min: 15,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 17, // only allow values <= 23
      min: 15,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      max: 15, // only allow values <= 23
      min: 10,
      allowNull: false,
    },
  },
  {
    timestamps: true,

    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: false,
  }
);

sequelize
  .sync({ alter: true })
  .then(() => console.log("its safe in here created your database"));

module.exports = userSchema;
