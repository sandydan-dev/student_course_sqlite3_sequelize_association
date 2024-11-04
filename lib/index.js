const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./db/student_course_database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
