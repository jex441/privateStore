const { Sequelize } = require("sequelize");

const dbUrl = process.env.DB_URL || "postgres://localhost:5432/privatestore";

const db = new Sequelize(dbUrl, {
  logging: false,
  dialect: "postgres",
  dialectOptions: {
    ssl: true,
  },
});

module.exports = db;
