const { sequelize, DataTypes } = require("../lib/index");

const course = require("./course.model");
const student = require("./student.model");

const studentCourse = sequelize.define("studentcourse", {
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: course,
      key: "id",
    },
  },
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: student,
      key: "id",
    },
  },
});

// define associations

course.belongsToMany(student, { through: studentCourse });
student.belongsToMany(course, { through: studentCourse });

module.exports = studentCourse;
