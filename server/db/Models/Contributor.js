const { Sequelize } = require("sequelize");
const db = require("../db");

const Contributor = db.define("contributor", {
  contributor_id: {
    type: Sequelize.STRING(),
    unique: true,
  },
  contributor_name: {
    type: Sequelize.STRING(),
    unique: true,
  },
  contributor_signature: {
    type: Sequelize.STRING(),
    unique: true,
  },
});

module.exports = Contributor;
