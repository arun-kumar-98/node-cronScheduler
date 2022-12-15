const express = require("express");
const app = express();
const { sequelize } = require("./db");
const cronJob = require("node-cron");
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./src/router/router");
const user = require("./src/entity/user");
const controller = require("./src/controller/userController");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", router);

//sync database
sequelize
  .sync({ alter: true })
  .then(function () {
    console.log("db sync");
  })
  .catch(function () {
    console.log("unable sync database!");
  });

//running cron scheduler

cronJob.schedule("*/1 * * * *", controller.deleteUser);
function run() {
  try {
    app.listen(`${process.env.port}`, () => {
      console.log(`server listening at port ${process.env.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();

//sudo kill -9 $(sudo lsof -t -i:4000)
