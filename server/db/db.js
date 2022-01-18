const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || "postgres://sam:ZJ+0Hm5WwJU77bc0@localhost:5432/messenger", {
  logging: false
});

module.exports = db;
