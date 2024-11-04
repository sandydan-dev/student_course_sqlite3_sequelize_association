const course = require("../models/course.model");

async function getAllCoursesData() {
  let query = await course.findAll();

  if (!query) {
    return { message: "courses not found from db" };
  } else {
    return { courses: query };
  }
}

// updated course by id
async function updateCourseData(id, updatedCourse) {
  let query = await course.findOne({ where: { id } });
  if (!query) {
    return null;
  } else {
    query.set(updatedCourse);
    let result = await query.save();
    return { message: "Course updated by  id", result };
  }
}

// add new course data

async function addNewCourseData(newCourse) {
  let query = await course.create(newCourse);
  if (!query) {
    return { message: "Course not created" };
  } else {
    return { message: "Course added successfully", query };
  }
}

// delete  course by id

async function deleteCourseData(id) {
  let query = await course.destroy({ where: { id } });
  if (!query) {
    return { message: "Course not deleted" };
  } else {
    return { message: "Course deleted successfully", query };
  }
}

module.exports = {
  getAllCoursesData,
  updateCourseData,
  addNewCourseData,
  deleteCourseData,
};
