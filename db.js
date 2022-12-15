const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cron", "root", "root@123", {
  host: "localhost",
  dialect: "mysql",
  schema: "cron",
  pool: {
    min: 1,
    max: 20,
    acquire: 3000,
    idle: 2000,
  },
});

//authenticate db configuration

try {
  sequelize.authenticate();
} catch (error) {
  throw error;
}

module.exports = { sequelize };
