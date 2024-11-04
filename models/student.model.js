const { sequelize, DataTypes } = require("../lib/index");

const student = sequelize.define("student", {
  name: DataTypes.TEXT,
  age: DataTypes.INTEGER,
});

module.exports = student;
