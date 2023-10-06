const express = require("express");
const pageNotFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error-handler");
const jobroutes = require("./routes/index");
const authroutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const { connectDB } = require("./db/config");

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authroutes);
app.use("/api/v1", authMiddleware, jobroutes);

app.use(pageNotFound);

app.use(errorHandlerMiddleware);

const start = async () => {
  await connectDB();
  app.listen(8080, () => {
    console.log("i am running opn port 8080");
  });
};

start();
