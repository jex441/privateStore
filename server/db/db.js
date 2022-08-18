const { Sequelize } = require("sequelize");

const dbUrl = process.env.DB_URL || "postgres://localhost:5432/privatestore";

const config = {
  logging: true,
};

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.NODE_ENV === "production") {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(dbUrl, config);

module.exports = db;
