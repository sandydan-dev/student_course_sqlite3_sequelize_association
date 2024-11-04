const student = require("../models/student.model");

// get all students data
async function getAllStudentsData() {
  let query = await student.findAll();
  if (!query) {
    return null;
  } else {
    return { students: query };
  }
}

// new student data added

async function addNewStudentData(newStudent) {
  let query = await student.create(newStudent);
  if (!query) {
    return null;
  } else {
    return { message: "Student data added successfully" };
  }
}

// updated student data

async function updateStudentData(id, updatedStudent) {
  let query = await student.findOne({ where: { id } });

  if (!query) {
    return null;
  } else {
    query.set(updatedStudent);
    let result = await query.save();
    return { message: "Student data updated successfully", result };
  }
}

//  delete student data from db

async function deleteStudentData(id) {
  let query = await student.destroy({ where: { id: id } });
  if (!query) {
    return { message: "Data not deleted from db" };
  } else {
    return { message: "Data deleted from db successfully" };
  }
}

module.exports = {
  getAllStudentsData,
  addNewStudentData,
  updateStudentData,
  deleteStudentData,
};
