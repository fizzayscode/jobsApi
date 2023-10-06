const Sequelize = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "messi4life", {
  host: "localhost",
  dialect: "postgres",
  logging: true,
});

const connectDB = async () => {
  return sequelize.authenticate().then(() => {
    console.log("yeah i am connected to your so called database");
  });
};

module.exports = { connectDB, sequelize };
