const { sequelize, DataTypes } = require("../lib/index");

const course = sequelize.define("course", {
  title: DataTypes.TEXT,
  description: DataTypes.TEXT,
});

module.exports = course;
