const { UUID, UUIDV4, DataTypes } = require("sequelize");
const { sequelize } = require("../db/config");
const User = require("../models/User");

const jobSchema = sequelize.define("Jobs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
    max: 50,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("interview", "declined", "pending"),
    defaultValue: "pending",
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
});

sequelize.sync({ force: false }).then(() => {
  console.log("good to know youre working from jobs place");
});

jobSchema.belongsTo(User, { foreignKey: "createdBy" });

module.exports = jobSchema;
